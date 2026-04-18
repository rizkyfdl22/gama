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

      {/* ========================= */}
      {/* ABOUT */}
      {/* ========================= */}
      <section className="section">
        <h2>Who We Are</h2>

        <p>
          Semesta Esports adalah platform dan komunitas yang berfokus pada
          penyelenggaraan turnamen esports yang kompetitif, profesional,
          dan terbuka untuk semua kalangan.
        </p>

        <p>
          Kami hadir sebagai wadah bagi para pemain dan tim untuk berkembang,
          menunjukkan skill, serta merasakan atmosfer kompetisi yang nyata
          dan berkualitas.
        </p>

        <p>
          Lebih dari sekadar turnamen, kami membangun ekosistem yang solid,
          sportif, dan berkelanjutan untuk masa depan esports.
        </p>
      </section>

      {/* ========================= */}
      {/* FEATURES */}
      {/* ========================= */}
      <section className="features">
        <div className="card">
          <h3>Competitive Tournament</h3>
          <p>
            Turnamen dengan sistem terstruktur dan profesional untuk pengalaman
            kompetitif yang maksimal.
          </p>
        </div>

        <div className="card">
          <h3>Live Brackets</h3>
          <p>
            Pantau jalannya turnamen secara real-time dengan tampilan bracket
            yang rapi dan mudah dipahami.
          </p>
        </div>

        <div className="card">
          <h3>Exposure & Recognition</h3>
          <p>
            Tunjukkan skill timmu dan dapatkan exposure untuk dikenal lebih luas
            di dunia esports.
          </p>
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

      {/* ========================= */}
      {/* PARTNERS */}
      {/* ========================= */}
      <section className="section">

        <h2>Official Partners</h2>

        <div className="marquee">
          <div className="marquee-track">
            <img src="/feed-logo.jpeg" alt="Partner" />
            <img src="/logo_RRQ.png" alt="Partner" />
            <img src="/pocari-sweat-logo.png" alt="Partner" />

            <img src="/feed-logo.jpeg" alt="Partner" />
            <img src="/logo_RRQ.png" alt="Partner" />
            <img src="/pocari-sweat-logo.png" alt="Partner" />
          </div>
        </div>

        <h2 style={{ marginTop: "60px" }}>Sponsors</h2>

        <div className="marquee">
          <div className="marquee-track">
            <img src="/pertamina-logo.png" alt="Sponsor" />
            <img src="/warkop-iklas.png" alt="Sponsor" />
            <img src="/logo-wismilak.png" alt="Sponsor" />

            <img src="/pertamina-logo.png" alt="Sponsor" />
            <img src="/warkop-iklas.png" alt="Sponsor" />
            <img src="/logo-wismilak.png" alt="Sponsor" />
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