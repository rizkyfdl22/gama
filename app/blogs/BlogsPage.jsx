"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import styles from "./Blogs.module.css";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    setBlogs(data || []);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const latest = blogs[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Semesta Esports Blogs",
    description:
      "Artikel terbaru seputar esports dan tournament.",
    url: "https://semestaesports.id/blogs",
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
      {latest && (
        <div
          className={styles.hero}
          style={{
            backgroundImage: `url(${latest.thumbnail})`,
          }}
        >
          <div className={styles.overlay}>
            <span className={styles.badge}>Latest</span>

            <h1>{latest.title}</h1>

            <p>
              {new Date(
                latest.created_at
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className={styles.container}>

        {/* SEARCH */}
        <div className={styles.topBar}>
          <h2>Blogs</h2>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {filteredBlogs.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog.id}
            >
              <div className={styles.card}>
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                />

                <div className={styles.cardContent}>
                  <h3>{blog.title}</h3>

                  <p>
                    {new Date(
                      blog.created_at
                    ).toLocaleDateString()}
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