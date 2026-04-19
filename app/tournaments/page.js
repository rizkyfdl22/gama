"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setTournaments(data || []);
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
        {tournaments.length > 0 ? (
          tournaments.map((t) => (
            <Link key={t.id} href={`/tournaments/${t.id}`}>
              <div className="tournament-card">
                
                {/* HEADER */}
                <div className="card-header">
                  <h3>{t.title}</h3>
                  <span className="game-badge">{t.game}</span>
                </div>

                {/* BODY */}
                <div className="card-body">
                  <p className="date">
                    📅 {new Date(t.date).toLocaleDateString("id-ID")}
                  </p>

                  <p className="price">
                    {t.price === 0
                      ? "FREE ENTRY"
                      : `Rp ${t.price.toLocaleString("id-ID")}`}
                  </p>

                  <p className="slot">
                    👥 Max {t.max_participants} Teams
                  </p>
                </div>

                {/* FOOTER */}
                <div className="card-footer">
                  <span>View Details →</span>
                </div>

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