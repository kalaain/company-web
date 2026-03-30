import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type HeroSlide = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
};

type HeroBannerProps = {
  slides: HeroSlide[];
};

export function HeroBanner({ slides }: HeroBannerProps) {
  const safeSlides = useMemo(() => (slides.length > 0 ? slides : []), [slides]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeSlides.length);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [safeSlides.length]);

  if (safeSlides.length === 0) {
    return null;
  }

  const activeSlide = safeSlides[currentIndex];

  return (
    <section className="relative flex min-h-125 w-full flex-col justify-end overflow-hidden rounded-2xl border border-zinc-200 p-8 md:min-h-155 md:p-14">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${activeSlide.backgroundImage})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(5,5,5,0.72), rgba(5,5,5,0.48)), linear-gradient(120deg, rgba(217,207,199,0.18), rgba(239,233,227,0.12))",
        }}
      />
      <div className="relative z-10 max-w-3xl space-y-5">
        <h1 className="text-5xl font-semibold tracking-tight text-white! drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] md:text-6xl">
          {activeSlide.title}
        </h1>
        <p className="text-white/95! drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] md:text-xl">{activeSlide.description}</p>
        <Link
          to={activeSlide.ctaHref}
          className="inline-flex rounded-full border border-white/90 bg-black/20 px-5 py-2 text-sm font-semibold text-white! transition hover:bg-black/35"
        >
          {activeSlide.ctaLabel}
        </Link>
      </div>

      <div className="relative z-10 mt-10 flex items-center gap-2">
        {safeSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition ${
              index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
