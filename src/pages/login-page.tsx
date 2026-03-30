import { FormEvent, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SectionHeading } from "../components/shared/section-heading";
import { usePageSeo } from "../hooks/use-page-seo";
import { createSession, getAuthPassword, getAuthUser } from "../lib/auth";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  usePageSeo({
    title: "Masuk",
    description: "Login ke panel admin PT SMJ Agro untuk mengelola artikel blog.",
  });

  const nextPath = useMemo(() => searchParams.get("next") ?? "/blog/create", [searchParams]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() !== getAuthUser() || password.trim() !== getAuthPassword()) {
      setError("Email atau password salah. Silakan coba lagi.");
      return;
    }

    createSession();
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <SectionHeading
        eyebrow="Autentikasi"
        title="Masuk"
        description="Anda harus login untuk membuat, mengedit, atau menghapus artikel blog."
      />

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Masukkan email Anda"
            className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">
            Kata Sandi
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Masukkan kata sandi Anda"
            className="w-full rounded-xl border border-zinc-300 bg-brand-surface px-4 py-3 text-sm outline-none ring-zinc-300 transition focus:ring"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}