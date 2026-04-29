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

  // TOGGLE
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
      <div className="tournament-detail">
        {/* HEADER */}
        <h2 className="gradient-text">{tournament.title}</h2>
        <p>{tournament.game}</p>

        <div className="tournament-meta">
          👥 {teams.length} Teams • 📅{" "}
          {tournament.start_date
            ? new Date(tournament.start_date).toLocaleString("id-ID")
            : "TBD"}{" "}
          • 🏆 {tournament.prize || "No Prize"}
        </div>

        {!showBracket && (
          <>
            {/* DESKRIPSI */}
            <h3
              className="toggle-title"
              onClick={() => setShowDescription(!showDescription)}
            >
              Deskripsi {showDescription ? "▲" : "▼"}
            </h3>

            {showDescription && (
              <div className="toggle-content">
                {tournament.description || "Belum ada deskripsi"}
              </div>
            )}

            {/* RULES */}
            <h3
              className="toggle-title"
              onClick={() => setShowRules(!showRules)}
            >
              Rules {showRules ? "▲" : "▼"}
            </h3>

            {showRules && (
              <div className="toggle-content rules-text">
                {tournament.rules || "Belum ada rules"}
              </div>
            )}

            {/* PESERTA */}
            <h3
              className="toggle-title"
              onClick={() => setShowTeams(!showTeams)}
            >
              Peserta Tournament {showTeams ? "▲" : "▼"}
            </h3>

            {showTeams && (
              <div className="toggle-content team-list">
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <div key={team.id} className="team-item">
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
              className="btn-clean"
              onClick={() => setShowBracket(true)}
            >
              Lihat Bracket
            </button>
          </>
        )}
      </div>

      {/* BRACKET */}
      {showBracket && (
        <div style={{ height: "80vh" }}>
          <button
            className="btn-clean"
            onClick={() => setShowBracket(false)}
            style={{ margin: "20px" }}
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