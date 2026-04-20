"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminGenerateBracket() {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [bracketSize, setBracketSize] = useState(8);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH TOURNAMENT
  // =========================
  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data } = await supabase.from("tournaments").select("*");
    setTournaments(data || []);
  };

  // =========================
  // GENERATE BRACKET 🔥
  // =========================
  const generateBracket = async () => {
    if (!tournamentId) {
      alert("Pilih tournament dulu");
      return;
    }

    setLoading(true);

    // 1. hapus bracket lama
    await supabase.from("matches").delete().eq("tournament_id", tournamentId);

    let allMatches = [];
    let rounds = Math.log2(bracketSize);

    // 2. buat semua match
    for (let round = 1; round <= rounds; round++) {
      const matchCount = bracketSize / Math.pow(2, round);

      for (let i = 0; i < matchCount; i++) {
        allMatches.push({
          tournament_id: tournamentId,
          round,
          match_order: i,
          next_match_id: null,
        });
      }
    }

    // 3. insert + ambil ID
    const { data, error } = await supabase
      .from("matches")
      .insert(allMatches)
      .select();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // 4. connect bracket tree 🔥
    for (let i = 0; i < data.length; i++) {
      const current = data[i];

      const next = data.find(
        (m) =>
          m.round === current.round + 1 &&
          Math.floor(current.match_order / 2) === m.match_order
      );

      if (next) {
        await supabase
          .from("matches")
          .update({ next_match_id: next.id })
          .eq("id", current.id);
      }
    }

    setLoading(false);
    alert("Bracket berhasil dibuat!");
  };

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h1>
          Generate <span className="gradient-text">Bracket</span>
        </h1>
        <p>Hanya membuat struktur bracket ke database</p>
      </div>

      <div className="admin-controls card">

        <select
          className="input"
          onChange={(e) => setTournamentId(e.target.value)}
        >
          <option value="">Pilih Tournament</option>
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        <select
          className="input"
          onChange={(e) => setBracketSize(Number(e.target.value))}
        >
          <option value={8}>8 Slot</option>
          <option value={16}>16 Slot</option>
          <option value={32}>32 Slot</option>
          <option value={64}>64 Slot</option>
          <option value={64}>128 Slot</option>
          <option value={64}>256 Slot</option>
          <option value={64}>512 Slot</option>
        </select>

        <button
          className="btn-primary"
          onClick={generateBracket}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>

    </div>
  );
}