"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

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

export default function PublicBracketPage() {
  const { id } = useParams();

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedRound, setSelectedRound] = useState(1);
  const [viewMode, setViewMode] = useState("full"); // 🔥 toggle

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);

    const { data: tData } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", id)
      .single();

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

    setTournament(tData);
    setTeams(teamsData || []);
    setMatches(matchData || []);

    if (matchData && matchData.length > 0) {
      const firstRound = Math.min(...matchData.map((m) => m.round));
      setSelectedRound(firstRound);
    }

    setLoading(false);
  };

  const rounds = [...new Set(matches.map((m) => m.round))].sort(
    (a, b) => a - b
  );

  const getRoundName = (round) => {
    const totalRounds = Math.max(...rounds);

    if (round === totalRounds) return "Final";
    if (round === totalRounds - 1) return "Semifinal";
    if (round === totalRounds - 2) return "Quarter Final";
    return `Round ${round}`;
  };

  const formatBracket = () => {
    const data =
      viewMode === "round"
        ? matches.filter((m) => m.round === selectedRound)
        : matches;

    return data.map((m) => {
      const teamA = teams.find((t) => t.id === m.team_a_id);
      const teamB = teams.find((t) => t.id === m.team_b_id);

      return {
        id: m.id,
        name: `Match ${m.match_order + 1}`,
        nextMatchId: viewMode === "round" ? null : m.next_match_id,
        tournamentRoundText: getRoundName(m.round),
        startTime: "2024-01-01",
        state: "DONE",
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

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div className="home">
      {/* HEADER */}
      <div className="section">
        <h2 className="gradient-text">
          {tournament?.title || "Tournament"}
        </h2>
        <p>{tournament?.game}</p>
      </div>

      {/* 🔥 TOGGLE VIEW */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setViewMode("full")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: viewMode === "full" ? "#9929EA" : "#222",
            color: "#fff",
          }}
        >
          Full Bracket
        </button>

        <button
          onClick={() => setViewMode("round")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: viewMode === "round" ? "#9929EA" : "#222",
            color: "#fff",
          }}
        >
          Per Round
        </button>
      </div>

      {/* 🔥 ROUND SELECTOR (ONLY IF ROUND MODE) */}
      {viewMode === "round" && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {rounds.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRound(r)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: selectedRound === r ? "#FF5FCF" : "#222",
                color: "#fff",
              }}
            >
              {getRoundName(r)}
            </button>
          ))}
        </div>
      )}

      {/* BRACKET */}
      <div
        style={{
          height: "80vh",
          background: "#050505",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <TransformWrapper
          initialScale={0.8}
          minScale={0.5}
          maxScale={1.5}
          centerOnInit
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "fit-content",
                padding: "40px",
              }}
            >
              <SingleEliminationBracket
                matches={formatBracket()}
                matchComponent={Match}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}