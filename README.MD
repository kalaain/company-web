# PT SMJ Agro — Company Profile Website

Website company profile untuk PT SMJ Agro, distributor obat-obatan pertanian, pestisida, pupuk, dan pakan ternak.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Contentful (Headless CMS)

## Halaman

| Halaman | Path | Keterangan |
|---------|------|------------|
| Beranda | `/` | Hero banner, produk unggulan, testimoni |
| Tentang Kami | `/about` | Sejarah, budaya, milestone, tim |
| Produk | `/product` | Katalog produk & layanan |
| Tim | `/teams` | Data tim dari randomuser.me API |
| Blog | `/blog` | Daftar artikel dengan filter kategori |
| Detail Blog | `/blog/:slug` | Isi lengkap artikel |
| Tulis Blog | `/blog/create` | CRUD blog (perlu login) |
| Login | `/login` | Autentikasi admin |

## Login Admin

Untuk mengakses halaman **Tulis Blog** (`/blog/create`), gunakan:

```
Email    : admin@SMJ.local
Password : admin123
```

## Menjalankan di Lokal

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build production
npm run build
```

## Environment Variables

Buat file `.env` di root project dengan isi berikut:

```
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
VITE_CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
VITE_CONTENTFUL_ENVIRONMENT=master
VITE_CONTENTFUL_BLOG_CONTENT_TYPE=blogPost
VITE_CONTENTFUL_LOCALE=en-US
VITE_BLOG_AUTH_USER=admin@SMJ.local
VITE_BLOG_AUTH_PASSWORD=admin123
```