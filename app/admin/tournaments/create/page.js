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

    if (banner) {
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

      const fileName = `public/tournament-${Date.now()}-${banner.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from("tournament-banners")
        .upload(fileName, banner);

      if (uploadError || !data) {
        alert("Upload banner gagal!");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("tournament-banners")
        .getPublicUrl(fileName);

      bannerUrl = publicUrlData?.publicUrl;

      if (!bannerUrl) {
        alert("Gagal mendapatkan URL banner");
        setLoading(false);
        return;
      }
    }

    let formattedDate;
    try {
      formattedDate = new Date(form.date).toISOString();
    } catch {
      alert("Format tanggal tidak valid!");
      setLoading(false);
      return;
    }

    const payload = {
      title: form.title,
      game: form.game,
      date: formattedDate,
      price: Number(form.price) || 0,
      max_participants: Number(form.max_participants) || 0,
    };

    if (bannerUrl) payload.banner_url = bannerUrl;

    const { error } = await supabase.from("tournaments").insert([payload]);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Tournament berhasil dibuat!");
    router.push("/admin/tournaments");
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <h1>
          Create <span className="gradient-text">Tournament</span>
        </h1>
        <p>Buat tournament baru dengan detail lengkap</p>
      </div>

      {/* FORM */}
      <div className="admin-form card">
        <form onSubmit={handleSubmit} className="form-grid">

          <input
            className="input"
            placeholder="Title"
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="input"
            placeholder="Game"
            required
            onChange={(e) => setForm({ ...form, game: e.target.value })}
          />

          <input
            className="input"
            type="date"
            required
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Max Participants"
            onChange={(e) =>
              setForm({ ...form, max_participants: e.target.value })
            }
          />

          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files[0])}
          />

          {/* PREVIEW */}
          {banner && (
            <img
              src={URL.createObjectURL(banner)}
              alt="preview"
              className="banner-preview"
            />
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Create Tournament"}
          </button>

        </form>
      </div>
    </div>
  );
}