"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      // ambil user login
      const { data: { user } } = await supabase.auth.getUser();

      // ❌ belum login
      if (!user) {
        router.push("/login");
        return;
      }

      // ambil role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      // ❌ bukan admin
      if (!profile || profile.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  // loading state
  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Kelola tournament di sini</p>
    </div>
  );
}