"use client";

import { useEffect } from "react";

export default function PartnershipPage() {

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-up, .fade-left, .fade-right"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <div className="partnership-content">
        
        <h1 className="fade-up">Kerja Sama</h1>
        <p className="subtitle fade-up delay-1">
          Mari berkembang bersama Semesta Esports 🚀
        </p>

        <section className="fade-up delay-2">
          <h2>Tentang Kami</h2>
          <p>
            Semesta Esports adalah platform dan komunitas yang menghadirkan
            turnamen esports kompetitif, profesional, dan terbuka untuk semua.
          </p>
        </section>

        <section className="fade-left delay-2">
          <h2>Peluang Kerja Sama</h2>
          <ul>
            <li>Sponsorship Turnamen</li>
            <li>Media Partner</li>
            <li>Brand Collaboration</li>
          </ul>
        </section>

        <section className="fade-right delay-3">
          <h2>Keuntungan</h2>
          <ul>
            <li>Exposure ke komunitas esports</li>
            <li>Promosi brand</li>
            <li>Akses target market gamer</li>
          </ul>
        </section>

        <section className="fade-up delay-4">
          <h2>Hubungi Kami</h2>

          <div className="contact">
            <a href="mailto:admin@semestaesports.id">
              Email
            </a>

            <a 
              href="https://api.whatsapp.com/send?phone=6282213976285&text=halo%20kak%2C%20bisa%20beritahu%20lebih%20lanjut%20tentang%20partnership%3F" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Whatsapp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}