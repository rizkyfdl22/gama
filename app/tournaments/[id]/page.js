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

export default function TournamentDetailPage() {
  const { id } = useParams();

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBracket, setShowBracket] = useState(false);

  // TOGGLE STATE
  const [showDescription, setShowDescription] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);

    const { data: tData, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !tData) {
      setTournament(null);
      setLoading(false);
      return;
    }

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

  const formatTime = (time) => {
    if (!time) return "TBD";

    return new Date(time).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatBracket = () => {
    return matches.map((m) => {
      const teamA = teams.find((t) => t.id === m.team_a_id);
      const teamB = teams.find((t) => t.id === m.team_b_id);

      return {
        id: m.id,
        name: `Match ${m.match_order + 1}`,
        nextMatchId: m.next_match_id,
        tournamentRoundText: `Round ${m.round}`,
        startTime: formatTime(m.start_time),
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
    return (
      <div className="home">
        <div style={{ padding: "40px" }}>Loading...</div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="home">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Tournament tidak ditemukan</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* HEADER */}
      <div style={{ padding: "20px" }}>
        <h2 className="gradient-text">{tournament.title}</h2>
        <p>{tournament.game}</p>

        <div style={{ marginTop: "10px", color: "#aaa" }}>
          👥 {teams.length} Teams • 📅{" "}
          {tournament.start_date
            ? new Date(tournament.start_date).toLocaleString("id-ID")
            : "TBD"}{" "}
          • 🏆 {tournament.prize || "No Prize"}
        </div>
      </div>

      {!showBracket && (
        <div style={{ padding: "20px" }}>
          {/* DESKRIPSI */}
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => setShowDescription(!showDescription)}
          >
            Deskripsi {showDescription ? "▲" : "▼"}
          </h3>

          {showDescription && (
            <p style={{ marginBottom: "20px" }}>
              {tournament.description || "Belum ada deskripsi"}
            </p>
          )}

          {/* RULES */}
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => setShowRules(!showRules)}
          >
            Rules {showRules ? "▲" : "▼"}
          </h3>

          {showRules && (
            <p style={{ marginBottom: "20px" }}>
              {tournament.rules || "Belum ada rules"}
            </p>
          )}

          {/* PESERTA */}
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => setShowTeams(!showTeams)}
          >
            Peserta Tournament {showTeams ? "▲" : "▼"}
          </h3>

          {showTeams && (
            <div style={{ marginBottom: "20px" }}>
              {teams.length > 0 ? (
                teams.map((team) => (
                  <div key={team.id} style={{ padding: "6px 0" }}>
                    • {team.name}
                  </div>
                ))
              ) : (
                <p style={{ color: "#aaa" }}>
                  Belum ada tim yang mendaftar
                </p>
              )}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={() => setShowBracket(true)}
            style={{
              marginTop: "20px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#2d3436",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Lihat Bracket
          </button>
        </div>
      )}

      {/* BRACKET */}
      {showBracket && (
        <div style={{ height: "80vh" }}>
          <button
            onClick={() => setShowBracket(false)}
            style={{
              margin: "20px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#2d3436",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ← Kembali
          </button>

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
                <div style={{ minWidth: "1400px", padding: "40px" }}>
                  <SingleEliminationBracket
                    matches={formatBracket()}
                    matchComponent={(props) => {
                      const match = props.match;

                      return (
                        <div style={{ padding: "8px" }}>
                          <div
                            style={{
                              fontSize: "11px",
                              textAlign: "center",
                              marginBottom: "6px",
                              color: "#aaa",
                            }}
                          >
                            🕒 {match.startTime}
                          </div>

                          <Match {...props} />
                        </div>
                      );
                    }}
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>
          ) : (
            <p style={{ textAlign: "center", color: "#aaa" }}>
              Belum ada bracket
            </p>
          )}
        </div>
      )}
    </div>
  );
}