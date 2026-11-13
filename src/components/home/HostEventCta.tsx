import Image from "next/image";
import Link from "next/link";

export default function HostEventCta() {
  return (
    <section className="w-full bg-muted/60 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="/events/host-event.jpg"
            alt="Crowd gathered inside a large hall for an evening event"
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-[center_75%]"
          />
          <div className="absolute inset-0 bg-black/70" aria-hidden />

          <div className="relative flex flex-col items-center px-6 py-16 text-center md:py-24">
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-tight text-white">
              Host Your Own Event
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Create an experience people will love. Our platform makes it easy
              to organize, promote, and sell tickets in minutes
            </p>
            <Link
              href="/host"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-600"
            >
              Get Started For Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
