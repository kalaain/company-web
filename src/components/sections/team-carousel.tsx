import { useEffect, useMemo, useRef, useState } from "react";

import type { TeamMember } from "../../lib/random-team";

type TeamCarouselProps = {
  members: TeamMember[];
};

export function TeamCarousel({ members }: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const pauseUntilRef = useRef<number>(0);
  const pointerStartXRef = useRef(0);
  const movedDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const loopMembers = useMemo(() => [...members, ...members], [members]);

  useEffect(() => {
    const node = trackRef.current;

    if (!node || members.length === 0) {
      return;
    }

    const speed = 0.5;

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
  }, [isPaused, members.length]);

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
    pauseUntilRef.current = Date.now() + 1500;
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
      className={`no-scrollbar flex gap-6 overflow-x-scroll pb-2 ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      style={{ scrollbarWidth: "none" }}
    >
      {loopMembers.map((member, index) => (
        <article
          key={`${member.id}-${index}`}
          className="min-w-72.5 overflow-hidden rounded-t-2xl rounded-br-[34px] rounded-bl-2xl border border-zinc-200 bg-white shadow-sm md:min-w-[320px]"
        >
          <div
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url('${member.photo}')` }}
          />
          <div className="space-y-2 p-4">
            <h3 className="text-base font-semibold text-zinc-800">{member.name}</h3>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">{member.role}</p>
            <p className="text-sm leading-6 text-zinc-600">{member.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
