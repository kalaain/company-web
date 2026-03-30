type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-800">{title}</h2>
      {description ? <p className="max-w-3xl text-zinc-600">{description}</p> : null}
    </div>
  );
}