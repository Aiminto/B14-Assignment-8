import Link from "next/link";
import { Ticket } from "lucide-react";

export default function MyTicketPage() {
  return (
    <main className="w-full flex-1 bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <span>Home</span>
          <span className="px-1.5">/</span>
          <span className="font-semibold text-foreground">My Ticket</span>
        </nav>

        <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight text-foreground">
          My Ticket
        </h1>

        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-blue-50 text-blue-500">
            <Ticket className="size-7" />
          </span>
          <h2 className="mt-6 text-xl font-bold text-foreground">
            You don&apos;t have any tickets yet
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            When you book an event it will show up here — ready to scan, share
            or add to your calendar.
          </p>
          <Link
            href="/events"
            className="mt-7 rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </main>
  );
}
