import { NextRequest, NextResponse } from 'next/server';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let cachedData: any = null;
let cacheTimestamp: number = 0;

interface GitHubCommit {
    sha: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: string;
        };
        message: string;
    };
    author: {
        login: string;
        avatar_url: string;
    } | null;
}

export async function GET(request: NextRequest) {
    try {
        // Check if we have valid cached data
        const now = Date.now();
        if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
            return NextResponse.json({
                data: cachedData,
                cached: true,
                cacheAge: Math.floor((now - cacheTimestamp) / 1000),
            });
        }

        // Get GitHub token from environment variable
        const githubToken = process.env.GITHUB_TOKEN;
        if (!githubToken) {
            return NextResponse.json(
                { error: 'GitHub token not configured' },
                { status: 500 }
            );
        }

        // Get repository details from environment or use defaults
        const owner = process.env.GITHUB_OWNER || 'Kumarbcom';
        const repo = process.env.GITHUB_REPO || 'screensaverstvbsk-commits';
        const perPage = parseInt(process.env.COMMITS_PER_PAGE || '30', 10);

        // Fetch commits from GitHub API
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Next.js-Screensaver-App',
                },
                // Use Next.js built-in caching
                next: { revalidate: 300 }, // 5 minutes
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GitHub API Error:', response.status, errorText);

            // Return cached data if available, even if expired
            if (cachedData) {
                return NextResponse.json({
                    data: cachedData,
                    cached: true,
                    stale: true,
                    error: 'Using stale cache due to API error',
                });
            }

            return NextResponse.json(
                {
                    error: 'Failed to fetch commits from GitHub',
                    status: response.status,
                    details: response.statusText,
                },
                { status: response.status }
            );
        }

        const commits: GitHubCommit[] = await response.json();

        // Transform commits to a simpler format
        const transformedCommits = commits.map((commit) => ({
            sha: commit.sha,
            message: commit.commit.message,
            author: {
                name: commit.commit.author.name,
                email: commit.commit.author.email,
                username: commit.author?.login || 'unknown',
                avatar: commit.author?.avatar_url || '',
            },
            date: commit.commit.author.date,
        }));

        // Update cache
        cachedData = transformedCommits;
        cacheTimestamp = now;

        // Get rate limit info from headers
        const rateLimit = {
            limit: response.headers.get('x-ratelimit-limit'),
            remaining: response.headers.get('x-ratelimit-remaining'),
            reset: response.headers.get('x-ratelimit-reset'),
        };

        return NextResponse.json({
            data: transformedCommits,
            cached: false,
            rateLimit,
        });

    } catch (error) {
        console.error('Error fetching commits:', error);

        // Return cached data if available
        if (cachedData) {
            return NextResponse.json({
                data: cachedData,
                cached: true,
                stale: true,
                error: 'Using stale cache due to server error',
            });
        }

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
