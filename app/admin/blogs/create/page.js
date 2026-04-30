"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import styles from "./CreateBlog.module.css";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

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
    if (!thumbnail) {
      alert("Pilih gambar dulu!");
      return null;
    }

    try {
      // 🔥 COMPRESS IMAGE
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(thumbnail, options);

      console.log("Before:", thumbnail.size / 1024, "KB");
      console.log("After:", compressedFile.size / 1024, "KB");

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
      alert("Gagal compress / upload gambar");
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
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setThumbnail(file);

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {/* 🔥 PREVIEW IMAGE */}
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

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}