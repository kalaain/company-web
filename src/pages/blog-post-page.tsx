import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { blogPosts } from "../data/company";
import { usePageSeo } from "../hooks/use-page-seo";
import { getCmsBlogPosts, type CmsBlogPost } from "../lib/blog-cms";

export function BlogPostPage() {
  const { slug } = useParams();
  const [cmsPosts, setCmsPosts] = useState<CmsBlogPost[]>([]);

  useEffect(() => {
    void getCmsBlogPosts().then(setCmsPosts);
  }, []);

  const post = useMemo(() => {
    const allPosts = [
      ...cmsPosts,
      ...blogPosts.filter((localPost) => !cmsPosts.some((cmsPost) => cmsPost.slug === localPost.slug)),
    ];

    return allPosts.find((item) => item.slug === slug);
  }, [cmsPosts, slug]);

  usePageSeo({
    title: post?.title ?? "Artikel",
    description: post?.excerpt ?? "Baca artikel seputar pertanian dan peternakan dari PT SMJ Agro.",
  });

  if (!post) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 md:text-4xl">Artikel tidak ditemukan</h1>
          <p className="mt-3 text-sm text-zinc-500">Artikel yang Anda cari tidak tersedia.</p>
        </div>
        <Link
          to="/blog"
          className="inline-flex rounded-full border border-zinc-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:bg-zinc-100"
        >
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{post.category}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-800 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Oleh {post.author} · {post.date}
        </p>

        <div className="mt-6 space-y-4 text-zinc-700">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="leading-7">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Link
        to="/blog"
        className="inline-flex rounded-full border border-zinc-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:bg-zinc-100"
      >
        Kembali ke Blog
      </Link>
    </div>
  );
}