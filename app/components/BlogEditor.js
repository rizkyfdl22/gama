"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { supabase } from "@/app/lib/supabase";
import { useEffect } from "react";

export default function BlogEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Placeholder.configure({
        placeholder: "Tulis blog kamu di sini...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);

      // 🔥 AUTO SAVE
      localStorage.setItem("blog-draft", html);
    },
  });

  // 🔥 LOAD DRAFT
  useEffect(() => {
    const saved = localStorage.getItem("blog-draft");
    if (saved && editor) {
      editor.commands.setContent(saved);
    }
  }, [editor]);

  if (!editor) return null;

  // 🔥 UPLOAD IMAGE
  const uploadImage = async (file) => {
    const fileName = `blog-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    editor.chain().focus().setImage({ src: data.publicUrl }).run();
  };

  // 🔥 FILE PICKER
  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files[0];
      if (file) uploadImage(file);
    };

    input.click();
  };

  // 🔥 DRAG & DROP
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) uploadImage(file);
  };

  return (
    <div>
      {/* 🔥 TOOLBAR */}
      <div style={{ marginBottom: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>

        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          U
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝ Quote
        </button>

        <button onClick={handleImageClick}>
          🖼️ Image
        </button>
      </div>

      {/* 🔥 EDITOR */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          padding: "15px",
          minHeight: "250px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}