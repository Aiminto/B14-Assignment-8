import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Clock, Mail, MapPin, Phone, Ticket } from "lucide-react";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ConfirmationActions from "@/components/checkout/ConfirmationActions";
import QrCode from "@/components/checkout/QrCode";
import Navbar from "@/components/Navbar";
import { getEventBySlug } from "@/lib/data";

type Params = { slug: string };
type SearchParams = {
  name?: string;
  email?: string;
  qty?: string;
  total?: string;
  payment?: string;
  promo?: string;
};

export const metadata: Metadata = { title: "Registration Confirmed — Event." };

function orderNumber(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
  }
  return (hash % 90000000 + 10000000).toString();
}

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const name = query.name?.trim() || "Sarah";
  const firstName = name.split(/\s+/)[0];
  const email = query.email?.trim() || "sarah@example.com";
  const orderId = orderNumber(`${slug}-${name}-${email}`);
  const [eventDate, eventTime] = event.date.split("•").map((part) => part.trim());
  const locationParts = event.location.split(",").map((part) => part.trim());
  const venue = locationParts.join(", ");

  const ticketDetails = [
    { label: "Name", value: firstName },
    { label: "Seat", value: `Section A Row ${4 + (Number(orderId.slice(-1)) % 5)}` },
    { label: "Date", value: eventDate },
  ];

  return (
    <>
      <Navbar />
      <main className="w-full flex-1 bg-background">
      <div className="mx-auto w-full max-w-[1000px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
        <CheckoutStepper current={3} />

        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
            Registration Confirmed
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Thank you, {firstName}, your order{" "}
            <span className="font-bold text-foreground">#{orderId}</span> is
            complete.
            <br />A confirmation has been sent to{" "}
            <a
              href={`mailto:${email}`}
              className="font-semibold text-blue-500 underline underline-offset-2"
            >
              {email}
            </a>
            .
          </p>
        </div>

        {/* Ticket card */}
        <section className="mx-auto mt-8 max-w-[760px] rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-[4/3] sm:w-48">
              <Image
                src={event.image}
                alt={event.alt}
                fill
                sizes="(max-width: 640px) 100vw, 192px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {event.category}
              </span>
              <h2 className="mt-2 text-lg font-bold leading-snug text-foreground md:text-xl">
                {event.title}
              </h2>
              <p className="mt-1.5 flex items-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-500" />
                {venue}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5 text-blue-500" />
                    Date
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    {eventDate}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5 text-blue-500" />
                    Time
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    {eventTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stub: QR + ticket details */}
          <div className="mt-5 flex flex-col gap-5 rounded-2xl bg-muted/70 p-5 sm:flex-row">
            <QrCode value={`${slug}-${orderId}`} size={140} />

            <div className="min-w-0 flex-1">
              <p className="text-center font-mono text-sm font-bold tracking-wide text-foreground sm:text-left">
                {event.title}
              </p>

              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ticketDetails.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-[11px] text-muted-foreground">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 break-words rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3">
                <dt className="text-[11px] text-muted-foreground">
                  Event Address
                </dt>
                <dd className="mt-1 break-words rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground">
                  {event.location}
                </dd>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <ConfirmationActions
          title={event.title}
          location={event.location}
          date={event.date}
          url={`/events/${event.slug}`}
        />

        <p className="mt-6 text-center text-xs font-medium text-muted-foreground">
          Need help with your order?{" "}
          <a
            href="mailto:supportevent@gmail.com"
            className="text-blue-500 underline underline-offset-2"
          >
            Contact support
          </a>
        </p>

        {/* Summary strip */}
        <div className="mx-auto mt-8 flex max-w-[760px] flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Ticket className="size-4 text-blue-500" />
            {query.qty ?? "1"} × General Admission
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="size-4 text-blue-500" />
            {email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="size-4 text-blue-500" />
            Support +62 (800) 123-4567
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/events"
            className="font-semibold text-blue-500 transition-colors hover:text-blue-600"
          >
            Browse more events
          </Link>
          <span aria-hidden className="text-border">
            •
          </span>
          <Link
            href="/my-ticket"
            className="font-semibold text-blue-500 transition-colors hover:text-blue-600"
          >
            Go to My Ticket
          </Link>
        </div>
      </div>
      </main>
    </>
  );
}
