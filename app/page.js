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
        Di medan perang Semesta{" "}
        <span className="gradient-text">hanya satu yang akan berdiri di puncak</span>
      </h1>

      <p>
        Ini saatnya Battle for supremacy!
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
          Semesta Cup S2 hadir sebagai panggung pertempuran bagi para pejuang  Land of Dawn
          yang siap membuktikan siapa yang paling layak berada di puncak. Mengusung tema
          Battle for supremacy, Turnamen ini bukan sekedar kompetisi, ini adalah ajang pembuktian
          strategi, kerja sama tim, dan mental juara.
        </p>
      </section>

      {/* SERVICES */}
      <section className="features">
        <div className="card">
          <h3>Competitive Tournament</h3>
          <p>
            Menawarkan kompetisi Mobile Legends yang kompetitif dengan sistem turnamen profesional,
             Bracket jelas, dan fair play.
          </p>
        </div>

        <div className="card">
          <h3>Prize Pool & rewards</h3>
          <p>
            Total hadiah menarik serta penghargaan bagi tim terbaik, MVP, dan performa paling gemilang.
          </p>
        </div>

        <div className="card">
          <h3>Exposure & recognition</h3>
          <p>
            Tunjukkan skill timmu ke publik dan dapatkan kesempatan dikenal lebih luas di dunia kompetitif.
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

{/* PARTNERS */}
<section className="partners">

  <h2>Official Partner</h2>

  <div className="marquee">
    <div className="marquee-track">
      <img src="/feed-logo.jpeg" alt="" />
      <img src="/logo_RRQ.png" alt="" />
      <img src="/pocari-sweat-logo.png" alt="" />

      {/* DUPLICATE (WAJIB buat looping) */}     
      <img src="/feed-logo.jpeg" alt="" />
      <img src="/logo_RRQ.png" alt="" />
      <img src="/pocari-sweat-logo.png" alt="" />
    </div>
  </div>

  <h2 className="sponsor-title">Our Sponsors</h2>

  <div className="marquee">
    <div className="marquee-track">
      <img src="/pertamina-logo.png" alt="" />
      <img src="/warkop-iklas.png" alt="" />
      <img src="/logo-wismilak.png" alt="" />

      {/* DUPLICATE */}
      <img src="/pertamina-logo.png" alt="" />
      <img src="/warkop-iklas.png" alt="" />
      <img src="/logo-wismilak.png" alt="" />
    </div>
  </div>

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