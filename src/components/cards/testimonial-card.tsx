type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm leading-7 text-zinc-700">“{quote}”</p>
      <p className="mt-4 text-sm font-semibold text-zinc-800">{name}</p>
      <p className="text-xs text-zinc-500">{role}</p>
    </article>
  );
}
