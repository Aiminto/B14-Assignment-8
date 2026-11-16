type FeaturedPackage = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

async function fetchFeaturedPackages(): Promise<FeaturedPackage[]> {
  try {
    const res = await fetch("http://localhost:5000/slicedata", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`FeaturedData: request failed with ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("FeaturedData: could not reach localhost:5000", error);
    return [];
  }
}

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const FeaturedData = async () => {
  const packages = await fetchFeaturedPackages();

  if (packages.length === 0) {
    return (
      <section className="mx-auto my-10 w-full max-w-6xl px-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Featured Packages
        </h2>
        <p className="mt-3 text-muted-foreground">
          No packages available right now. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto my-10 w-full max-w-6xl px-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Featured Packages
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <article
            key={pkg._id}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
              {pkg.imageUrl ? (
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  className="h-full w-full object-cover"
                />
              ) : null}
              {pkg.category ? (
                <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                  {pkg.category}
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold leading-snug text-foreground">
                {pkg.name}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {pkg.country}
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                {pkg.duration} · Departs {formatDate(pkg.departureDate)}
              </p>

              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                {pkg.description}
              </p>

              <p className="mt-auto pt-5 text-[15px] font-bold text-foreground">
                ${pkg.price}
                <span className="text-xs font-medium text-muted-foreground">
                  {" "}
                  / person
                </span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedData;
