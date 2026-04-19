"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="home">

      {/* ========================= */}
      {/* HERO */}
      {/* ========================= */}
      <section className="hero">
        <div className="hero-content">

          {/* LEFT */}
          <div className="hero-left">
            <h1>
              Di medan perang Semesta,{" "}
              <span className="gradient-text">
                hanya satu yang akan berdiri di puncak
              </span>
            </h1>

            <p>
              Saatnya buktikan skill timmu dan raih supremasi di turnamen esports
              yang kompetitif dan profesional.
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

          {/* RIGHT */}
          <div className="hero-right">
            <img src="/logo_shadow.png" alt="Semesta Esports Logo" />
          </div>

        </div>
      </section>

     <section className="about-section">

  <div className="about-container">

    {/* LEFT */}
    <div className="about-left">
      <h2 className="gradient-text">Who We Are</h2>

      <p className="about-desc">
        Semesta Esports adalah platform dan komunitas yang menghadirkan
        turnamen esports kompetitif, profesional, dan terbuka untuk semua.
      </p>

      <p className="about-desc">
        Kami menjadi wadah bagi pemain dan tim untuk berkembang,
        menunjukkan skill, dan merasakan atmosfer kompetisi yang nyata.
      </p>
    </div>

    {/* RIGHT (HIGHLIGHT POINT) */}
    <div className="about-right">

      <div className="about-card">
        <h3>Competitive</h3>
        <p>Turnamen dengan sistem yang fair dan profesional.</p>
      </div>

      <div className="about-card">
        <h3>Community</h3>
        <p>Membangun ekosistem esports yang solid dan suportif.</p>
      </div>

      <div className="about-card">
        <h3>Opportunity</h3>
        <p>Kesempatan bagi semua pemain untuk bersinar.</p>
      </div>

    </div>

  </div>

</section>    
      {/* ========================= */}
      {/* WHY US */}
      {/* ========================= */}
      <section className="section">
        <h2>Why Choose Us</h2>

        <p>
          Kami tidak hanya membuat turnamen — kami menciptakan pengalaman
          kompetitif yang serius, transparan, dan berkesan untuk setiap pemain.
        </p>
      </section>

      {/* ========================= */}
      {/* TRUST / STATS (NEW) */}
      {/* ========================= */}
      <section className="features">
        <div className="card">
          <h3>100+</h3>
          <p>Tim telah berpartisipasi</p>
        </div>

        <div className="card">
          <h3>10+</h3>
          <p>Turnamen berhasil diselenggarakan</p>
        </div>

        <div className="card">
          <h3>1000+</h3>
          <p>Match dimainkan</p>
        </div>
      </section>

     <section className="partners-section">

  <h2 className="partners-title gradient-text">Official Partners</h2>

  <div className="partners-box">
    <div className="marquee">
      <div className="marquee-track">
        <img src="/feed-logo.jpeg" alt="Partner" />
        <img src="/logo_RRQ.png" alt="Partner" />
        <img src="/pocari-sweat-logo.png" alt="Partner" />

        {/* DUPLICATE */}
        <img src="/feed-logo.jpeg" alt="Partner" />
        <img src="/logo_RRQ.png" alt="Partner" />
        <img src="/pocari-sweat-logo.png" alt="Partner" />
      </div>
    </div>
  </div>

  <h2 className="partners-title gradient-text" style={{ marginTop: "60px" }}>
    Sponsors
  </h2>

  <div className="partners-box">
    <div className="marquee">
      <div className="marquee-track">
        <img src="/pertamina-logo.png" alt="Sponsor" />
        <img src="/warkop-iklas.png" alt="Sponsor" />
        <img src="/logo-wismilak.png" alt="Sponsor" />

        {/* DUPLICATE */}
        <img src="/pertamina-logo.png" alt="Sponsor" />
        <img src="/warkop-iklas.png" alt="Sponsor" />
        <img src="/logo-wismilak.png" alt="Sponsor" />
      </div>
    </div>
  </div>

</section>
      {/* ========================= */}
      {/* CTA */}
      {/* ========================= */}
      <section className="cta">
        <h2>Siap untuk bertanding?</h2>
        <p style={{ marginBottom: "20px" }}>
          Daftarkan timmu sekarang dan buktikan siapa yang pantas jadi juara.
        </p>

        <Link href="/tournaments" className="btn-primary">
          Explore Tournament
        </Link>
      </section>

    </div>
  );
}