import AboutPage from "./AboutPage";

export const metadata = {
  title: "About Us",

  description:
    "Kenali Semesta Esports, platform dan komunitas esports Indonesia yang menghadirkan tournament kompetitif, profesional, dan terbuka untuk semua pemain.",

  keywords: [
    "about semesta esports",
    "platform esports indonesia",
    "komunitas esports",
    "Semesta esports",
    "berita esports",
    "tournament esports",
    "gaming indonesia",
  ],

  openGraph: {
    title: "About Us",

    description:
      "Platform dan komunitas esports Indonesia untuk turnamen kompetitif.",

    url: "https://semestaesports.id/about",

    siteName: "Semesta Esports",

    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
      },
    ],

    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "About Us",

    description:
      "Platform dan komunitas esports Indonesia untuk turnamen kompetitif.",

    images: ["/og-about.jpg"],
  },
};

export default function Page() {
  return <AboutPage />;
}