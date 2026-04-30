"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams } from "next/navigation";
import styles from "./BlogDetail.module.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) setBlog(data);
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className="home">
    <div className={styles.container}>
      <img src={blog.thumbnail} className={styles.image} />

      <h1>{blog.title}</h1>
      <p className={styles.date}>
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
    </div>
  );
}