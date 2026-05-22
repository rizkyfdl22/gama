import BlogsPage from "./BlogsPage";

export const metadata = {
  title: "Blogs",

  description:
    "Berita, artikel, dan update terbaru seputar esports, tournament, gaming, dan komunitas dari Semesta Esports.",

  keywords: [
    "esports",
    "gaming",
    "tournament",
    "mobile legends",
    "semesta esports",
    "blog esports",
  ],

  openGraph: {
    title: "Blogs | Semesta Esports",

    description:
      "Artikel dan berita terbaru dunia esports dari Semesta Esports.",

    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blogs",

    description:
      "Artikel dan berita terbaru dunia esports dari Semesta Esports.",

    images: ["/og-blog.jpg"],
  },
};

export default function Page() {
  return <BlogsPage />;
}