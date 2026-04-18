"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// FIX SSR
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

export default function AdminBracketPage() {
  const { id } = useParams();

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    const { data: teamsData } = await supabase
      .from("teams")
      .select("*")
      .eq("tournament_id", id);

    const { data: matchData } = await supabase
      .from("matches")
      .select("*")
      .eq("tournament_id", id)
      .order("round", { ascending: true });

    setTeams(teamsData || []);
    setMatches(matchData || []);
  };

  // =========================
  // FORMAT BRACKET
  // =========================
  const formatBracket = () => {
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
  const handleSave = async () => {
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
    fetchData();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Bracket</h1>

      {/* BRACKET */}
      <div style={{ marginTop: "40px", overflowX: "auto" }}>
        {matches.length > 0 ? (
          <SingleEliminationBracket
            matches={formatBracket()}
            matchComponent={Match}
            onMatchClick={handleMatchClick}
          />
        ) : (
          <p>Belum ada bracket</p>
        )}
      </div>

      {/* MODAL EDIT */}
      {selectedMatch && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Score</h3>

            <p>Team A</p>
            <input
              type="number"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
            />

            <p>Team B</p>
            <input
              type="number"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
            />

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setSelectedMatch(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}