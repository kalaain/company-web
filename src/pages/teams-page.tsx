import { useEffect, useState } from "react";

import { usePageSeo } from "../hooks/use-page-seo";
import { getDynamicTeamMembers, type TeamMember } from "../lib/random-team";

export function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  usePageSeo({
    title: "Tim Kami",
    description: "Kenali tim ahli di balik PT SMJ Agro yang siap melayani kebutuhan pertanian dan peternakan Anda.",
  });

  useEffect(() => {
    void getDynamicTeamMembers().then(setTeamMembers);
  }, []);

  return (
    <div className="space-y-12">
      <section className="-mx-5 md:-mx-8">
        <div
          role="img"
          aria-label="Lahan pertanian"
          className="relative min-h-92.5 overflow-hidden border-y border-zinc-200 bg-cover bg-center md:min-h-112.5"
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/00/c4/a9/00c4a90b97c7f375c089f03f8bdd3054.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-92.5 w-full max-w-6xl items-center px-6 md:min-h-112.5 md:px-8">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80!">Tim Kami</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white! md:text-6xl">
                Ahli di balik produk pertanian terpercaya
              </h1>
              <p className="mt-4 text-white/90! md:text-lg">
                Kenali tim yang siap melayani kebutuhan petani dan peternak
                dengan pengalaman, keahlian, dan dedikasi di bidang pertanian.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Tim Kami</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-800">Orang & Keahlian</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-t-2xl rounded-br-[34px] rounded-bl-2xl border border-zinc-200 bg-white shadow-sm"
            >
              <div
                role="img"
                aria-label={`Foto ${member.name}`}
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
      </section>
    </div>
  );
}