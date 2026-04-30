"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import styles from "./BlogsAdmin.module.css";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    setBlogs(data || []);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Hapus blog ini?");
    if (!confirmDelete) return;

    await supabase.from("blogs").delete().eq("id", id);
    fetchBlogs();
  };

  return (
    <div className="home">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Admin Blog</h1>
          <Link href="/admin/blogs/create">+ Create</Link>
        </div>

        <div className={styles.grid}>
          {blogs.map((blog) => (
            <div key={blog.id} className={styles.card}>
              <img src={blog.thumbnail} />

              <h2>{blog.title}</h2>

              <div className={styles.actions}>
                <Link href={`/admin/blogs/edit/${blog.id}`}>
                  Edit
                </Link>

                <button onClick={() => handleDelete(blog.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}