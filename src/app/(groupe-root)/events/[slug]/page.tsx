import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import EventCard from "@/components/EventCard";
import { allEvents, getEventBySlug, priceLabel } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: `${event.title} — Event.`,
    description: event.description,
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = allEvents
    .filter((item) => item.slug !== event.slug)
    .slice(0, 3);

  const highlights = [
    { icon: CalendarDays, label: "Date & Time", value: event.date },
    { icon: MapPin, label: "Location", value: event.location },
    { icon: Users, label: "Attendees", value: event.participants },
    { icon: Ticket, label: "Tickets", value: `${priceLabel(event.price)} / person` },
  ];

  return (
    <main className="w-full flex-1 bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-blue-500">
            Home
          </Link>
          <span className="px-1.5">/</span>
          <Link href="/events" className="transition-colors hover:text-blue-500">
            Upcoming Events
          </Link>
          <span className="px-1.5">/</span>
          <span className="font-semibold text-foreground">{event.title}</span>
        </nav>

        <Link
          href="/events"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-500"
        >
          <ArrowLeft className="size-4" />
          Back to all events
        </Link>

        {/* Hero */}
        <div className="relative mt-5 aspect-[16/7] w-full overflow-hidden rounded-3xl border border-border">
          <Image
            src={event.image}
            alt={event.alt}
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
            {event.category}
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {event.date}
            </span>

            <h1 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-foreground">
              {event.title}
            </h1>

            <p className="mt-3 flex items-center gap-1.5 text-base text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {event.location}
            </p>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-foreground">
                About this event
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {event.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Expect friendly hosts, smooth check-in and plenty of time to
                meet other attendees. Grab your ticket early — this event has
                sold out in previous years.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-foreground">
                Event highlights
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {highlights.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-500">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <dt className="text-xs font-medium text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-foreground">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-6">
              <p className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-foreground">
                {priceLabel(event.price)}
                <span className="text-sm font-medium text-muted-foreground">
                  {" "}
                  / person
                </span>
              </p>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0 text-blue-500" />
                  {event.date}
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <MapPin className="size-4 shrink-0 text-blue-500" />
                  {event.location}
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <Users className="size-4 shrink-0 text-blue-500" />
                  {event.participants}
                </li>
              </ul>

              <Link
                href={`/checkout/${event.slug}`}
                className="mt-6 block rounded-full bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-600"
              >
                Book Now
              </Link>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free cancellation up to 48 hours before the event.
              </p>
            </div>
          </aside>
        </div>

        {/* Related events */}
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-foreground">
              You might also like
            </h2>
            <Link
              href="/events"
              className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-500"
            >
              View all events
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEvents.map((item) => (
              <EventCard key={item.slug} event={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
