"use client";

export default function CustomMatch({ match }) {
  const teamA = match.participants[0];
  const teamB = match.participants[1];

  return (
    <div className="custom-match">

      {/* TEAM A */}
      <div
        className={`team ${
          teamA.isWinner ? "winner" : ""
        }`}
      >
        <span className="team-name">{teamA.name}</span>
        <span className="score">{teamA.resultText || "-"}</span>
      </div>

      {/* DIVIDER */}
      <div className="vs">VS</div>

      {/* TEAM B */}
      <div
        className={`team ${
          teamB.isWinner ? "winner" : ""
        }`}
      >
        <span className="team-name">{teamB.name}</span>
        <span className="score">{teamB.resultText || "-"}</span>
      </div>

    </div>
  );
}