"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function AdminPage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  async function fetchTournaments() {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTournaments(data);
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Yakin mau hapus?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tournaments")
      .delete()
      .eq("id", id);

    if (!error) fetchTournaments();
  }

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <h1>
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p>Kelola semua tournament</p>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="card">
          <h3>Total Tournament</h3>
          <p className="stat-number">{tournaments.length}</p>
        </div>

        <div className="card">
          <h3>Active</h3>
          <p className="stat-number">
            {tournaments.filter(t => t.status === "Active").length}
          </p>
        </div>

        <div className="card">
          <h3>Finished</h3>
          <p className="stat-number">
            {tournaments.filter(t => t.status === "Finished").length}
          </p>
        </div>
      </div>

      {/* ACTION */}
      <div className="admin-actions">
        <Link href="/admin/tournaments/create" className="btn-primary">
          + Buat Tournament
        </Link>
      </div>

      {/* TABLE */}
      <div className="admin-table card">
        <h2>Daftar Tournament</h2>

        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>

                <td>
                  <span
                    className={
                      t.status === "Active"
                        ? "status active"
                        : "status finished"
                    }
                  >
                    {t.status}
                  </span>
                </td>

                <td>
                  <Link
                    href={`/admin/edit/${t.id}`}
                    className="btn-outline small"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="btn-outline small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tournaments.length === 0 && (
          <p style={{ marginTop: "20px", color: "var(--gray)" }}>
            Belum ada tournament
          </p>
        )}
      </div>
    </div>
  );
}