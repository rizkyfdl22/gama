import Link from "next/link";

export default function AboutPage() {
  useInView(); 
  return (
    <main className="home">
      {/* ========================= */}
      {/* HERO */}
      {/* ========================= */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left fade-left">
            <h1>
              Behind the <span className="gradient-text">Platform</span>
            </h1>
            <p className="delay-1">
              Di balik setiap pertandingan,
ada sistem yang memastikan semuanya berjalan adil.

Di balik setiap kemenangan,
ada platform yang memberi kesempatan untuk bertanding.

Semesta Esports hadir untuk mereka yang ingin lebih dari sekadar bermain—
kami hadir untuk mereka yang ingin bersaing, berkembang, dan diakui.

Ini bukan hanya platform.
Ini adalah medan pertempuran digital.
            </p>
          </div>

          <div className="hero-right fade-right delay-1">
            <img src="/logo_shadow.png" alt="about" />
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* ABOUT */}
      {/* ========================= */}
      <section className="about-section">
        <div className="about-container">
          {/* LEFT */}
          <div className="about-left fade-left">
            <h2>
              Who We <span className="gradient-text">Are</span>
            </h2>

            <p className="about-desc delay-1">
        Semesta Esports adalah platform dan komunitas yang menghadirkan
        turnamen esports kompetitif, profesional, dan terbuka untuk semua.
            </p>

            <p className="about-desc delay-2">
              Kami menjadi wadah bagi pemain dan tim untuk berkembang,
        menunjukkan skill, dan merasakan atmosfer kompetisi yang nyata.
            </p>
          </div>

          {/* RIGHT */}
          <div className="about-right">
            <div className="about-card fade-up">
              <h3>Our Mission</h3>
              <p>
                Membantu komunitas berkembang melalui tournament yang lebih
                mudah dan terorganisir.
              </p>
            </div>

            <div className="about-card fade-up delay-1">
              <h3>Our Vision</h3>
              <p>
                Menjadi platform tournament terbaik dengan sistem modern.
              </p>
            </div>

            <div className="about-card fade-up delay-2">
              <h3>Why Us</h3>
              <p>
                ami tidak hanya membuat turnamen — kami menciptakan pengalaman
          kompetitif yang serius, transparan, dan berkesan untuk setiap pemain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* CTA */}
      {/* ========================= */}
      <section className="cta fade-up">
        <h2>Siap untuk bertanding?</h2>

        <p style={{ marginTop: "10px", color: "var(--gray)" }}>
          Daftarkan timmu sekarang dan buktikan siapa yang pantas jadi juara.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link href="/tournaments" className="btn-white">
            Explore Tournaments
          </Link>
        </div>
      </section>
    </main>
  );
}