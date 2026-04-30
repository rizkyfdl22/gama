"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/blogs?search=${search}`);
    setMenuOpen(false); // 🔥 auto close setelah search
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

      {/* HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🔥 DROPDOWN MENU (SATU TEMPAT) */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/tournaments" onClick={() => setMenuOpen(false)}>Tournament</Link>
        <Link href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <Link href="/tournaments" className="btn-primary" onClick={() => setMenuOpen(false)}>
          Explore
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/tournaments">Tournament</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/about">About Us</Link>
      </div>

      <div className="nav-actions">
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