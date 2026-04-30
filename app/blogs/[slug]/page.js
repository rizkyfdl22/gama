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
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      setBlog(data);
    };

    fetchBlog();
  }, [slug]);

  if (!blog) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className="home">
      {/* 🔥 HERO */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${blog.thumbnail})` }}
      >
        <div className={styles.overlay}>
          <h1>{blog.title}</h1>
          <p>{new Date(blog.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* 📄 CONTENT */}
      <div className={styles.container}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}