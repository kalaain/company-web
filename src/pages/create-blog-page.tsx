import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SectionHeading } from "../components/shared/section-heading";
import { usePageSeo } from "../hooks/use-page-seo";
import { clearSession, isAuthenticated } from "../lib/auth";
import {
  createCmsBlogPost,
  deleteCmsBlogPost,
  getCmsBlogPostsForAdmin,
  type CmsAdminBlogPost,
  updateCmsBlogPost,
} from "../lib/blog-cms";

type FormState = {
  entryId: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  author: string;
  content: string;
};

const emptyForm: FormState = {
  entryId: "",
  title: "",
  excerpt: "",
  category: "",
  tags: "",
  author: "",
  content: "",
};

export function CreateBlogPage() {
  const navigate = useNavigate();
  const [isCheckedAuth, setIsCheckedAuth] = useState(false);
  const [cmsPosts, setCmsPosts] = useState<CmsAdminBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>(emptyForm);

  const isEditMode = useMemo(() => Boolean(formState.entryId), [formState.entryId]);

  usePageSeo({
    title: "Kelola Blog",
    description: "Buat, edit, dan hapus artikel blog PT SMJ Agro dari satu halaman.",
  });

  const refreshPosts = async () => {
    setIsLoading(true);
    try {
      const posts = await getCmsBlogPostsForAdmin();
      setCmsPosts(posts);
    } catch (caughtError) {
      const details = caughtError instanceof Error ? caughtError.message : "Terjadi kesalahan pada CMS";
      setError(details);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login?next=/blog/create", { replace: true });
      return;
    }

    setIsCheckedAuth(true);
    void refreshPosts();
  }, [navigate]);

  const resetForm = () => {
    setFormState(emptyForm);
  };

  const onSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const title = formState.title.trim();
    const excerpt = formState.excerpt.trim();
    const category = formState.category.trim();
    const author = formState.author.trim();
    const content = formState.content.trim();

    if (!title || !excerpt || !category || !author || !content) {
      setError("Harap lengkapi semua field yang wajib diisi.");
      return;
    }

    const tags = formState.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateCmsBlogPost({
          entryId: formState.entryId,
          title,
          excerpt,
          author,
          category,
          content,
          tags,
        });
        setMessage("Blog berhasil diperbarui.");
      } else {
        await createCmsBlogPost({
          title,
          excerpt,
          author,
          category,
          content,
          tags,
        });
        setMessage("Blog berhasil dipublikasikan.");
      }

      resetForm();
      await refreshPosts();
    } catch (caughtError) {
      const details = caughtError instanceof Error ? caughtError.message : "Terjadi kesalahan pada CMS";
      setError(details);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async (entryId: string) => {
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      await deleteCmsBlogPost(entryId);
      setMessage("Blog berhasil dihapus.");

      if (formState.entryId === entryId) {
        resetForm();
      }

      await refreshPosts();
    } catch (caughtError) {
      const details = caughtError instanceof Error ? caughtError.message : "Terjadi kesalahan pada CMS";
      setError(details);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEdit = (post: CmsAdminBlogPost) => {
    setMessage(null);
    setError(null);
    setFormState({
      entryId: post.entryId,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags?.join(", ") ?? "",
      author: post.author,
      content: post.contentMarkdown,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  if (!isCheckedAuth) {
    return null;
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Tulis Blog"
        title="Kelola artikel blog"
        description="Buat, edit, dan hapus artikel blog dari satu halaman. Konten mendukung format Markdown."
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Keluar
        </button>
      </div>

      {message ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-800">
                {isEditMode ? "Edit artikel" : "Buat artikel baru"}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {isEditMode
                  ? "Perbarui artikel yang dipilih dan publikasikan versi terbaru."
                  : "Isi kolom di bawah untuk mempublikasikan artikel baru."}
              </p>
            </div>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {isEditMode ? "Mode edit" : "Mode buat"}
            </span>
          </div>

          <form onSubmit={onSave} className="space-y-5">
            {isEditMode ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Mengedit <span className="font-medium">{formState.title}</span>.&nbsp;
                <button type="button" onClick={resetForm} className="underline">
                  Batalkan edit
                </button>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="title" className="text-sm font-medium text-zinc-700">
                  Judul
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Masukkan judul artikel"
                  value={formState.title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-zinc-700">
                  Kategori
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Perlindungan Tanaman / Pupuk / Pakan Ternak"
                  value={formState.category}
                  onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                  className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-medium text-zinc-700">
                  Penulis
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Nama penulis"
                  value={formState.author}
                  onChange={(event) => setFormState((prev) => ({ ...prev, author: event.target.value }))}
                  className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="excerpt" className="text-sm font-medium text-zinc-700">
                  Ringkasan
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows={3}
                  placeholder="Ringkasan singkat untuk ditampilkan di daftar blog"
                  value={formState.excerpt}
                  onChange={(event) => setFormState((prev) => ({ ...prev, excerpt: event.target.value }))}
                  className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="tags" className="text-sm font-medium text-zinc-700">
                  Tag (opsional)
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="pestisida, pupuk, pakan, budidaya"
                  value={formState.tags}
                  onChange={(event) => setFormState((prev) => ({ ...prev, tags: event.target.value }))}
                  className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="content" className="text-sm font-medium text-zinc-700">
                  Konten (Markdown)
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={11}
                  placeholder="# Judul&#10;&#10;Tulis konten artikel dalam format Markdown..."
                  value={formState.content}
                  onChange={(event) => setFormState((prev) => ({ ...prev, content: event.target.value }))}
                  className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Menyimpan..." : isEditMode ? "Perbarui di CMS" : "Publikasikan ke CMS"}
              </button>

              {isEditMode ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Kembali ke buat baru
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-800">Artikel yang sudah diposting</h2>
              <p className="mt-1 text-sm text-zinc-500">Klik artikel untuk melihat, mengedit, atau menghapus.</p>
            </div>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {cmsPosts.length} artikel
            </span>
          </div>

          {isLoading ? (
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
              Memuat artikel blog...
            </p>
          ) : cmsPosts.length === 0 ? (
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
              Belum ada artikel blog.
            </p>
          ) : (
            <div className="space-y-3">
              {cmsPosts.map((post) => (
                <article
                  key={post.entryId}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-800">{post.title}</h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        {post.category} · {post.date} · {post.author}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:bg-zinc-100"
                      >
                        Lihat
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(post)}
                        className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:bg-zinc-100"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void onDelete(post.entryId)}
                        disabled={isSubmitting}
                        className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}