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

  // 🔥 NEW STATE
  const [viewMode, setViewMode] = useState("full"); // full | round
  const [selectedRound, setSelectedRound] = useState(1);

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
    setLoading(false);
  };

  // 🔥 GET UNIQUE ROUNDS
  const rounds = [...new Set(matches.map((m) => m.round))];

  // 🔥 FILTER MATCHES
  const getFilteredMatches = () => {
    if (viewMode === "full") return matches;
    return matches.filter((m) => m.round === selectedRound);
  };

  const formatBracket = () => {
    return getFilteredMatches().map((m) => {
      const teamA = teams.find((t) => t.id === m.team_a_id);
      const teamB = teams.find((t) => t.id === m.team_b_id);

      return {
        id: m.id,
        name: `Match ${m.match_order + 1}`,
        nextMatchId: viewMode === "full" ? m.next_match_id : null, // 🔥 penting!
        tournamentRoundText: `Round ${m.round}`,
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

      {/* 🔥 FILTER CONTROL */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setViewMode("full")}>
          Full Bracket
        </button>

        <button onClick={() => setViewMode("round")}>
          Per Round
        </button>

        {viewMode === "round" && (
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
          >
            {rounds.map((r) => (
              <option key={r} value={r}>
                Round {r}
              </option>
            ))}
          </select>
        )}
      </div>

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
          initialScale={0.7}
          minScale={0.4}
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