"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import styles from "./CreateBlog.module.css";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleUpload = async () => {
    if (!thumbnail) return null;

    const fileName = `${Date.now()}-${thumbnail.name}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, thumbnail);

    if (error) {
      console.log(error);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const slug = generateSlug(title);
    const imageUrl = await handleUpload();

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        content,
        thumbnail: imageUrl,
      },
    ]);

    setLoading(false);

    if (!error) {
      router.push("/blogs");
    } else {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className={styles.container}>
        <h1 className={styles.title}>Create Blog</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Judul blog..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Isi blog (boleh HTML)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />

          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}