import { Link } from "react-router-dom";

export function CompanyOverviewShowcase() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-brand-secondary p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1.5fr_1fr]">
        <div
          role="img"
          aria-label="Lahan pertanian hijau"
          className="min-h-70 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80')",
          }}
        />

        <div className="rounded-xl bg-[#f6f3ef] p-6 md:p-8">
          <h3 className="text-3xl font-medium leading-tight text-zinc-800 md:text-4xl">
            Menyediakan obat-obatan pertanian & pakan ternak berkualitas
          </h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">
            Temukan produk pestisida, pupuk, dan pakan ternak pilihan yang
            terbukti efektif di lapangan untuk mendukung hasil panen dan
            peternakan Anda secara optimal.
          </p>
          <Link
            to="/product"
            className="mt-6 inline-flex rounded-sm border border-black bg-black px-4 py-2 text-sm font-bold uppercase tracking-wide text-white! transition hover:bg-zinc-800 hover:text-white!"
          >
            Lihat Produk
          </Link>
        </div>

        <div className="grid gap-4">
          <div className="relative min-h-32.5 rounded-xl bg-[#f6f3ef] p-3">
            <div className="absolute right-3 top-3 h-16 w-16 rounded-full border border-zinc-400/60" />
            <div
              role="img"
              aria-label="Petani menyemprot tanaman"
              className="h-full rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80')",
              }}
            />
          </div>
          <div
            role="img"
            aria-label="Peternakan sapi"
            className="min-h-32.5 rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80')",
            }}
          />
        </div>
      </div>
    </section>
  );
}