"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        Semesta<span>Esports</span>
      </h1>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/tournaments">Tournament</Link>
        <Link href="#">How It Works</Link>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="user-btn"
              onClick={() => setOpen(!open)}
            >
              {user.email}
            </button>

            {open && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}

        <Link href="/tournaments" className="btn-primary">
          Explore
        </Link>
      </div>
    </nav>
  );
}