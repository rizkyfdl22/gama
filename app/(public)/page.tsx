import About from "@/components/landing-page/about";
import Collabs from "@/components/landing-page/collabs";
import ContactSection from "@/components/landing-page/contact";
import FeaturesSection from "@/components/landing-page/features";
import GamesSection from "@/components/landing-page/games";
import Hero from "@/components/landing-page/hero";

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
        url: "https://semestaesports.id/og-home.jpg", // Menggunakan absolute URL
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
    images: ["https://semestaesports.id/og-home.jpg"], // Menggunakan absolute URL
  },
};

export default function Page() {
  return (
    <>
  <Hero/>
  <About/>
  <GamesSection/>
  <FeaturesSection/>
  <Collabs/>
  <ContactSection/>
    </>
  );
}