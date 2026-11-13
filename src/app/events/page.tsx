"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/EventCard";
import { featuredEvents, upcomingEvents } from "@/lib/data";

const ALL_EVENTS = [...featuredEvents, ...upcomingEvents];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
] as const;

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>(
    "relevance"
  );

  const events = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = ALL_EVENTS.filter(
      (event) =>
        normalized.length === 0 ||
        event.title.toLowerCase().includes(normalized) ||
        event.category.toLowerCase().includes(normalized) ||
        event.location.toLowerCase().includes(normalized)
    );

    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [query, sort]);

  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <span>Home</span>
          <span className="px-1.5">/</span>
          <span className="font-semibold text-foreground">Upcoming Events</span>
        </nav>

        <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight text-foreground">
          Upcoming Events
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Discover local experiences — find the best concerts, workshop and
          meetups near you.
        </p>

        {/* Search + sort */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events by name, artist, or venue..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-muted-foreground md:pl-2">
            Sort by:
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as (typeof SORT_OPTIONS)[number]["value"])
              }
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing <span className="font-bold text-foreground">{events.length}</span>{" "}
          of <span className="font-bold text-foreground">{ALL_EVENTS.length}</span>{" "}
          events
        </p>

        {events.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <p className="text-base font-semibold text-foreground">
              No events found
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword or clear the search.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
