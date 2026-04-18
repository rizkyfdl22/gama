"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import dynamic from "next/dynamic";

// ✅ FIX SSR
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
  const [tournaments, setTournaments] = useState([]);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [bracketSize, setBracketSize] = useState(8);
  const [tournamentId, setTournamentId] = useState("");

  const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchTournaments();
  setLoading(false); // ✅ penting
}, []);

  // =========================
  // FETCH DATA
  // =========================
  const fetchTeams = async () => {
    const { data } = await supabase
      .from("teams")
      .select("*")
      .eq("tournament_id", tournamentId);

    setTeams(data || []);
  };

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
  // GENERATE BRACKET
  // =========================
  const generateBracket = async () => {
    if (!tournamentId) {
      alert("Pilih tournament dulu");
      return;
    }

    // ❗ hapus bracket lama
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
          next_match_id: null,
        });
      }
    }

    const { data, error } = await supabase
      .from("matches")
      .insert(allMatches)
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    // 🔥 CONNECT NEXT MATCH (pakai UUID hasil insert)
    let updatedMatches = [...data];

    for (let i = 0; i < updatedMatches.length; i++) {
      const current = updatedMatches[i];

      const next = updatedMatches.find(
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

    fetchMatches();
  };

  // =========================
  // FORMAT BRACKET
  // =========================
  const formatBracket = (matches = []) => {
    return matches.map((m) => {
      const teamA = teams.find((t) => t.id === m.team_a_id);
      const teamB = teams.find((t) => t.id === m.team_b_id);

      return {
        id: m.id,
        name: `Match ${m.match_order + 1}`,
        nextMatchId: m.next_match_id,
        tournamentRoundText: `Round ${m.round}`,
        startTime: "2024-01-01",
        state: "SCHEDULED",

        participants: [
          {
            id: `${m.id}-a`,
            name: teamA?.name || "TBD",
            resultText: m.score_a?.toString() || "",
            isWinner: (m.score_a || 0) > (m.score_b || 0),
          },
          {
            id: `${m.id}-b`,
            name: teamB?.name || "TBD",
            resultText: m.score_b?.toString() || "",
            isWinner: (m.score_b || 0) > (m.score_a || 0),
          },
        ],
      };
    });
  };

  // =========================
  // ASSIGN TEAM
  // =========================
  const assignTeam = async (matchId, position, teamId) => {
    if (!teamId) return;

    const field = position === "A" ? "team_a_id" : "team_b_id";

    await supabase
      .from("matches")
      .update({ [field]: teamId })
      .eq("id", matchId);

    fetchMatches();
  };

  // =========================
  // SCORE
  // =========================
  const handleMatchClick = (match) => {
    const m = matches.find((x) => x.id === match.id);
    if (!m) return;

    setSelectedMatch(m);
    setScoreA(m.score_a || 0);
    setScoreB(m.score_b || 0);
  };

  const handleSaveScore = async () => {
    await supabase
      .from("matches")
      .update({
        score_a: Number(scoreA),
        score_b: Number(scoreB),
      })
      .eq("id", selectedMatch.id);

    setSelectedMatch(null);
    fetchMatches();
  };

  const formatted = formatBracket(matches);

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Match / Bracket Management</h1>

      {/* CONTROL */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <select onChange={(e) => setTournamentId(e.target.value)}>
          <option value="">Pilih Tournament</option>
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        <select onChange={(e) => setBracketSize(Number(e.target.value))}>
          <option value={8}>8 Slot</option>
          <option value={16}>16 Slot</option>
          <option value={32}>32 Slot</option>
          <option value={64}>64 Slot</option>
        </select>

        <button onClick={generateBracket}>
          Generate Bracket
        </button>
      </div>

      {/* BRACKET */}
      <div style={{ marginTop: "50px", overflowX: "auto" }}>
        {formatted.length > 0 ? (
          <SingleEliminationBracket
            matches={formatted}
            matchComponent={Match}
            onMatchClick={handleMatchClick}
          />
        ) : (
          <p>Belum ada bracket</p>
        )}
      </div>

      {/* MODAL */}
      {selectedMatch && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Match</h3>

            <p>Team A</p>
            <select
              onChange={(e) =>
                assignTeam(selectedMatch.id, "A", e.target.value)
              }
            >
              <option value="">Pilih Team</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
            />

            <p>Team B</p>
            <select
              onChange={(e) =>
                assignTeam(selectedMatch.id, "B", e.target.value)
              }
            >
              <option value="">Pilih Team</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
            />

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button onClick={handleSaveScore}>Save</button>
              <button onClick={() => setSelectedMatch(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}