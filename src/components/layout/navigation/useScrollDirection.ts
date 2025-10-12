import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isVisible: boolean;
}

export function useScrollDirection(threshold: number = 5) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isVisible: true,
  });

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      const scrollDiff = Math.abs(scrollY - lastScrollY);

      // Only update if scroll difference is above threshold
      if (scrollDiff >= threshold) {
        const isVisible = direction === 'up' || scrollY < 50;

        setScrollState({
          scrollY,
          scrollDirection: direction,
          // Show navbar when scrolling up or at top of page
          isVisible,
        });
        lastScrollY = scrollY;
      }
      ticking = false;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for smooth 60fps updates
      if (!ticking) {
        rafId = requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [threshold]);

  return scrollState;
}