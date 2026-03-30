import { useState } from "react";
import { Link } from "react-router-dom";

import { companyInfo } from "../../data/company";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Produk", href: "/product" },
  { label: "Tim", href: "/teams" },
  { label: "Blog", href: "/blog" },
  { label: "Tulis Blog", href: "/blog/create" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-brand-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <div>
          <Link to="/" className="text-2xl font-semibold tracking-tight text-zinc-800">
            {companyInfo.name}
          </Link>
          <p className="text-xs text-zinc-600">{companyInfo.tagline}</p>
        </div>

        <nav aria-label="Main navigation">
          <ul className="hidden items-center gap-5 text-sm text-zinc-700 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-zinc-900" to={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-nav-menu" className="border-t border-zinc-200 bg-brand-surface md:hidden">
          <nav className="mx-auto w-full max-w-6xl px-5 py-3" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
                    to={item.href}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}