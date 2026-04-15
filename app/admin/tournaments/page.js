"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function AdminTournaments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("tournaments").select("*");
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Tournaments</h1>

      <Link href="/admin/tournaments/create">
        <button>Create Tournament</button>
      </Link>

      <div style={{ marginTop: "20px" }}>
        {data.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <h3>{item.title}</h3>
            <p>{item.game}</p>
          </div>
        ))}
      </div>
    </div>
  );
}