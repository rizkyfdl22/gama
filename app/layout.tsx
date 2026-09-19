import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";


export const metadata = {
  metadataBase: new URL("https://semestaesports.id"),

  title: {
    default: "Semesta Esports",
    template: "%s | Semesta Esports",
  },

  description:
    "Platform dan komunitas esports untuk turnamen kompetitif, berita gaming, dan event esports Indonesia.",

  keywords: [
   "esports",
    "tournament esports",
    "mobile legends",
    "gaming indonesia",
    "semesta esports",
    "scrim",
    "platform tournament",
    "platform",
    "tournament tangerang selatan",
    "turnamen mlbb",
  ],

  openGraph: {
    title: "Semesta Esports",

    description:
      "Platform dan komunitas esports Indonesia.",

    url: "https://semestaesports.id",

    siteName: "Semesta Esports",

    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
      },
    ],

    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Semesta Esports",

    description:
      "Platform dan komunitas esports Indonesia.",

    images: ["/og-home.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <html lang="id">
      <Navbar/>
      <body>
          {children}
      </body>
      <Footer/>
    </html>
    </>
  );
}