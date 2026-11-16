import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import Navbar from "@/components/Navbar";
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
  return { title: event ? `Checkout — ${event.title}` : "Checkout" };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="w-full flex-1 bg-background">
        <div className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-blue-500">
              Home
            </Link>
            <span className="px-1.5">/</span>
            <Link
              href="/events"
              className="transition-colors hover:text-blue-500"
            >
              Event
            </Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-foreground">Checkout</span>
          </nav>

          {/* Heading + stepper */}
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight text-foreground">
                Checkout
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {event.title} — {event.date} — {priceLabel(event.price)} / person
              </p>
            </div>
            <CheckoutStepper current={2} />
          </div>

          <CheckoutForm event={event} />
        </div>
      </main>
    </>
  );
}
