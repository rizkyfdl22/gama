"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function AdminTournaments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setData(data || []);
  }

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <h1>
          Manage <span className="gradient-text">Tournaments</span>
        </h1>
        <p>Kelola bracket, team, dan detail tournament</p>
      </div>

      {/* LIST */}
      <div className="admin-tournament-list">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="card tournament-item">

              <div className="tournament-info">
                <h3>{item.title}</h3>
                <p>{item.game}</p>
              </div>

              <div className="tournament-actions">
                <Link
                  href={`/admin/tournaments/${item.id}/bracket`}
                  className="btn-outline small"
                >
                  Bracket
                </Link>

                <Link
                  href={`/admin/tournaments/${item.id}/teams`}
                  className="btn-outline small"
                >
                  Teams
                </Link>
              </div>

            </div>
          ))
        ) : (
          <p className="empty-text">Belum ada tournament</p>
        )}
      </div>
    </div>
  );
}