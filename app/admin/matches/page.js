"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import dynamic from "next/dynamic";

const SingleEliminationBracket = dynamic(
  () =>
    import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.SingleEliminationBracket
    ),
  { ssr: false }
);

const Match = dynamic(
  () =>
    import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.Match
    ),
  { ssr: false }
);

export default function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [bracketSize, setBracketSize] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    if (tournamentId) fetchMatches();
  }, [tournamentId]);

  // =========================
  // FETCH
  // =========================
  const fetchTournaments = async () => {
    const { data } = await supabase.from("tournaments").select("*");
    setTournaments(data || []);
  };

  const fetchMatches = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("matches")
      .select("*")
      .eq("tournament_id", tournamentId);

    setMatches(data || []);
    setLoading(false);
  };

  // =========================
  // GENERATE
  // =========================
  const generateBracket = async () => {
    if (!tournamentId) return alert("Pilih tournament dulu");

    // hapus lama
    await supabase.from("matches").delete().eq("tournament_id", tournamentId);

    let allMatches = [];
    let rounds = Math.log2(bracketSize);

    for (let round = 1; round <= rounds; round++) {
      const matchCount = bracketSize / Math.pow(2, round);

      for (let i = 0; i < matchCount; i++) {
        allMatches.push({
          tournament_id: tournamentId,
          round,
          match_order: i,
          team_a_id: null,
          team_b_id: null,
          score_a: 0,
          score_b: 0,
        });
      }
    }

    await supabase.from("matches").insert(allMatches);

    fetchMatches();
  };

  // =========================
  // FORMAT
  // =========================
  const formatted = matches.map((m) => ({
    id: m.id,
    name: `Match ${m.match_order + 1}`,
    nextMatchId: m.next_match_id,
    tournamentRoundText: `Round ${m.round}`,
    startTime: "2024-01-01",
    state: "SCHEDULED",
    participants: [
      {
        id: `${m.id}-a`,
        name: "TBD",
      },
      {
        id: `${m.id}-b`,
        name: "TBD",
      },
    ],
  }));

  if (loading) return <p className="admin-loading">Loading...</p>;

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <h1>
          Generate <span className="gradient-text">Bracket</span>
        </h1>
        <p>Buat struktur bracket tournament</p>
      </div>

      {/* CONTROL */}
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
        </select>

        <button className="btn-primary" onClick={generateBracket}>
          Generate
        </button>
      </div>

      {/* BRACKET */}
      <div className="admin-bracket card">
        {formatted.length > 0 ? (
          <SingleEliminationBracket
            matches={formatted}
            matchComponent={Match}
          />
        ) : (
          <p className="empty-text">Belum ada bracket</p>
        )}
      </div>
    </div>
  );
}