import { supabase } from "@/app/lib/supabase";
import BlogDetail from "./BlogDetail";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    return {
      title: "Blog Not Found | Semesta Esports",
    };
  }

  return {
    title: `${blog.title} | Semesta Esports`,

    description:
      blog.description ||
      "Artikel terbaru esports dari Semesta Esports.",

    keywords: [
      "esports",
      "tournament",
      "gaming",
      "mobile legends",
      blog.title,
    ],

    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.thumbnail],
    },
  };
}

export default function Page() {
  return <BlogDetail />;
}