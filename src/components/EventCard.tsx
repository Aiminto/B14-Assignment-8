"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/data";
import { priceLabel } from "@/lib/data";

export default function EventCard({
  event,
  className = "",
}: {
  event: EventItem;
  className?: string;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg ${className}`}
    >
      <div className="relative">
        <div className="relative aspect-[16/11] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
            {event.category}
          </span>

          <button
            type="button"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={liked}
            onClick={() => setLiked((value) => !value)}
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background shadow-sm transition-transform hover:scale-110"
          >
            <Heart
              className={`size-4 ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`}
            />
          </button>
        </div>

        <span className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-background px-4 py-1.5 text-xs font-semibold text-blue-500 shadow-sm">
          {event.date}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-7">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          <Link href="/events" className="transition-colors hover:text-blue-500">
            {event.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          {event.location}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-[15px] font-bold text-foreground">
            {priceLabel(event.price)}
            <span className="text-xs font-medium text-muted-foreground">
              {" "}
              / person
            </span>
          </p>
          <Link
            href="/events"
            className="rounded-full bg-blue-500 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
