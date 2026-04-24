"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("FETCH ERROR:", error);
      setLoading(false);
      return;
    }

    setTournaments(data || []);
    setLoading(false);
  };

  return (
    <div className="tournaments-page">
      {/* HERO */}
      <div className="section center">
        <h1 className="gradient-text">Explore Tournaments</h1>
        <p className="subtitle">
          Temukan turnamen terbaik dan lihat bracket secara real-time
        </p>
      </div>

      {/* LIST */}
      <div className="tournament-grid">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : tournaments.length > 0 ? (
          tournaments.map((t) => (
            <Link key={t.id} href={`/tournaments/${t.id}`}>
              <div className="tournament-banner-card">
                
                {/* BANNER */}
                <img
                  src={t.banner_url || "/default-banner.png"}
                  alt={t.title}
                  className="banner-img"
                />

              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>Belum ada tournament</p>
          </div>
        )}
      </div>
    </div>
  );
}