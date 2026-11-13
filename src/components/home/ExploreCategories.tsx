import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function ExploreCategories() {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-foreground">
            Explore By Category
          </h2>
          <Link
            href="/categories"
            className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-500 md:text-base"
          >
            View All
          </Link>
        </div>

        <div className="-mx-6 mt-8 flex snap-x gap-5 overflow-x-auto px-6 pb-2 no-scrollbar md:-mx-10 md:px-10">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href="/categories"
              className="group w-[230px] shrink-0 snap-start md:w-[260px]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground transition-colors group-hover:text-blue-500">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
