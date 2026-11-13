import Link from "next/link";
import { CheckCircle, Megaphone, Ticket, Users } from "lucide-react";

const STEPS = [
  {
    icon: Megaphone,
    title: "Create your event",
    description: "Add the details, cover image, venue and ticket tiers.",
  },
  {
    icon: Users,
    title: "Promote it",
    description: "Share with communities and reach the right audience.",
  },
  {
    icon: Ticket,
    title: "Sell tickets",
    description: "Track sales and check in attendees with a single scan.",
  },
];

export default function HostPage() {
  return (
    <main className="w-full flex-1 bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <span>Home</span>
          <span className="px-1.5">/</span>
          <span className="font-semibold text-foreground">Host Event</span>
        </nav>

        <section className="mt-6 flex flex-col items-start rounded-3xl bg-muted px-6 py-14 md:items-center md:px-10 md:py-20 md:text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            <CheckCircle className="size-4" />
            Free to start
          </span>
          <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            Host Your Own Event
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Create an experience people will love. Our platform makes it easy to
            organize, promote, and sell tickets in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 md:justify-center">
            <Link
              href="/events"
              className="rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-colors hover:bg-blue-600"
            >
              Get Started For Free
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-border bg-background px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-background/70"
            >
              See Example Events
            </Link>
          </div>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-500">
                <step.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-bold text-foreground">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
