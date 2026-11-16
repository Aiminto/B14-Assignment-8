"use client";

import { useState } from "react";
import { CalendarPlus, Download, Share2 } from "lucide-react";

/**
 * Download (print to PDF), Add to Calendar (.ics) and Share actions
 * for the confirmation ticket.
 */
export default function ConfirmationActions({
  title,
  location,
  date,
  url,
}: {
  title: string;
  location: string;
  date: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCalendar = () => {
    const stamp = "20260212T090000";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Event//Checkout//EN",
      "BEGIN:VEVENT",
      `DTSTART:${stamp}`,
      `DTEND:${stamp.replace("090000", "120000")}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${date}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
    anchor.click();
    URL.revokeObjectURL(href);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: `${title} — ${date}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        <Download className="size-4" />
        Download Tickets (PDF)
      </button>

      <button
        type="button"
        onClick={handleCalendar}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <CalendarPlus className="size-4" />
        Add to Calendar
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Share2 className="size-4" />
        {copied ? "Link Copied!" : "Share Event"}
      </button>
    </div>
  );
}
