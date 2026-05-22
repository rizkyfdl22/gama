"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./BlogDetail.module.css";

export default function BlogDetail() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const sliderRef = useRef(null);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    setBlog(data);

    if (data) {
      fetchRelatedBlogs(data.id);
    }
  };

  const fetchRelatedBlogs = async (currentId) => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .neq("id", currentId)
      .order("created_at", { ascending: false })
      .limit(6);

    setRelatedBlogs(data || []);
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  if (!blog) return <p className={styles.loading}>Loading...</p>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    image: [blog.thumbnail],
    datePublished: blog.created_at,
    description: blog.description,
    author: {
      "@type": "Organization",
      name: "Semesta Esports",
    },
  };

  return (
    <div className="home">

      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* HERO */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${blog.thumbnail})` }}
      >
        <div className={styles.overlay}>
          <h1>{blog.title}</h1>

          <p>
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.container}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* RELATED BLOGS */}
      <section className={styles.relatedSection}>

        <div className={styles.relatedHeader}>
          <h2>Related Blogs</h2>

          <div className={styles.blogNav}>
            <button onClick={scrollLeft}>‹</button>
            <button onClick={scrollRight}>›</button>
          </div>
        </div>

        <div className={styles.blogSlider} ref={sliderRef}>
          {relatedBlogs.map((item) => (
            <Link
              href={`/blogs/${item.slug}`}
              key={item.id}
              className={styles.blogCard}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div className={styles.blogContent}>
                <h3>{item.title}</h3>

                <p>
                  {item.description?.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </div>
  );
}