import { supabase } from "./lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://semestaesports.id";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tournaments`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
  ];

  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, created_at");

  const blogPages =
    blogs?.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.created_at),
    })) || [];

  return [...staticPages, ...blogPages];
}