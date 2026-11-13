import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Browse Events", href: "/events" },
      { label: "Create Event", href: "/host" },
      { label: "Pricing", href: "/host" },
      { label: "Download App", href: "/events" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/my-ticket" },
      { label: "Terms & Conditions", href: "/my-ticket" },
      { label: "Privacy Policy", href: "/my-ticket" },
      { label: "Contact Us", href: "/my-ticket" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Blog", href: "/events" },
      { label: "Partners", href: "/categories" },
    ],
  },
];

function SocialLink({
  label,
  href,
  className = "",
  children,
}: {
  label: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`grid size-8 place-items-center rounded-md text-foreground transition-colors hover:text-blue-500 ${className}`}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-14 lg:py-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Event.
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The world&apos;s leading platform for finding and creating events.
              Connect with communities and explore your passions.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialLink label="LinkedIn" href="/">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.01h4.56V24H.22V8.01zM8.34 8.01h4.37v2.18h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-7.28c0-1.74-.03-3.98-2.42-3.98-2.43 0-2.8 1.89-2.8 3.85V24H8.34V8.01z" />
                </svg>
              </SocialLink>
              <SocialLink label="Facebook" href="/" className="text-blue-500">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialLink>
              <SocialLink label="Instagram" href="/">
                <svg viewBox="0 0 24 24" className="size-4" fill="none">
                  <rect
                    x="2.5"
                    y="2.5"
                    width="19"
                    height="19"
                    rx="5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" />
                </svg>
              </SocialLink>
              <SocialLink label="X" href="/">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[15px] font-bold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Event. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
