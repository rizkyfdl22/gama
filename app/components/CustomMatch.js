"use client";

export default function CustomMatch({ match, onMatchClick }) {
  const teamA = match.participants?.[0];
  const teamB = match.participants?.[1];

  if (!teamA || !teamB) return null;

  return (
    <div className="custom-match" onClick={() => onMatchClick?.(match)}>

      {/* TEAM A */}
      <div className={`team ${teamA.isWinner ? "winner" : ""}`}>
        <span className="team-name">{teamA.name}</span>
        <span className="score">{teamA.resultText || "-"}</span>
      </div>

      <div className="vs">VS</div>

      {/* TEAM B */}
      <div className={`team ${teamB.isWinner ? "winner" : ""}`}>
        <span className="team-name">{teamB.name}</span>
        <span className="score">{teamB.resultText || "-"}</span>
      </div>

    </div>
  );
}