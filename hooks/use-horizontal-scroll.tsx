import { useState, useCallback, MouseEvent, WheelEvent, RefObject } from 'react';

interface UseHorizontalScroll {
  onDragStart: (event: MouseEvent<HTMLDivElement>) => void;
  onDragMove: (event: MouseEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onWheel: (event: WheelEvent<HTMLDivElement>) => void;
}

const useHorizontalScroll = (ref: RefObject<HTMLDivElement>): UseHorizontalScroll => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const onDragStart = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(event.clientX);
    if (ref.current) {
      setScrollStart(ref.current.scrollLeft);
    }
    event.preventDefault(); // Prevent text selection on drag
  }, [ref]);

  const onDragMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentX = event.clientX;
    // Calculate how far we have moved - adjust multiplier to scroll faster
    const walk = (currentX - startX) * 1.5;
    if (ref.current) {
      ref.current.scrollLeft = scrollStart - walk;
    }
  }, [isDragging, startX, scrollStart, ref]);

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollLeft += event.deltaY;
    }
  }, [ref]);

  return { onDragStart, onDragMove, onDragEnd, onWheel };
};

export default useHorizontalScroll;
