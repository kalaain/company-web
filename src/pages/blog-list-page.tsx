import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { BlogCard } from "../components/cards/blog-card";
import { blogPosts } from "../data/company";
import { usePageSeo } from "../hooks/use-page-seo";
import { getCmsBlogPosts, type CmsBlogPost } from "../lib/blog-cms";

export function BlogListPage() {
  const [searchParams] = useSearchParams();
  const [cmsPosts, setCmsPosts] = useState<CmsBlogPost[]>([]);

  usePageSeo({
    title: "Blog",
    description: "Artikel tips pertanian, panduan pemupukan, dan informasi pakan ternak dari tim ahli PT SMJ Agro.",
  });

  useEffect(() => {
    void getCmsBlogPosts().then(setCmsPosts);
  }, []);

  const activeCategory = searchParams.get("category") ?? "All";

  const mergedPosts = useMemo(() => {
    const fallbackPosts = blogPosts.filter(
      (localPost) => !cmsPosts.some((cmsPost) => cmsPost.slug === localPost.slug),
    );

    return [...cmsPosts, ...fallbackPosts];
  }, [cmsPosts]);

  const categoryFilters = useMemo(
    () => ["All", ...Array.from(new Set(mergedPosts.map((post) => post.category)))],
    [mergedPosts],
  );

  const filteredPosts =
    activeCategory === "All"
      ? mergedPosts
      : mergedPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="space-y-8">
      <section className="-mx-5 md:-mx-8">
        <div
          role="img"
          aria-label="Lahan pertanian hijau"
          className="relative min-h-85 overflow-hidden border-y border-zinc-200 bg-cover bg-center md:min-h-107.5"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-85 w-full max-w-6xl items-center px-6 md:min-h-107.5 md:px-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80!">Blog</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white! md:text-6xl">
                Tips Pertanian & Panduan Peternakan
              </h1>
              <p className="mt-4 max-w-xl text-white/90! md:text-lg">
                Baca artikel seputar teknik budidaya, pemilihan produk, dan tips praktis dari tim ahli pertanian kami.
              </p>

              <div className="mt-6">
                <Link
                  to="/blog/create"
                  className="inline-flex rounded-full border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white! backdrop-blur-sm transition hover:bg-white/20"
                >
                  Tulis Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        {categoryFilters.map((category) => {
          const isActive = category === activeCategory;

          const params = new URLSearchParams(searchParams);
          if (category === "All") {
            params.delete("category");
          } else {
            params.set("category", category);
          }

          return (
            <Link
              key={category}
              to={{ pathname: "/blog", search: params.toString() }}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? "border-zinc-800 bg-zinc-800 text-white!"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {category}
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </section>
    </div>
  );
}