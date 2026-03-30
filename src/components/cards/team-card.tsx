type TeamCardProps = {
  name: string;
  role: string;
  bio: string;
};

export function TeamCard({ name, role, bio }: TeamCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4 h-20 w-20 rounded-full bg-brand-secondary" />
      <h3 className="text-lg font-semibold text-zinc-800">{name}</h3>
      <p className="text-sm text-zinc-500">{role}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{bio}</p>
    </article>
  );
}
