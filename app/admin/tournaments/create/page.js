"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreateTournament() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    game: "",
    date: "",
    price: "",
    max_participants: "",
  });

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let bannerUrl = null;

    // ✅ 1. Upload banner ke Supabase Storage
    if (banner) {
      const fileName = `${Date.now()}-${banner.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from("tournament-banners")
        .upload(fileName, banner);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      // ✅ 2. Ambil public URL
      const { data: publicUrlData } = supabase.storage
        .from("tournament-banners")
        .getPublicUrl(fileName);

      bannerUrl = publicUrlData.publicUrl;
    }

    // ✅ 3. Insert ke database
    const { error } = await supabase.from("tournaments").insert([
      {
        title: form.title,
        game: form.game,
        date: form.date,
        price: Number(form.price),
        max_participants: Number(form.max_participants),
        banner_url: bannerUrl, // 🔥 masuk sini
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Tournament berhasil dibuat!");
    router.push("/admin/tournaments");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h1>Create Tournament</h1>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Game"
          required
          onChange={(e) => setForm({ ...form, game: e.target.value })}
        />

        <input
          type="date"
          required
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Max Participants"
          type="number"
          required
          onChange={(e) =>
            setForm({ ...form, max_participants: e.target.value })
          }
        />

        {/* 🔥 UPLOAD BANNER */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBanner(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create"}
        </button>
      </form>
    </div>
  );
}