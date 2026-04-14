"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
<section className="hero">
  
  <div className="hero-content">
    
    {/* LEFT - TEXT */}
    <div className="hero-left">
      <h1>
        We Create{" "}
        <span className="gradient-text">Competitive Experiences</span>
      </h1>

      <p>
        Kami adalah Event Organizer yang menghadirkan tournament
        berkualitas untuk para pemain kompetitif.
      </p>

      <div className="hero-buttons">
        <Link href="/tournaments" className="btn-white">
          Lihat Tournament
        </Link>

        <Link href="/about" className="btn-outline">
          Tentang Kami
        </Link>
      </div>
    </div>

    {/* RIGHT - LOGO */}
    <div className="hero-right">
      <img src="/logo_shadow.png" alt="Logo Tournament" />
    </div>

  </div>

</section>

      {/* ABOUT */}
      <section className="section">
        <h2>Who We Are</h2>
        <p>
          Kami fokus membuat tournament yang fair, kompetitif, dan
          terorganisir dengan baik. Dari registrasi hingga bracket,
          semuanya kami kelola dengan profesional.
        </p>
      </section>

      {/* SERVICES */}
      <section className="features">
        <div className="card">
          <h3>Tournament Organizer</h3>
          <p>
            Mengelola event dari awal hingga akhir dengan sistem yang rapi.
          </p>
        </div>

        <div className="card">
          <h3>Bracket Management</h3>
          <p>
            Sistem bracket yang jelas dan mudah dipahami oleh peserta.
          </p>
        </div>

        <div className="card">
          <h3>Fair Competition</h3>
          <p>
            Kami menjunjung tinggi keadilan dalam setiap pertandingan.
          </p>
        </div>
      </section>

      {/* WHY US */}
      <section className="section">
        <h2>Why Choose Us</h2>
        <p>
          Kami bukan sekadar membuat tournament, tapi menciptakan
          pengalaman kompetitif yang berkesan untuk setiap peserta.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Siap untuk bertanding?</h2>
        <Link href="/tournaments" className="btn-primary">
          Explore Tournament
        </Link>
      </section>

    </div>
  );
}