"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import dynamic from "next/dynamic";

// ✅ FIX SSR (WAJIB)
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
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [form, setForm] = useState({
    team_a: "",
    team_b: "",
    round: 1,
    match_order: 1,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  // =========================
  // FETCH DATA
  // =========================
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
    setLoading(false);
  };

  // =========================
  // FORMAT BRACKET (SAFE)
  // =========================
  const formatBracket = (matches = []) => {
    return matches.map((m) => ({
      id: m.id,
      name: `Round ${m.round}`,
      nextMatchId: null,
      tournamentRoundText: `Round ${m.round}`,
      startTime: "2024-01-01",
      state: "SCHEDULED",

      participants: [
        {
          id: `${m.id}-a`,
          name: m.team_a || "TBD",
          resultText: m.score_a?.toString() || "",
          isWinner: (m.score_a || 0) > (m.score_b || 0),
        },
        {
          id: `${m.id}-b`,
          name: m.team_b || "TBD",
          resultText: m.score_b?.toString() || "",
          isWinner: (m.score_b || 0) > (m.score_a || 0),
        },
      ],
    }));
  };

  // =========================
  // CREATE MATCH
  // =========================
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.team_a || !form.team_b) {
      alert("Pilih team dulu");
      return;
    }

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

  // =========================
  // CLICK MATCH
  // =========================
  const handleMatchClick = (match) => {
    const m = matches.find((x) => x.id === match.id);
    if (!m) return;

    setSelectedMatch(m);
    setScoreA(m.score_a || 0);
    setScoreB(m.score_b || 0);
  };

  // =========================
  // SAVE SCORE
  // =========================
  const handleSaveScore = async () => {
    const { error } = await supabase
      .from("matches")
      .update({
        score_a: Number(scoreA),
        score_b: Number(scoreB),
      })
      .eq("id", selectedMatch.id);

    if (error) {
      alert(error.message);
      return;
    }

    setSelectedMatch(null);
    fetchMatches();
  };

  const formatted = formatBracket(matches);

  // =========================
  // LOADING GUARD (FIX ERROR)
  // =========================
  if (loading) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Match / Bracket Management</h1>

      {/* =========================
          CREATE MATCH
      ========================= */}
      <form onSubmit={handleCreate} style={{ marginTop: "20px" }}>
        <select
          onChange={(e) => setForm({ ...form, team_a: e.target.value })}
        >
          <option value="">Pilih Team A</option>
          {teams.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setForm({ ...form, team_b: e.target.value })}
        >
          <option value="">Pilih Team B</option>
          {teams.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Round"
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

      {/* =========================
          BRACKET (SAFE RENDER)
      ========================= */}
      <div style={{ marginTop: "50px", overflowX: "auto" }}>
        {formatted.length > 0 ? (
          <SingleEliminationBracket
            matches={formatted}
            matchComponent={Match}
            onMatchClick={handleMatchClick}
          />
        ) : (
          <p>Belum ada match</p>
        )}
      </div>

      {/* =========================
          MODAL
      ========================= */}
      {selectedMatch && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Score</h3>

            <p>{selectedMatch.team_a}</p>
            <input
              type="number"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
            />

            <p>{selectedMatch.team_b}</p>
            <input
              type="number"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
            />

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button onClick={handleSaveScore}>Save</button>
              <button onClick={() => setSelectedMatch(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}