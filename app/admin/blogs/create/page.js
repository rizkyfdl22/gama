"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import styles from "./CreateBlog.module.css";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import BlogEditor from "@/app/components/BlogEditor";

export default function CreateBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleUpload = async () => {
    if (!thumbnail) return null;

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(thumbnail, options);

      const fileExt = compressedFile.name.split(".").pop();
      const fileName = `blog-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, compressedFile);

      if (error) {
        console.log("UPLOAD ERROR:", error.message);
        alert(error.message);
        return null;
      }

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      console.log(err);
      alert("Gagal upload thumbnail");
      return null;
    }
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
      localStorage.removeItem("blog-draft"); // 🔥 clear draft
      router.push("/blogs");
    } else {
      console.log(error);
      alert("Gagal membuat blog");
    }
  };

  return (
    <div className="home">
      <div className={styles.container}>
        <h1 className={styles.title}>Create Blog</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* TITLE */}
          <input
            type="text"
            placeholder="Judul blog..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* 🔥 EDITOR PRO */}
          <BlogEditor content={content} setContent={setContent} />

          {/* THUMBNAIL */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setThumbnail(file);

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          )}

          {/* BUTTON */}
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}