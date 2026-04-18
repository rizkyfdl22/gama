"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams } from "next/navigation";

export default function AdminTeamsPage() {
  const { id } = useParams();

  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) fetchTeams();
  }, [id]);

  // =========================
  // FETCH TEAMS
  // =========================
  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("tournament_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setTeams(data || []);
  };

  // =========================
  // ADD TEAM
  // =========================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Nama team wajib diisi");
      return;
    }

    const { error } = await supabase.from("teams").insert([
      {
        name,
        tournament_id: id, // 🔥 PENTING
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    fetchTeams();
  };

  // =========================
  // DELETE TEAM
  // =========================
  const handleDelete = async (teamId) => {
    if (!confirm("Yakin hapus team ini?")) return;

    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", teamId);

    if (error) {
      alert(error.message);
      return;
    }

    fetchTeams();
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>
      <h1>Manage Teams</h1>

      {/* =========================
          ADD TEAM
      ========================= */}
      <form onSubmit={handleAdd} style={{ marginTop: "20px" }}>
        <input
          placeholder="Nama Team"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            marginRight: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#9929EA",
            borderRadius: "8px",
          }}
        >
          Tambah
        </button>
      </form>

      {/* =========================
          LIST TEAM
      ========================= */}
      <div style={{ marginTop: "30px" }}>
        {teams.length > 0 ? (
          teams.map((team) => (
            <div
              key={team.id}
              style={{
                padding: "12px",
                marginBottom: "10px",
                border: "1px solid #333",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{team.name}</span>

              <button
                onClick={() => handleDelete(team.id)}
                style={{
                  background: "red",
                  padding: "5px 10px",
                  borderRadius: "6px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>Belum ada team</p>
        )}
      </div>
    </div>
  );
}