"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import styles from "./Blogs.module.css";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home">
    <div className={styles.container}>
      <h1 className={styles.title}>Tournament Blog</h1>

      <div className={styles.grid}>
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.id}>
            <div className={styles.card}>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className={styles.image}
              />
              <div className={styles.content}>
                <h2>{blog.title}</h2>
                <p>
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}