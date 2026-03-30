import {
  productServiceHighlights,
  productServiceOfferings,
} from "../data/company";
import { usePageSeo } from "../hooks/use-page-seo";

export function ProductPage() {
  usePageSeo({
    title: "Produk",
    description: "Katalog lengkap pestisida, pupuk, dan pakan ternak berkualitas dari PT SMJ Agro dengan harga transparan.",
  });

  const productOnlyOfferings = productServiceOfferings.filter(
    (offering) => offering.type === "Product",
  );

  return (
    <div className="space-y-10">
      <section className="-mx-5 md:-mx-8">
        <div
          role="img"
          aria-label="Sawah hijau"
          className="relative min-h-92.5 overflow-hidden border-y border-zinc-200 bg-cover bg-center md:min-h-112.5"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-92.5 w-full max-w-6xl items-center px-6 md:min-h-112.5 md:px-8">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80!">Produk</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white! md:text-6xl">
                Katalog Produk Pertanian & Pakan
              </h1>
              <p className="mt-4 text-white/90! md:text-lg">
                Temukan pestisida, pupuk, dan pakan ternak berkualitas dengan deskripsi lengkap,
                harga transparan, dan testimoni dari petani dan peternak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-4 md:p-5">
        {productServiceHighlights.map((item) => (
          <article key={item.title} className="rounded-xl border border-zinc-200 bg-brand-surface p-4">
            <h2 className="text-sm font-semibold text-zinc-800">{item.title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <article
          role="img"
          aria-label="Promo produk pertanian"
          className="min-h-65 rounded-2xl border border-zinc-200 bg-cover bg-center p-6"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=800&q=80')" }}
        >
          <div className="max-w-xs rounded-lg bg-white/85 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Promo Musiman</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-800">Promo Bulan Ini</h2>
            <p className="mt-2 text-sm text-zinc-600">Diskon hingga 20% untuk produk pupuk dan pestisida pilihan bagi member.</p>
          </div>
        </article>

        <div className="grid gap-4">
          <article className="rounded-2xl border border-zinc-200 bg-brand-secondary p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Pilihan Petani</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-800">Produk Paling Dicari</h2>
            <p className="mt-2 text-sm text-zinc-600">Pestisida, pupuk, dan pakan ternak terlaris yang dipercaya petani dan peternak.</p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Stok Baru</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-800">Produk Terbaru</h2>
            <p className="mt-2 text-sm text-zinc-600">Update stok dan paket bundling baru setiap musim tanam.</p>
          </article>
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Katalog</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-800">Daftar Produk</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Setiap produk dilengkapi deskripsi, informasi harga, dan testimoni dari pelanggan.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productOnlyOfferings.map((offering) => (
            <article key={offering.name} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div
                role="img"
                aria-label={offering.name}
                className="h-52 bg-cover bg-center"
                style={{ backgroundImage: `url('${offering.image}')` }}
              />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{offering.type}</p>
                  <p className="text-sm font-semibold text-zinc-800">{offering.pricing}</p>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-zinc-800">{offering.name}</h3>
                <p className="text-sm leading-6 text-zinc-600">{offering.description}</p>

                <div className="rounded-xl border border-zinc-200 bg-brand-surface p-3">
                  <p className="text-sm italic text-zinc-700">"{offering.testimonial.quote}"</p>
                  <p className="mt-2 text-xs font-semibold text-zinc-800">
                    {offering.testimonial.client} · {offering.testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}