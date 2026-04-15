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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("tournaments").insert([
      {
        title: form.title,
        game: form.game,
        date: form.date,
        price: Number(form.price),
        max_participants: Number(form.max_participants),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Tournament berhasil dibuat!");
    router.push("/admin/tournaments");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create Tournament</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Game"
          onChange={(e) => setForm({ ...form, game: e.target.value })}
        />

        <input
          type="date"
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

        <button type="submit">Create</button>
      </form>
    </div>
  );
}