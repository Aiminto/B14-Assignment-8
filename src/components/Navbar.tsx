"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, User, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Categories", href: "/categories" },
  { label: "My Ticket", href: "/my-ticket" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between gap-6 px-6 md:px-10">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Event.
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(pathname, item.href)
                  ? "text-[15px] font-bold text-foreground transition-colors hover:text-blue-500"
                  : "text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/events"
            aria-label="Notifications"
            className="hidden size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-muted sm:grid"
          >
            <Bell className="size-5" />
          </Link>
          <Link
            href="/my-ticket"
            aria-label="My account"
            className="hidden size-9 place-items-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/70 sm:grid"
          >
            <User className="size-5" />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-border bg-background md:hidden">
          <nav
            className="mx-auto flex w-full max-w-[1360px] flex-col gap-1 px-6 pb-6 pt-2"
            aria-label="Mobile"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  isActive(pathname, item.href)
                    ? "rounded-lg px-3 py-2.5 text-[15px] font-bold text-foreground"
                    : "rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 px-3">
              <Link
                href="/events"
                onClick={() => setOpen(false)}
                aria-label="Notifications"
                className="grid size-10 place-items-center rounded-full text-foreground hover:bg-muted"
              >
                <Bell className="size-5" />
              </Link>
              <Link
                href="/my-ticket"
                onClick={() => setOpen(false)}
                aria-label="My account"
                className="grid size-9 place-items-center rounded-full bg-muted text-foreground"
              >
                <User className="size-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
