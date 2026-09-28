import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-sand py-8">
      <div className="mx-auto w-full max-w-6xl px-4 text-sm text-ink-soft sm:px-6 min-[1536px]:max-w-7xl min-[1920px]:max-w-[90rem]">
        <p>© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
