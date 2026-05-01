"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, tournaments]);

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
    setFiltered(data || []);
    setLoading(false);
  };

  const handleSearch = () => {
    const keyword = search.toLowerCase();

    const result = tournaments.filter((t) =>
      t.title.toLowerCase().includes(keyword)
    );

    setFiltered(result);
  };

  return (
    <div className="home">
    <div className="tournaments-page">
      {/* HERO */}
      <div className="section center">
        <h1 className="gradient-text">Explore Tournaments</h1>
        <p className="subtitle">
          Temukan turnamen yang sedang berjalan dan lihat bracket secara real-time
        </p>

        {/* SEARCH BAR */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari tournament..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LIST */}
      <div className="tournament-grid">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : filtered.length > 0 ? (
          filtered.map((t) => (
            <Link key={t.id} href={`/tournaments/${t.id}`}>
              <div className="tournament-banner-card">
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
            <p>Tournament tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}