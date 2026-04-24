"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // close dropdown kalau klik luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO IMAGE */}
      <Link href="/" className="logo">
        <Image
        src="/WHITE.png"
        alt="Semesta Esports Logo"
        width={0}
        height={0}
        sizes="100vw"
        className="logo-img"
/>
      </Link>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/tournaments/">
          Tournament
        </Link>
        <Link href="/rules">Rules</Link>
      </div>

      <div className="nav-actions">
        <Link href="/tournaments" className="btn-primary">
          Explore
        </Link>
      </div>
    </nav>
  );
}