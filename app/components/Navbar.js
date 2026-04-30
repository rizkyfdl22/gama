"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [search, setSearch] = useState("");

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

  // 🔍 HANDLE SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/blogs?search=${search}`);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
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

      {/* MENU */}
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/tournaments">Tournament</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/about">About Us</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-actions">
        {/* 🔍 SEARCH */}
        <form onSubmit={handleSearch} className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <Link href="/tournaments" className="btn-primary">
          Explore
        </Link>
      </div>
    </nav>
  );
}