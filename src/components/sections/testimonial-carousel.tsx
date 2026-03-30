import { useEffect, useMemo, useRef, useState } from "react";

import { TestimonialCard } from "../cards/testimonial-card";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type TestimonialCarouselProps = {
  items: Testimonial[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const pauseUntilRef = useRef<number>(0);
  const pointerStartXRef = useRef(0);
  const movedDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const loopItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const node = trackRef.current;

    if (!node || items.length === 0) {
      return;
    }

    const speed = 0.55;

    const animate = () => {
      const now = Date.now();
      const shouldMove = !isPaused && !draggingRef.current && now >= pauseUntilRef.current;

      if (shouldMove) {
        node.scrollLeft += speed;
      }

      const resetPoint = node.scrollWidth / 2;

      if (node.scrollLeft >= resetPoint) {
        node.scrollLeft -= resetPoint;
      }

      if (node.scrollLeft <= 0) {
        node.scrollLeft += resetPoint;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    node.scrollLeft = node.scrollWidth / 4;
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isPaused, items.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = trackRef.current;

    if (!node) {
      return;
    }

    draggingRef.current = true;
    setIsDragging(true);
    pointerStartXRef.current = event.clientX;
    movedDistanceRef.current = 0;
    node.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = trackRef.current;

    if (!node || !draggingRef.current) {
      return;
    }

    const deltaX = event.clientX - pointerStartXRef.current;
    pointerStartXRef.current = event.clientX;
    movedDistanceRef.current += Math.abs(deltaX);
    node.scrollLeft -= deltaX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = trackRef.current;

    if (!node) {
      return;
    }

    draggingRef.current = false;
    setIsDragging(false);
    pauseUntilRef.current = Date.now() + 1800;
    suppressClickRef.current = movedDistanceRef.current > 6;
    node.releasePointerCapture(event.pointerId);

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const onTrackClick = () => {
    if (suppressClickRef.current) {
      return;
    }

    setIsPaused(true);
  };

  const onTrackMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={onTrackClick}
      onMouseLeave={onTrackMouseLeave}
      role="region"
      aria-label="Carousel testimoni pelanggan"
      className={`no-scrollbar flex gap-5 overflow-x-scroll pb-2 ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      style={{ scrollbarWidth: "none" }}
    >
      {loopItems.map((testimonial, index) => (
        <div key={`${testimonial.name}-${index}`} className="min-w-75 flex-1 md:min-w-90">
          <TestimonialCard {...testimonial} />
        </div>
      ))}
    </div>
  );
}