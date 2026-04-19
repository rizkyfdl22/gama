import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* BRAND */}
        <div className="footer-brand">
          <h2>Semesta Esports</h2>
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
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Tangerang Selatan, Indonesia</p>
          <p>📧semestaesports@gmail.com</p>
          <p>+62 822 1397 6285 </p>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" target="_blank">Instagram</a>
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