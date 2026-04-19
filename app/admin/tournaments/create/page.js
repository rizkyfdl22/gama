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

    if (!form.title || !form.game || !form.date) {
      alert("Lengkapi semua field!");
      return;
    }

    setLoading(true);

    let bannerUrl = null;

    // 🔥 UPLOAD BANNER (FIX TOTAL)
    if (banner) {
      // validasi file
      if (!banner.type.startsWith("image/")) {
        alert("File harus berupa gambar!");
        setLoading(false);
        return;
      }

      if (banner.size > 2 * 1024 * 1024) {
        alert("Ukuran maksimal 2MB!");
        setLoading(false);
        return;
      }

      const fileName = `tournament-${Date.now()}-${banner.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from("tournament-banners")
        .upload(fileName, banner);

      console.log("UPLOAD RESULT:", data);
      console.log("UPLOAD ERROR:", uploadError);

      // 🚨 STOP kalau upload gagal
      if (uploadError || !data) {
        alert("Upload banner gagal! Cek console.");
        setLoading(false);
        return;
      }

      // ambil URL
      const { data: publicUrlData } = supabase.storage
        .from("tournament-banners")
        .getPublicUrl(fileName);

      bannerUrl = publicUrlData?.publicUrl;

      // 🚨 pastikan URL valid
      if (!bannerUrl) {
        alert("Gagal mendapatkan URL banner");
        setLoading(false);
        return;
      }
    }

    // 🔥 FORMAT DATE
    let formattedDate;
    try {
      formattedDate = new Date(form.date).toISOString();
    } catch {
      alert("Format tanggal tidak valid!");
      setLoading(false);
      return;
    }

    // 🔥 PAYLOAD CLEAN (ANTI ERROR)
    const payload = {
      title: form.title,
      game: form.game,
      date: formattedDate,
      price: Number(form.price) || 0,
      max_participants: Number(form.max_participants) || 0,
    };

    // hanya kirim banner kalau ada
    if (bannerUrl) {
      payload.banner_url = bannerUrl;
    }

    console.log("DATA KIRIM:", payload);

    // 🔥 INSERT
    const { error } = await supabase.from("tournaments").insert([payload]);

    if (error) {
      console.error("DB ERROR:", error);
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
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
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
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Max Participants"
          type="number"
          onChange={(e) =>
            setForm({ ...form, max_participants: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBanner(e.target.files[0])}
        />

        {banner && (
          <img
            src={URL.createObjectURL(banner)}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create"}
        </button>
      </form>
    </div>
  );
}