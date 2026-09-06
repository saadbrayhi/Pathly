const FALLBACK_BASE_URL = "http://localhost:3000";

/**
 * Normalized site base URL — no trailing slash, regardless of whether
 * NEXT_PUBLIC_BASE_URL is configured with or without one. Local/Production
 * have historically disagreed on this (see docs/ENVIRONMENT_AUDIT.md),
 * which produced double slashes in Whish callback URLs, certificate-share
 * links, and robots.txt/sitemap.xml.
 */
export function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_URL || FALLBACK_BASE_URL;
  return raw.replace(/\/+$/, "");
}

/** Joins `path` onto the normalized base URL with exactly one slash. */
export function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined") {
    return normalizedPath;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return `${baseUrl}${normalizedPath}`;
}

/**
 * International SEO URL Architecture (Stage 2) — `buildUrl` above is
 * deliberately left untouched (no `locale` parameter added to it): every
 * existing call site — sitemap's static-page list, email CTA builders,
 * certificate/share links — either wants the bare English URL or (for the
 * four language-neutral identity/verification families) must NEVER gain
 * an `/ar` prefix regardless of caller locale. Adding an optional locale
 * param to `buildUrl` itself would risk a caller passing one by mistake
 * for exactly those routes. This sibling function is the only place that
 * injects the `/ar` prefix, kept deliberately separate and only used by
 * genuinely locale-varying public pages (canonical/hreflang metadata,
 * `/ar` sitemap entries).
 */
export function buildLocalizedUrl(path: string, locale: "en" | "ar"): string {
  const cleanPath = path.replace(/^\/+/, "");
  if (locale !== "ar") return buildUrl(cleanPath);
  return buildUrl(cleanPath ? `ar/${cleanPath}` : "ar");
}
