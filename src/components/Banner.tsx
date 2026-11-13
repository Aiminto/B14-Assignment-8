import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Calendar,
  ChevronRight,
  CreditCard,
  LayoutGrid,
  MapPin,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Ticket,
  Video,
} from "lucide-react";

const AVATARS = [
  "bg-gradient-to-br from-rose-400 to-amber-300",
  "bg-gradient-to-br from-sky-400 to-indigo-400",
  "bg-gradient-to-br from-emerald-400 to-teal-300",
];

function SearchField({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
      {icon}
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="truncate text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function Banner() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-6 pb-14 pt-2 md:px-10 md:pt-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] xl:gap-14">
        {/* Left: copy + CTAs */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <span className="size-2 rounded-full bg-blue-500" aria-hidden />
            New Season 2026
          </span>

          <h1 className="mt-7 text-[clamp(2.75rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            Discover
            <br />
            Events
            <br />
            <span className="text-blue-500">That Inspire</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Find and book tickets for concerts, workshops, conferences, and
            more happening near you. Join the community today
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2.5 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-colors hover:bg-blue-600"
            >
              <LayoutGrid className="size-4" />
              Explore Events
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Ticket className="size-4" />
              Get Tickets
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-[18px] text-blue-500" />
              Verified Organizers
            </span>
            <span className="inline-flex items-center gap-2">
              <CreditCard className="size-[18px] text-blue-500" />
              Secure Payment
            </span>
          </div>
        </div>

        {/* Right: event cards gallery */}
        <div className="relative">
          <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
            {/* Featured card */}
            <div className="relative aspect-[5/7] overflow-hidden rounded-3xl">
              <Image
                src="/events/neon-night-festival.jpg"
                alt="Crowd at a night music festival with confetti and stage lights"
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="absolute right-4 top-4 rounded-full bg-black/50 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                Trending
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-20">
                <p className="text-sm text-white/70">Music</p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  Neon Night Festival
                </h2>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/80">
                  <MapPin className="size-4" />
                  Bali, Indonesia
                </p>
              </div>
            </div>

            {/* Side column */}
            <div className="grid gap-3 sm:grid-rows-2">
              <div className="relative min-h-[200px] overflow-hidden rounded-3xl">
                <Image
                  src="/events/creative-workshop.jpg"
                  alt="Creators collaborating around a table at a workshop"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-14">
                  <h3 className="text-lg font-bold text-white">
                    Creative Workshop
                  </h3>
                  <p className="mt-1 text-xs text-white/80">
                    Join 500+ creators daily
                  </p>
                </div>
              </div>

              <div className="flex min-h-[200px] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                <div className="relative h-32 w-full shrink-0">
                  <Image
                    src="/events/ai-design-system-webcast.jpg"
                    alt="Audience listening to a talk at a design conference"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500">
                    <Video className="size-4" />
                    Live Webcast
                  </p>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-foreground">
                    Future of AI Design System 2026
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2.5">
                        {AVATARS.map((gradient) => (
                          <span
                            key={gradient}
                            className={`size-7 rounded-full border-2 border-background ${gradient}`}
                            aria-hidden
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        +2k
                      </span>
                    </div>
                    <span className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted">
                      <ChevronRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating quick-actions rail on the right edge */}
          <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-1.5 rounded-2xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur lg:flex">
            <span className="grid size-8 place-items-center rounded-xl bg-blue-50 text-blue-500">
              <Sparkles className="size-4" />
            </span>
            <span className="grid size-8 place-items-center rounded-xl text-muted-foreground">
              <PenTool className="size-4" />
            </span>
            <span className="grid size-8 place-items-center rounded-xl text-muted-foreground">
              <Target className="size-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mx-auto mt-10 w-full max-w-4xl rounded-[26px] border border-border bg-background p-2 pl-5 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.2)] md:pl-6">
        <div className="flex items-center gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">Search Event</p>
              <p className="truncate text-sm text-muted-foreground">
                What&apos;s on your mind?
              </p>
            </div>
          </div>

          <span className="hidden h-10 w-px bg-border md:block" />

          <SearchField
            icon={<MapPin className="size-5 shrink-0 text-muted-foreground" />}
            label="Location"
            value="Jakarta, Indonesia"
          />

          <span className="hidden h-10 w-px bg-border md:block" />

          <SearchField
            icon={<Calendar className="size-5 shrink-0 text-muted-foreground" />}
            label="Date"
            value="Oct 17 - Oct 18"
          />

          <button
            type="button"
            className="shrink-0 rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
