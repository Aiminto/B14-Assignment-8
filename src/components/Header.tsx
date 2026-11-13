import { Bookmark, Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        {/* Page title */}
        <h1 className="pt-6 text-xl font-bold tracking-tight text-foreground">
          Comfort Event
        </h1>

        {/* Creator profile row */}
        <div className="flex items-center justify-between gap-4 pb-6 pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-foreground text-sm font-bold text-background">
              AIM
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">Aim.id</p>
              <p className="flex items-center gap-5">
                <span className="text-sm font-semibold text-green-500">
                  Available for work
                </span>
                <button
                  type="button"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Follow
                </button>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Save to favorites"
              className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              <Heart className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Bookmark"
              className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
            >
              <Bookmark className="size-4" />
            </button>
            <button
              type="button"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
