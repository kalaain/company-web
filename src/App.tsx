import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SiteFooter } from "./components/layout/site-footer";
import { SiteHeader } from "./components/layout/site-header";
import { AboutPage } from "./pages/about-page";
import { BlogListPage } from "./pages/blog-list-page";
import { BlogPostPage } from "./pages/blog-post-page";
import { CreateBlogPage } from "./pages/create-blog-page";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { ProductPage } from "./pages/product-page";
import { TeamsPage } from "./pages/teams-page";

function AppLayout() {
  return (
    <div className="min-h-screen bg-brand-surface text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/blog/create" element={<CreateBlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
