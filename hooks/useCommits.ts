import { useState, useEffect, useCallback } from 'react';

export interface Commit {
    sha: string;
    message: string;
    author: {
        name: string;
        email: string;
        username: string;
        avatar: string;
    };
    date: string;
}

interface CommitsResponse {
    data: Commit[];
    cached?: boolean;
    stale?: boolean;
    error?: string;
    rateLimit?: {
        limit: string | null;
        remaining: string | null;
        reset: string | null;
    };
}

interface UseCommitsReturn {
    commits: Commit[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    isCached: boolean;
    isStale: boolean;
}

export function useCommits(autoFetch = true): UseCommitsReturn {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCached, setIsCached] = useState<boolean>(false);
    const [isStale, setIsStale] = useState<boolean>(false);

    const fetchCommits = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/commits');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch commits');
            }

            const data: CommitsResponse = await response.json();

            setCommits(data.data || []);
            setIsCached(data.cached || false);
            setIsStale(data.stale || false);

            if (data.error) {
                setError(data.error);
            }

            // Log rate limit info if available
            if (data.rateLimit) {
                console.log('GitHub API Rate Limit:', {
                    remaining: data.rateLimit.remaining,
                    limit: data.rateLimit.limit,
                    resetTime: data.rateLimit.reset
                        ? new Date(parseInt(data.rateLimit.reset) * 1000).toLocaleString()
                        : 'N/A',
                });
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error('Error fetching commits:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchCommits();
        }
    }, [autoFetch, fetchCommits]);

    return {
        commits,
        loading,
        error,
        refetch: fetchCommits,
        isCached,
        isStale,
    };
}
