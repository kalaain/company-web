export function VideoShowcase() {
  return (
    <section className="relative min-h-96 overflow-hidden rounded-2xl border border-zinc-200 md:min-h-112">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://assets.mixkit.co/videos/35854/35854-720.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=40"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex min-h-96 flex-col items-center justify-center px-6 text-center md:min-h-112">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">
          Dari Lahan ke Hasil Panen
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Mendampingi petani & peternak Indonesia
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/90 md:text-base">
          Kami hadir di setiap tahap — dari pemilihan produk, konsultasi lapangan, hingga hasil panen yang optimal.
        </p>
      </div>
    </section>
  );
}