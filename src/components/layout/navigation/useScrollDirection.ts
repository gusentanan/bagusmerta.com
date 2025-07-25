import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isVisible: boolean;
}

export function useScrollDirection(threshold: number = 10) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isVisible: true,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      const scrollDiff = Math.abs(scrollY - lastScrollY);

      // Only update if scroll difference is above threshold
      if (scrollDiff >= threshold) {
        setScrollState(prev => ({
          scrollY,
          scrollDirection: direction,
          // Show navbar when scrolling up or at top of page
          isVisible: direction === 'up' || scrollY < 50,
        }));
        lastScrollY = scrollY;
      }
    };

    const handleScroll = () => {
      // Debounce scroll events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollDirection, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [threshold]);

  return scrollState;
}