import { Link } from "react-router-dom";

import { companyInfo } from "../../data/company";

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-zinc-200 bg-brand-secondary">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-10 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-4xl font-semibold tracking-tight text-zinc-700 md:text-6xl">
            SMJ
          </h3>
          <p className="mt-3 text-sm text-zinc-600">{companyInfo.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-700">Navigasi</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>
              <Link to="/about">Tentang Kami</Link>
            </li>
            <li>
              <Link to="/product">Produk</Link>
            </li>
            <li>
              <Link to="/teams">Tim</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-700">Kontak</p>
          <p className="mt-3 text-sm text-zinc-600">hello@SMJ.com</p>
          <p className="text-sm text-zinc-600">Senin - Jumat, 09.00 - 18.00</p>
        </div>
      </div>
    </footer>
  );
}
