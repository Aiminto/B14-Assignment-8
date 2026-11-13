import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event. — Discover & Book Amazing Events",
  description:
    "Find and book tickets for concerts, workshops, conferences and more happening near you. Host your own event in minutes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${JosefinSans.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* <Navbar /> */}
        <div className="flex flex-1 flex-col">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
