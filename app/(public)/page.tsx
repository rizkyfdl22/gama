import { Hero } from "@components/landing-page/hero";
import { About } from "@components/landing-page/about";
import { Collabs } from "@components/landing-page/collabs";
import { Features } from "@components/landing-page/features";
import { Contact } from "@components/landing-page/contact";

export const metadata = {
  title: "Semesta Esports",

  description:
    "Platform tournament esports kompetitif untuk komunitas dan pemain Indonesia. Ikuti turnamen, berita esports, dan event terbaru hanya di Semesta Esports.",

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
      "Platform tournament esports kompetitif untuk komunitas Indonesia.",

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
      "Platform tournament esports kompetitif untuk komunitas Indonesia.",

    images: ["/og-home.jpg"],
  },
};

export default function Page() {
  return (
    <>
    <About/>
    <Hero/>
    <Collabs/>
    <Features/>
    <Contact/>
</>
  );
}