"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image
          src="/WHITE PANJANG.png"
          alt="Semesta Esports Logo"
          width={0}
          height={0}
          sizes="100vw"
           className="footer-logo-img"
/>
          </Link>
          <p>
            Platform turnamen esports untuk para pemain kompetitif.
            Bergabung dan buktikan skill kamu di arena.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="footer-links">
          <h4>Explore</h4>
          <Link href="/">Home</Link>
          <Link href="/tournaments">Tournaments</Link>
          <Link href="/rules">Rules</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Tangerang Selatan, Indonesia</p>
          <p>admin@semestaesports.id</p>
          <p>+62 821 2205 2162</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://instagram.com/semesta.esports" target="_blank">Instagram</a>
            <a href="#" target="_blank">TikTok</a>
            <a href="#" target="_blank">YouTube</a>
            <a href="#" target="_blank">Discord</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Semesta Esports. All rights reserved.
      </div>
    </footer>
  );
}