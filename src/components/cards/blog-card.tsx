import { Link } from "react-router-dom";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
};

export function BlogCard({ slug, title, excerpt, author, date, category }: BlogCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{category}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-800">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{excerpt}</p>
      <p className="mt-4 text-xs text-zinc-500">
        {author} · {date}
      </p>
      <Link
        to={`/blog/${slug}`}
        className="mt-4 inline-flex rounded-full border border-zinc-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:bg-zinc-100"
      >
        Baca Selengkapnya
      </Link>
    </article>
  );
}