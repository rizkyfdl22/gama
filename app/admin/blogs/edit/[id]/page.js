"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import BlogEditor from "@/app/components/BlogEditor";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        content,
      })
      .eq("id", id);

    if (!error) {
      router.push("/admin/blogs");
    } else {
      alert("Gagal update");
    }
  };

  return (
    <div className="home" style={{ padding: "100px 20px" }}>
      <h1>Edit Blog</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
        }}
      />

      <BlogEditor content={content} setContent={setContent} />

      <button
        onClick={handleUpdate}
        style={{
          marginTop: "20px",
          padding: "10px",
          background: "purple",
          color: "white",
        }}
      >
        Update
      </button>
    </div>
  );
}