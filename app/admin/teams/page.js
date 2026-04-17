"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: "",
    captain: "",
    phone: "",
  });

  // ambil data teams
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*");
    setTeams(data || []);
  };

  // tambah team
  const handleCreate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("teams").insert([form]);

    if (error) {
      alert(error.message);
      return;
    }

    setForm({ name: "", captain: "", phone: "" });
    fetchTeams();
  };

  // delete team
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Hapus team?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setTeams((prev) => prev.filter((team) => team.id !== id));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Teams</h1>

      {/* FORM */}
      <form onSubmit={handleCreate} style={{ marginTop: "20px" }}>
        <input
          placeholder="Team Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Captain Name"
          value={form.captain}
          onChange={(e) => setForm({ ...form, captain: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button type="submit">Tambah Team</button>
      </form>

      {/* LIST */}
      <div style={{ marginTop: "30px" }}>
        {teams.map((team) => (
          <div
            key={team.id}
            style={{
              marginBottom: "15px",
              padding: "15px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
            }}
          >
            <h3>{team.name}</h3>
            <p>Captain: {team.captain}</p>
            <p>Phone: {team.phone}</p>

            <button onClick={() => handleDelete(team.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}