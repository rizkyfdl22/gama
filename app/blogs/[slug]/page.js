import { supabaseServer } from "@/app/lib/supabase/server";
import BlogDetail from "./BlogDetail";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const supabase = supabaseServer();

  const { data: blog } = await supabase
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
  };
}

export default async function Page({ params }) {
  const { slug } = params;

  const supabase = supabaseServer();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  console.log(blog);
  console.log(error);

  if (error || !blog) {
    return <p>Blog not found</p>;
  }

  const { data: relatedBlogs } = await supabase
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