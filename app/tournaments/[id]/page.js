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

        // ✅ start time dari database
        startTime: m.start_time,

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

  // =========================
  // FORMAT TIME DISPLAY
  // =========================
  const formatTime = (time) => {
    if (!time) return "TBD";
    return new Date(time).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="home">
        <div style={{ padding: "40px" }}>Loading bracket...</div>
      </div>
    );
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

      {/* BRACKET */}
      <div style={{ height: "80vh" }}>
        {matches.length > 0 ? (
          <TransformWrapper
            initialScale={0.8}
            minScale={0.5}
            maxScale={2}
            wheel={{ step: 0.1 }}
            pinch={{ disabled: true }}
            doubleClick={{ disabled: true }}
            panning={{ velocityDisabled: true }}
            limitToBounds={false}
          >
            <TransformComponent>
              <div
                className="bracket-wrapper"
                style={{
                  minWidth: "1400px",
                  width: "max-content",
                  padding: "40px",
                }}
              >
                <SingleEliminationBracket
                  matches={formatBracket()}
                  matchComponent={(props) => {
                    const match = props.match;

                    return (
                      <div
                        style={{
                          cursor: "pointer",
                          padding: "8px",
                        }}
                      >
                      matchComponent={(props) => {
  const match = props.match;

  return (
    <div style={{ padding: "6px" }}>
      
      {/* TIME DI ATAS (FIX FINAL) */}
      <div
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginBottom: "6px",
          color: "#aaa",
          fontWeight: "500",
        }}
      >
        🕒 {formatTime(match.startTime)}
      </div>

      {/* WRAP MATCH BIAR RAPI */}
      <div
        style={{
          background: "transparent",
        }}
      >
        <Match {...props} />
      </div>

    </div>
  );
}}

                        {/* =========================
                            START TIME DISPLAY
                        ========================= */}
                        <div
                          style={{
                            fontSize: "11px",
                            textAlign: "center",
                            marginTop: "6px",
                            color: "var(--gray, #aaa)",
                          }}
                        >
                          🕒 {formatTime(match.startTime)}
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <p style={{ textAlign: "center", color: "var(--gray)" }}>
            Belum ada bracket
          </p>
        )}
      </div>
    </div>
  );
}