"use client";

import useInView from "./lib/useInView";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "./lib/supabase";

export default function HomePage() {
  useInView();

  const [blogs, setBlogs] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (!error) {
      setBlogs(data);
    }
  }

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Semesta Esports",
    url: "https://semestaesports.id",
    logo: "https://semestaesports.id/logo.png",
    sameAs: [
      "https://instagram.com/semestaesports",
    ],
  };

  return (
    <div className="home">

      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <div className="hero-left fade-left">
            <h1>
              Battle for Supremacy{" "}
              <span className="gradient-text">
                One mistake. One fight. One winner.
                No second chances.
              </span>
            </h1>

            <p className="delay-1">
              Coming Soon.
            </p>

            <div className="hero-buttons delay-2">
              <Link
                href="/tournaments/"
                className="btn-white"
              >
                Explore Tournament
              </Link>

              <Link
                href="/about"
                className="btn-outline"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="hero-right fade-right delay-1">
            <img
              src="/logo_shadow.png"
              alt="Semesta Esports Logo"
            />
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-container">

          <div className="about-left fade-left">
            <h2 className="gradient-text">
              Who We Are
            </h2>

            <p className="about-desc delay-1">
              Semesta Esports adalah platform dan
              komunitas yang menghadirkan turnamen
              esports kompetitif, profesional, dan
              terbuka untuk semua.
            </p>

            <p className="about-desc delay-2">
              Kami menjadi wadah bagi pemain dan tim
              untuk berkembang, menunjukkan skill,
              dan merasakan atmosfer kompetisi yang
              nyata.
            </p>
          </div>

          <div className="about-right">

            <div className="about-card fade-up">
              <h3>Competitive</h3>

              <p>
                Turnamen dengan sistem yang fair
                dan profesional.
              </p>
            </div>

            <div className="about-card fade-up delay-1">
              <h3>Community</h3>

              <p>
                Membangun ekosistem esports yang
                solid dan suportif.
              </p>
            </div>

            <div className="about-card fade-up delay-2">
              <h3>Opportunity</h3>

              <p>
                Kesempatan bagi semua pemain untuk
                bersinar.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners-section fade-up">

        <h2 className="partners-title gradient-text">
          Official Partners
        </h2>

        <div className="partners-box delay-1">
          <div className="marquee">
            <div className="marquee-track"></div>
          </div>
        </div>

        <h2
          className="partners-title gradient-text"
          style={{ marginTop: "60px" }}
        >
          Sponsors
        </h2>

        <div className="partners-box delay-2">
          <div className="marquee">
            <div className="marquee-track"></div>
          </div>
        </div>

      </section>

      {/* BLOGS */}
      <section className="latest-blogs fade-up">

        <div className="blog-header">

          <h2 className="gradient-text">
            Latest News
          </h2>

          <div className="blog-nav">
            <button onClick={scrollLeft}>
              ‹
            </button>

            <button onClick={scrollRight}>
              ›
            </button>
          </div>

        </div>

        <div
          className="blog-slider"
          ref={sliderRef}
        >
          {blogs.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              className="blog-card"
              key={blog.id}
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
              />

              <div className="blog-content">
                <h3>{blog.title}</h3>

                <p>
                  {blog.description?.slice(0, 100)}
                  ...
                </p>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="cta fade-up">

        <h2>Siap untuk bertanding?</h2>

        <p
          className="delay-1"
          style={{ marginBottom: "20px" }}
        >
          Daftarkan timmu sekarang dan buktikan
          siapa yang pantas jadi juara.
        </p>

        <Link
          href="/tournaments"
          className="btn-primary delay-2"
        >
          Explore Tournament
        </Link>

      </section>

    </div>
  );
}