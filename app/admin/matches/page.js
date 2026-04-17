"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminMatches() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const [form, setForm] = useState({
    team_a: "",
    team_b: "",
    round: 1,
    match_order: 1,
  });

  // ambil teams
  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*");
    setTeams(data || []);
  };

  const fetchMatches = async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("round", { ascending: true });

    setMatches(data || []);
  };

  // CREATE MATCH
  const handleCreate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("matches").insert([
      {
        team_a: form.team_a,
        team_b: form.team_b,
        round: Number(form.round),
        match_order: Number(form.match_order),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchMatches();
  };

  // UPDATE SCORE
  const handleScore = async (id, score_a, score_b) => {
    const { error } = await supabase
      .from("matches")
      .update({
        score_a: Number(score_a),
        score_b: Number(score_b),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchMatches();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Match / Bracket Management</h1>

      {/* CREATE MATCH */}
      <form onSubmit={handleCreate} style={{ marginTop: "20px" }}>
        <select
          onChange={(e) => setForm({ ...form, team_a: e.target.value })}
        >
          <option>Pilih Team A</option>
          {teams.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setForm({ ...form, team_b: e.target.value })}
        >
          <option>Pilih Team B</option>
          {teams.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Round (1,2,3...)"
          onChange={(e) => setForm({ ...form, round: e.target.value })}
        />

        <input
          type="number"
          placeholder="Match Order"
          onChange={(e) =>
            setForm({ ...form, match_order: e.target.value })
          }
        />

        <button type="submit">Buat Match</button>
      </form>

      {/* LIST MATCH */}
      <div style={{ marginTop: "40px" }}>
        {matches.map((m) => (
          <div
            key={m.id}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
            }}
          >
            <h3>
              {m.team_a} vs {m.team_b}
            </h3>
            <p>Round: {m.round}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                placeholder="Score A"
                defaultValue={m.score_a}
                onBlur={(e) =>
                  handleScore(m.id, e.target.value, m.score_b)
                }
              />

              <input
                type="number"
                placeholder="Score B"
                defaultValue={m.score_b}
                onBlur={(e) =>
                  handleScore(m.id, m.score_a, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}