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
          Semesta Esoprts adalah platform dan komunitas yang berfokus pada penyelenggaraan
          turnamen esports yang kompetitif, profesional, dan terbuka untuk semua kalangan.
          Kami hadir untuk menjadi wadah bagi para pemain, tim, dan komunitas gaming dalam
          mengembangkan potensi, menunjukkan skill, serta merasakan atmosfer kompetisi yang
          berkualitas.
        </p>
        <p>
          Berawal dari semangat untuk membangun ekosistem esports yang terstruktur, Semesta Esports
          berkomitmen menghadirkan turnamen seperti Semesta Cup dengan sistem yang rapi, transparan,
          dan mudah diakses. Kami percaya bahwa setiap pemain, baik pemula maupun profesional, 
          berhak mendapatkan kesempatan yang sama untuk bersinar.
        </p>
        <p>
        Tidak hanya sekedar turnamen, Semesta Esports juga bertujuan membangun komunitas yang sold, 
        sportif, dan terus berkembang. Kami ingin menjadi bagian dari perjalanan para pemain dalam 
        meraih prestasi, sekaligus mendorong pertumbuhan industri esports ke arah yang lebih positif 
        dan berkelanjutan.  
        </p>
      </section>

      {/* SERVICES */}
      <section className="features">
        <div className="card">
          <h3>Competitive Tournament</h3>
          <p>
            Ikuti berbagai turnamen Esports seperti Semesta Cup dengan sistem kompetisi yang terstruktur 
            dan profesional, dirancang untuk memberikan pengalaman bermain yang maksimal bagi setiap tim.
          </p>
        </div>

        <div className="card">
          <h3>Live brackets & Match Updates</h3>
          <p>
            Pantau jalannya turnamen secara real-time melalui tampilan braket yang rapi dan mudah dipahami, 
            lengkap dengan update skor setiap pertandingan.
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