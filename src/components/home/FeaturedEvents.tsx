"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import EventCard from "@/components/EventCard";
import { featuredEvents } from "@/lib/data";

export default function FeaturedEvents() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="w-full bg-muted/60 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-foreground">
            Featured Events
          </h2>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous events"
              onClick={() => api?.scrollPrev()}
              disabled={!api?.canScrollPrev()}
              className="grid size-11 place-items-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next events"
              onClick={() => api?.scrollNext()}
              disabled={!api?.canScrollNext()}
              className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-background/70 disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="mt-8 w-full"
        >
          <CarouselContent>
            {featuredEvents.map((event) => (
              <CarouselItem
                key={event.slug}
                className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <EventCard event={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
