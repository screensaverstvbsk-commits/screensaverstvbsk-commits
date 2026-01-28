import { useState, useEffect, useCallback, useRef } from 'react';

interface UseIdleTimerOptions {
    timeout?: number; // Timeout in milliseconds
    onIdle?: () => void;
    onActive?: () => void;
    events?: string[];
    enabled?: boolean;
}

interface UseIdleTimerReturn {
    isIdle: boolean;
    reset: () => void;
    pause: () => void;
    resume: () => void;
}

const DEFAULT_EVENTS = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'wheel',
];

export function useIdleTimer({
    timeout = 60000, // Default 1 minute
    onIdle,
    onActive,
    events = DEFAULT_EVENTS,
    enabled = true,
}: UseIdleTimerOptions = {}): UseIdleTimerReturn {
    const [isIdle, setIsIdle] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(!enabled);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef<number>(Date.now());

    const reset = useCallback(() => {
        lastActivityRef.current = Date.now();

        // Clear existing timeout
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        // If currently idle, trigger onActive callback
        if (isIdle) {
            setIsIdle(false);
            onActive?.();
        }

        // Set new timeout only if not paused
        if (!isPaused) {
            timeoutIdRef.current = setTimeout(() => {
                setIsIdle(true);
                onIdle?.();
            }, timeout);
        }
    }, [isIdle, isPaused, timeout, onIdle, onActive]);

    const pause = useCallback(() => {
        setIsPaused(true);
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
    }, []);

    const resume = useCallback(() => {
        setIsPaused(false);
        reset();
    }, [reset]);

    // Handle activity events
    useEffect(() => {
        if (!enabled || isPaused) {
            return;
        }

        const handleActivity = () => {
            reset();
        };

        // Add event listeners
        events.forEach((event) => {
            window.addEventListener(event, handleActivity, { passive: true });
        });

        // Initialize timer
        reset();

        // Cleanup
        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, [enabled, isPaused, events, reset]);

    // Update pause state when enabled prop changes
    useEffect(() => {
        if (enabled) {
            resume();
        } else {
            pause();
        }
    }, [enabled, pause, resume]);

    return {
        isIdle,
        reset,
        pause,
        resume,
    };
}
