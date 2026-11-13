import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Categories — Event.",
  description:
    "Explore events by category: music, technology, business, art, health, food, sports and film.",
};

export default function CategoriesPage() {
  return (
    <main className="w-full bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <span>Home</span>
          <span className="px-1.5">/</span>
          <span className="font-semibold text-foreground">Categories</span>
        </nav>

        <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight text-foreground">
          Browse Categories
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Pick a category and dive into the events our organizers are running
          this season.
        </p>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href="/events"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-base font-bold text-foreground transition-colors group-hover:text-blue-500">
                  {category.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.subtitle}
                </p>
                <p className="mt-4 text-xs font-semibold text-blue-500">
                  {category.eventsCount} events
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
