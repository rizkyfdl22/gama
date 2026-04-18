"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import dynamic from "next/dynamic";

// ✅ WAJIB (biar ga error di Vercel)
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
      .order("id", { ascending: true });

    setMatches(data || []);
    setLoading(false);
  };

  // =========================
  // AUTO GENERATE BRACKET
  // =========================
  const generateBracket = async () => {
    if (teams.length < 2) {
      alert("Minimal 2 tim");
      return;
    }

    let currentRoundTeams = [...teams];
    let round = 1;
    let allMatches = [];

    while (currentRoundTeams.length > 1) {
      let nextRound = [];

      for (let i = 0; i < currentRoundTeams.length; i += 2) {
        const teamA = currentRoundTeams[i];
        const teamB = currentRoundTeams[i + 1];

        const match = {
          team_a: teamA?.name || "TBD",
          team_b: teamB?.name || "TBD",
          round,
          match_order: i / 2,
        };

        allMatches.push(match);

        nextRound.push({
          name: "TBD",
        });
      }

      currentRoundTeams = nextRound;
      round++;
    }

    const { error } = await supabase.from("matches").insert(allMatches);

    if (error) {
      alert(error.message);
      return;
    }

    fetchMatches();
  };

  // =========================
  // FORMAT BRACKET (IMPORTANT)
  // =========================
  const formatBracket = (matches = []) => {
    return matches.map((m, i) => ({
      id: m.id,
      name: `Match ${i + 1}`,
      nextMatchId: matches[i + Math.floor(matches.length / 2)]?.id || null,
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

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Match / Bracket Management</h1>

      {/* =========================
          AUTO GENERATE BUTTON
      ========================= */}
      <button
        onClick={generateBracket}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#9929EA",
          borderRadius: "10px",
        }}
      >
        Generate Bracket Otomatis
      </button>

      {/* =========================
          BRACKET VIEW
      ========================= */}
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

      {/* =========================
          MODAL EDIT SCORE
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