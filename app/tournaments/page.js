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
    <div className="home">
      <div className="section">
        <h2 className="gradient-text">Explore Tournaments</h2>
        <p>Temukan turnamen terbaik dan lihat bracket secara real-time</p>
      </div>

      <div
        style={{
          marginTop: "60px",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {tournaments.length > 0 ? (
          tournaments.map((t) => (
            <Link key={t.id} href={`/tournaments/${t.id}`}>
              <div className="card" style={{ cursor: "pointer" }}>
                <h3>{t.title}</h3>

                <p style={{ marginTop: "10px" }}>
                   {t.game}
                </p>

                <p> {t.date}</p>

                <p>
                  {" "}
                  {t.price === 0
                    ? "Free"
                    : `Rp ${t.price.toLocaleString("id-ID")}`}
                </p>

                <p>
                   Max {t.max_participants} Teams
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            Belum ada tournament
          </p>
        )}
      </div>
    </div>
  );
}