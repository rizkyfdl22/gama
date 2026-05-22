"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";
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
      {/* ========================= */}
      {/* BLOGS */}
      {/* ========================= */}
      <section className="latest-blogs fade-up">

        <div className="blog-header">
          <h2 className="gradient-text">Latest News</h2>

          <div className="blog-nav">
            <button onClick={scrollLeft}>‹</button>
            <button onClick={scrollRight}>›</button>
          </div>
        </div>

        <div className="blog-slider" ref={sliderRef}>
          {blogs.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              className="blog-card"
              key={blog.id}
            >
              <img src={blog.thumbnail} alt={blog.title} />

              <div className="blog-content">
                <h3>{blog.title}</h3>

                <p>
                  {blog.description?.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>

      </section>


    </div>
    
  );
}