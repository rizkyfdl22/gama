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
    if (id) fetchData();
  }, [id]);

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
      .order("round", { ascending: true })
      .order("match_order", { ascending: true });

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
  // CLICK MATCH → OPEN MODAL
  // =========================
  const handleMatchClick = (match) => {
    const m = matches.find((x) => x.id === match.id);
    if (!m) return;

    setSelectedMatch({ ...m });
    setScoreA(m.score_a || 0);
    setScoreB(m.score_b || 0);
  };

  // =========================
  // ASSIGN TEAM
  // =========================
  const assignTeam = async (position, teamId) => {
    const field = position === "A" ? "team_a_id" : "team_b_id";

    const { error } = await supabase
      .from("matches")
      .update({ [field]: teamId })
      .eq("id", selectedMatch.id);

    if (error) {
      alert(error.message);
      return;
    }

    // update local state
    setSelectedMatch((prev) => ({
      ...prev,
      [field]: teamId,
    }));

    setMatches((prev) =>
      prev.map((m) =>
        m.id === selectedMatch.id ? { ...m, [field]: teamId } : m
      )
    );
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

      {/* =========================
          BRACKET VIEW
      ========================= */}
      <div style={{ marginTop: "40px", overflowX: "auto" }}>
        {matches.length > 0 ? (
          <SingleEliminationBracket
  matches={formatBracket()}
  matchComponent={(props) => (
    <div onClick={() => handleMatchClick(props.match)}>
      <Match {...props} />
    </div>
  )}
/>
        ) : (
          <p>Belum ada bracket</p>
        )}
      </div>

      {/* =========================
          MODAL POPUP
      ========================= */}
      {selectedMatch && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "25px",
              borderRadius: "12px",
              width: "350px",
            }}
          >
            <h3>Edit Match</h3>

            {/* TEAM A */}
            <p>Team A</p>
            <select
              value={selectedMatch.team_a_id || ""}
              onChange={(e) => assignTeam("A", e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
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
              style={{ width: "100%", marginBottom: "15px" }}
            />

            {/* TEAM B */}
            <p>Team B</p>
            <select
              value={selectedMatch.team_b_id || ""}
              onChange={(e) => assignTeam("B", e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
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
              style={{ width: "100%", marginBottom: "15px" }}
            />

            {/* ACTION */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  background: "#9929EA",
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Save
              </button>

              <button
                onClick={() => setSelectedMatch(null)}
                style={{
                  flex: 1,
                  background: "#333",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}