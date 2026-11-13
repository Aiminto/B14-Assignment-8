import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { upcomingEvents, priceLabel } from "@/lib/data";

export default function UpcomingEvents() {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-foreground">
            Upcoming Events
          </h2>
          <Link
            href="/events"
            className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-500 md:text-base"
          >
            View All events
          </Link>
        </div>

        <div className="mt-8 space-y-5">
          {upcomingEvents.map((event) => (
            <article
              key={event.slug}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md md:flex-row md:items-center md:gap-7 md:p-5"
            >
              <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl md:h-[168px] md:w-[290px]">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 290px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col px-1 md:px-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {event.category}
                  </span>
                  <span className="text-sm font-semibold text-blue-500">
                    {event.date}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold leading-snug text-foreground md:text-2xl">
                  <Link
                    href="/events"
                    className="transition-colors hover:text-blue-500"
                  >
                    {event.title}
                  </Link>
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {event.location}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="size-4" />
                    {event.participants}
                  </p>

                  <div className="flex items-center gap-5">
                    <span className="text-[15px] font-bold text-foreground">
                      {priceLabel(event.price)}
                    </span>
                    <Link
                      href="/events"
                      className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
