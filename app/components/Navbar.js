"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔍 HANDLE SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/blogs?search=${search}`);
    setMenuOpen(false); // 🔥 auto close dropdown
  };

  // 🔥 CLOSE MENU SAAT KLIK LINK
  const handleCloseMenu = () => {
    setMenuOpen(false);
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

      {/* 🔥 HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🔥 MOBILE DROPDOWN MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link href="/" onClick={handleCloseMenu}>Home</Link>
        <Link href="/tournaments" onClick={handleCloseMenu}>Tournament</Link>
        <Link href="/blogs" onClick={handleCloseMenu}>News</Link>
        <Link href="/about" onClick={handleCloseMenu}>About Us</Link>

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <Link
          href="/tournaments"
          className="btn-primary"
          onClick={handleCloseMenu}
        >
          Explore
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/tournaments">Tournament</Link>
        <Link href="/blogs">News</Link>
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