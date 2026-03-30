const AUTH_STORAGE_KEY = "SMJ_blog_auth";

function getExpectedSessionToken() {
  const authUser = import.meta.env.VITE_BLOG_AUTH_USER ?? "admin@SMJ.local";
  const authPassword = import.meta.env.VITE_BLOG_AUTH_PASSWORD ?? "admin123";

  return `${authUser}:${authPassword}`;
}

export function getAuthUser() {
  return import.meta.env.VITE_BLOG_AUTH_USER ?? "admin@SMJ.local";
}

export function getAuthPassword() {
  return import.meta.env.VITE_BLOG_AUTH_PASSWORD ?? "admin123";
}

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  const currentToken = window.localStorage.getItem(AUTH_STORAGE_KEY);
  return currentToken === getExpectedSessionToken();
}

export function createSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, getExpectedSessionToken());
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
