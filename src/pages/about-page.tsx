import { useEffect, useState } from "react";

import { TeamCarousel } from "../components/sections/team-carousel";
import {
  companyHistory,
  companyInfo,
  companyMilestones,
  cultureValues,
} from "../data/company";
import { usePageSeo } from "../hooks/use-page-seo";
import { getDynamicTeamMembers, type TeamMember } from "../lib/random-team";

export function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  usePageSeo({
    title: "Tentang Kami",
    description: "Profil PT SMJ Agro — sejarah perusahaan, visi misi, nilai budaya, dan tim ahli di balik produk pertanian terpercaya.",
  });

  useEffect(() => {
    void getDynamicTeamMembers().then(setTeamMembers);
  }, []);

  return (
    <div className="space-y-12">
      <section className="-mx-5 md:-mx-8">
        <div
          role="img"
          aria-label="Peternakan sapi di padang rumput"
          className="relative min-h-92.5 overflow-hidden border-y border-zinc-200 bg-cover bg-center md:min-h-112.5"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-92.5 w-full max-w-6xl items-center px-6 md:min-h-112.5 md:px-8">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80!">Profil Perusahaan</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white! md:text-6xl">Tentang Kami</h1>
              <p className="mt-4 text-white/90! md:text-lg">{companyInfo.shortOverview}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Sejarah Perusahaan</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-800">PT SMJ Agro</h2>
          <p className="mt-4 leading-7 text-zinc-700">{companyHistory.foundingStory}</p>
          <p className="mt-4 leading-7 text-zinc-700">{companyHistory.background}</p>
          <p className="mt-4 leading-7 text-zinc-700">Misi: {companyInfo.mission}</p>
        </div>

        <div
          role="img"
          aria-label="Petani menyemprot tanaman di lahan"
          className="min-h-85 rounded-xl bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80')" }}
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div
          role="img"
          aria-label="Lahan sawah hijau"
          className="min-h-80 rounded-2xl border border-zinc-200 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80')" }}
        />

        <div className="rounded-2xl border border-zinc-200 bg-brand-secondary p-6 md:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-800">Mengapa Pilih Kami</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Kami mengutamakan kualitas produk, harga bersaing, dan pelayanan yang dekat dengan kebutuhan petani dan peternak di lapangan.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cultureValues.map((value) => (
              <article key={value.title} className="rounded-xl border border-zinc-300 bg-white p-4">
                <h3 className="text-sm font-semibold text-zinc-800">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Perjalanan Kami</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-800">Tonggak Sejarah</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {companyMilestones.map((milestone) => (
            <article key={milestone.year} className="rounded-xl border border-zinc-200 bg-brand-surface p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{milestone.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-800">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{milestone.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-zinc-200 bg-brand-secondary p-6 md:p-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Tim Kami</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-800">Orang & Keahlian</h2>
        </div>

        <TeamCarousel members={teamMembers} />
      </section>
    </div>
  );
}