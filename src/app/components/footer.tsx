import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  const footerLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Support", href: "/support" },
    { label: "Blog", href: "/blog" },
    { label: "Feedback", href: "https://cravit.featurebase.app/", external: true },
  ];

  return (
    <footer className="border-t border-[rgba(18,17,17,0.08)] bg-[var(--color-white)] px-5 py-8 sm:px-10 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium tracking-tight text-[var(--color-dark-1)]">
            Cravit
          </span>
          <span className="body-s text-[rgba(18,17,17,0.6)]">
            © {year} Cravit. All rights reserved.
          </span>
        </div>

        <nav aria-label="Footer navigation" className="text-sm">
          <ul className="flex flex-wrap gap-4 text-[rgba(18,17,17,0.7)]">
            {footerLinks.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-[var(--color-dark-1)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="transition-colors hover:text-[var(--color-dark-1)]">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
