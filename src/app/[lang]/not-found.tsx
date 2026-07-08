import Link from "next/link";

// ─── 404 Messages (per language) ────────────────────────────
// not-found.tsx is a special Next.js file that cannot use hooks
// or client-side state, so we handle i18n with a simple map here.
const messages = {
  en: {
    title: "404",
    description: "The page you're looking for doesn't exist.",
    backHome: "Back to Home",
  },
  vi: {
    title: "404",
    description: "Trang bạn tìm không tồn tại.",
    backHome: "Về trang chủ",
  },
} as const;

// ─── Component ──────────────────────────────────────────────

export default function NotFound() {
  // In Next.js, not-found.tsx doesn't receive params directly.
  // We use a simple fallback approach — the layout already sets <html lang>.
  // For a more robust solution, you could read the URL on the client side.
  const t = messages.vi; // Default to Vietnamese; adjust per project

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t.title}</h1>
      <p className="text-lg text-muted-foreground">
        {t.description}
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t.backHome}
      </Link>
    </main>
  );
}
