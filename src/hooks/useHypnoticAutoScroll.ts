import { useEffect, useState, useRef, useCallback } from 'react';

interface UseHypnoticAutoScrollOptions {
  currentPage: 'lobby' | 'catalog';
  speedMultiplier?: number;
}

export function useHypnoticAutoScroll({ currentPage, speedMultiplier = 1 }: UseHypnoticAutoScrollOptions) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [userPaused, setUserPaused] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const turnPauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPlayingRef = useRef<boolean>(isPlaying);
  const userPausedRef = useRef<boolean>(userPaused);
  const directionRef = useRef<number>(1); // 1 = down, -1 = up
  const isReversingRef = useRef<boolean>(false);
  const virtualScrollRef = useRef<number>(0);

  isPlayingRef.current = isPlaying;
  userPausedRef.current = userPaused;

  // Sync virtual scroll with real window scroll
  useEffect(() => {
    virtualScrollRef.current = window.scrollY;
  }, []);

  // Handle manual interaction pauses (touch, wheel, keys)
  const handleUserInteraction = useCallback(() => {
    virtualScrollRef.current = window.scrollY;

    if (!userPausedRef.current && isPlayingRef.current) {
      setUserPaused(true);
    }

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    // Resume automatically 2.8 seconds after manual user gesture stops
    resumeTimeoutRef.current = setTimeout(() => {
      virtualScrollRef.current = window.scrollY;
      setUserPaused(false);
    }, 2800);
  }, []);

  useEffect(() => {
    const events = ['wheel', 'touchstart', 'touchmove', 'keydown', 'mousedown'];
    const handleEvent = (e: Event) => {
      // Don't pause if clicking on header controls
      const target = e.target as HTMLElement | null;
      if (target?.closest('header')) {
        return;
      }
      handleUserInteraction();
    };

    events.forEach(eventName => {
      window.addEventListener(eventName, handleEvent, { passive: true });
    });

    return () => {
      events.forEach(eventName => {
        window.removeEventListener(eventName, handleEvent);
      });
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      if (turnPauseTimeoutRef.current) {
        clearTimeout(turnPauseTimeoutRef.current);
      }
    };
  }, [handleUserInteraction]);

  // Hypnotic Auto-Scroll Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastFrameTime = performance.now();

    const scrollLoop = (now: number) => {
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      if (isPlayingRef.current && !userPausedRef.current && !isReversingRef.current) {
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const currentScroll = window.scrollY;

        // Keep virtual scroll aligned
        if (Math.abs(virtualScrollRef.current - currentScroll) > 150) {
          virtualScrollRef.current = currentScroll;
        }

        if (maxScroll > 100) {
          // Slow, hypnotic, readable velocity (approx 36px/s at 1x)
          const baseVelocity = 36 * speedMultiplier;

          // Sinusoidal easing factor near bounds (within 380px of top or bottom)
          let easeFactor = 1.0;
          const edgeDistance = directionRef.current === 1 
            ? maxScroll - currentScroll 
            : currentScroll;

          if (edgeDistance < 380) {
            const ratio = Math.max(0.12, edgeDistance / 380);
            easeFactor = 0.25 + 0.75 * Math.sin((ratio * Math.PI) / 2);
          }

          // Advance virtual scroll
          const delta = baseVelocity * easeFactor * directionRef.current * dt;
          virtualScrollRef.current += delta;

          // Check Bounce Turnaround conditions
          if (directionRef.current === 1 && virtualScrollRef.current >= maxScroll - 3) {
            // Reached the end of the page!
            virtualScrollRef.current = maxScroll;
            window.scrollTo({ top: maxScroll, behavior: 'auto' });
            
            // Settle at the bottom for 750ms before gracefully gliding up
            isReversingRef.current = true;
            if (turnPauseTimeoutRef.current) clearTimeout(turnPauseTimeoutRef.current);
            
            turnPauseTimeoutRef.current = setTimeout(() => {
              directionRef.current = -1;
              setScrollDirection('up');
              isReversingRef.current = false;
            }, 750);

          } else if (directionRef.current === -1 && virtualScrollRef.current <= 3) {
            // Reached the top of the page!
            virtualScrollRef.current = 0;
            window.scrollTo({ top: 0, behavior: 'auto' });

            // Settle at top for 750ms before gracefully gliding down
            isReversingRef.current = true;
            if (turnPauseTimeoutRef.current) clearTimeout(turnPauseTimeoutRef.current);

            turnPauseTimeoutRef.current = setTimeout(() => {
              directionRef.current = 1;
              setScrollDirection('down');
              isReversingRef.current = false;
            }, 750);

          } else {
            // Continuous hypnotic advancement
            window.scrollTo({ top: virtualScrollRef.current, behavior: 'auto' });
          }
        }
      }

      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPage, speedMultiplier]);

  const toggleAutoScroll = () => {
    setIsPlaying(prev => !prev);
    setUserPaused(false);
    virtualScrollRef.current = window.scrollY;
  };

  return {
    isAutoScrollActive: isPlaying && !userPaused,
    toggleAutoScroll,
    scrollDirection,
  };
}
