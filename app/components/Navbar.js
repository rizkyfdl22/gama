"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
        Tourney<span>Hub</span>
      </h1>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/tournaments">Tournament</Link>
        <Link href="#">How It Works</Link>
      </div>

      <div className="nav-actions">
        <Link href="/login">Login</Link>
        <Link href="/tournaments" className="btn-primary">
          Explore
        </Link>
      </div>
    </nav>
  );
}