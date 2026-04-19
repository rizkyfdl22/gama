"use client";

import { Match } from "@g-loot/react-tournament-brackets";

export default function CustomMatch(props) {
  return (
    <div className="custom-match-wrapper">
      <Match {...props} />
    </div>
  );
}