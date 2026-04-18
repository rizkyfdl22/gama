"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function AdminTournaments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      setData(data || []);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Tournaments</h1>

      {/* CREATE */}
      <Link href="/admin/tournaments/create">
        <button>Create Tournament</button>
      </Link>

      {/* LIST */}
      <div style={{ marginTop: "20px" }}>
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "15px",
                padding: "15px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.game}</p>

              {/* ACTIONS */}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                
                <Link href={`/admin/tournaments/${item.id}/bracket`}>
                  <button>Manage Bracket</button>
                </Link>

                <Link href={`/admin/tournaments/${item.id}/teams`}>
                  <button>Manage Teams</button>
                </Link>

              </div>
            </div>
          ))
        ) : (
          <p>Belum ada tournament</p>
        )}
      </div>
    </div>
  );
}