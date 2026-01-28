'use client';

import React, { useEffect, useState } from 'react';
import { useCommits, Commit } from '../hooks/useCommits';
import { useIdleTimer } from '../hooks/useIdleTimer';

interface ScreensaverProps {
    idleTimeout?: number; // milliseconds
    enabled?: boolean;
}

export function Screensaver({
    idleTimeout = 60000, // 1 minute default
    enabled = true,
}: ScreensaverProps) {
    const [showScreensaver, setShowScreensaver] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { commits, loading, error, refetch } = useCommits(!showScreensaver);

    const { isIdle } = useIdleTimer({
        timeout: idleTimeout,
        enabled,
        onIdle: () => {
            setShowScreensaver(true);
            setCurrentIndex(0);
        },
        onActive: () => {
            setShowScreensaver(false);
        },
    });

    // Rotate through commits
    useEffect(() => {
        if (!showScreensaver || commits.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % commits.length);
        }, 5000); // Change commit every 5 seconds

        return () => clearInterval(interval);
    }, [showScreensaver, commits.length]);

    // Refetch commits when screensaver becomes active
    useEffect(() => {
        if (showScreensaver && commits.length === 0) {
            refetch();
        }
    }, [showScreensaver, commits.length, refetch]);

    if (!showScreensaver) {
        return null;
    }

    const currentCommit = commits[currentIndex];

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4" />
                <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4 animation-delay-2000" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                {loading && (
                    <div className="text-white/80 text-2xl animate-pulse">
                        Loading commits...
                    </div>
                )}

                {error && (
                    <div className="text-red-400 text-xl">
                        <p className="mb-4">⚠️ Error loading commits</p>
                        <p className="text-sm text-red-300">{error}</p>
                        <button
                            onClick={refetch}
                            className="mt-6 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && currentCommit && (
                    <div className="animate-fade-in">
                        {/* Author Avatar */}
                        {currentCommit.author.avatar && (
                            <div className="mb-8 flex justify-center">
                                <img
                                    src={currentCommit.author.avatar}
                                    alt={currentCommit.author.name}
                                    className="w-24 h-24 rounded-full border-4 border-white/20 shadow-2xl"
                                />
                            </div>
                        )}

                        {/* Commit Message */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {currentCommit.message.split('\n')[0]}
                        </h2>

                        {/* Additional commit details */}
                        {currentCommit.message.split('\n').length > 1 && (
                            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                                {currentCommit.message.split('\n').slice(1).join('\n')}
                            </p>
                        )}

                        {/* Author Info */}
                        <div className="flex items-center justify-center gap-4 text-white/60 mb-6">
                            <span className="text-lg">
                                by <span className="text-white/90 font-semibold">{currentCommit.author.name}</span>
                            </span>
                            <span>•</span>
                            <span className="text-lg">
                                @{currentCommit.author.username}
                            </span>
                        </div>

                        {/* Date */}
                        <div className="text-white/50 text-sm">
                            {new Date(currentCommit.date).toLocaleString()}
                        </div>

                        {/* Commit SHA */}
                        <div className="mt-8 text-white/40 text-xs font-mono">
                            {currentCommit.sha.substring(0, 7)}
                        </div>

                        {/* Progress indicator */}
                        <div className="mt-12 flex justify-center gap-2">
                            {commits.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'w-8 bg-white'
                                            : 'w-2 bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Exit hint */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-sm">
                    Move mouse or press any key to exit
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
        </div>
    );
}
