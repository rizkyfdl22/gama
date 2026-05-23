import { supabaseServer } from "@/app/lib/supabase/server";
import BlogDetail from "./BlogDetail";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const { data: blog } = await supabaseServer
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,

    description:
      blog.description ||
      "Artikel terbaru esports dari Semesta Esports.",

    keywords: [
      "esports",
      "tournament",
      "berita esports",
      "portal berita",
      "news esports",
      "esports indonesia",
      "gaming",
      "semesta esports",
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

export default async function Page({ params }) {
  const { slug } = params;

  const { data: blog, error } = await supabaseServer
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !blog) {
    return <p>Blog not found</p>;
  }

  const { data: relatedBlogs } = await supabaseServer
    .from("blogs")
    .select("*")
    .neq("id", blog.id)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <BlogDetail
      blog={blog}
      relatedBlogs={relatedBlogs || []}
    />
  );
}