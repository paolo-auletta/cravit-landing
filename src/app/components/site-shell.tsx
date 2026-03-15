import type { ReactNode } from "react";

import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-full bg-[var(--color-dark-1)] px-4 py-2 text-sm font-medium text-white shadow-lg focus:not-sr-only focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(255,105,0,0.28)]"
      >
        Skip to Main Content
      </a>

      <main id="main-content" className="min-h-screen bg-[var(--color-background)] pt-28 sm:pt-32">
        <section className="px-5 pt-6 sm:px-10 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <Navbar />
          </div>
        </section>

        {children}

        <Footer />
      </main>
    </>
  );
}
