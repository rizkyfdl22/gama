import React from "react";
import styles from "./features.module.css";

export interface Feature {
  number: string;
  title: string;
  tagline?: string;
  description: string;
  featured?: boolean;
  accent: "purple" | "pink" | "yellow";
  visualType: "discover" | "registration" | "team" | "match" | "community" | "organizer";
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    number: "01",
    title: "DISCOVER TOURNAMENTS",
    tagline: "Find your next arena.",
    description:
      "Jelajahi berbagai kompetisi esports terkurasi. Filter berdasarkan game pilihan, tingkat keahlian, hingga total prize pool dalam hitungan detik.",
    featured: true,
    accent: "purple",
    visualType: "discover",
  },
  {
    number: "02",
    title: "EASY REGISTRATION",
    tagline: "One-click tournament entry.",
    description:
      "Daftarkan dirimu atau tim dengan sistem verifikasi instan. Bebas ribet admin, langsung siap bertanding.",
    accent: "pink",
    visualType: "registration",
  },
  {
    number: "03",
    title: "TEAM MANAGEMENT",
    tagline: "Build your dream roster.",
    description:
      "Kelola tim, undang player, atur role roster, dan pantau histori performa kompetisi dalam satu hub terpadu.",
    accent: "yellow",
    visualType: "team",
  },
  {
    number: "04",
    title: "MATCH & BRACKET",
    tagline: "Live tournament progression.",
    description:
      "Bagan pertandingan otomatis yang selalu update secara real-time. Pantau jadwal, skor, dan lawan selanjutnya tanpa tertunda.",
    accent: "purple",
    visualType: "match",
  },
  {
    number: "05",
    title: "COMMUNITY HUB",
    tagline: "Connect with the ecosystem.",
    description:
      "Bangun reputasi, temukan rekan tim baru, dan terhubung langsung dengan ribuan player serta Event Organizer nasional.",
    accent: "pink",
    visualType: "community",
  },
  {
    number: "06",
    title: "ORGANIZER",
    tagline: "Command center for organizers.",
    description:
      "Solusi bagi EO agar tournament dapat di akses dan menjangkau player lebih banyak.",
    accent: "yellow",
    visualType: "organizer",
  },
];

const statsData: Stat[] = [
  { label: "TOURNAMENTS HELD", value: "50+", description: "Kompetisi aktif & mendatang" },
  { label: "ACTIVE PLAYERS", value: "1K+", description: "Player terverifikasi" },
  { label: "ESPORTS COMMUNITIES", value: "20+", description: "Komunitas terhubung" },
  { label: "MATCHES PROCESSED", value: "2.5K+", description: "Pertandingan terekam" },
];

function FeatureVisual({ type }: { type: Feature["visualType"] }) {
  switch (type) {
    case "discover":
      return (
        <svg
          className={styles.visualSvg}
          viewBox="0 0 320 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Abstract Bracket Grid Visual */}
          <path d="M20 40H80V80H20V40Z" className={styles.svgNode} />
          <path d="M20 100H80V140H20V100Z" className={styles.svgNode} />
          <path d="M80 60H140V120H80" className={styles.svgLine} />
          <path d="M140 90H180" className={styles.svgLineAccent} />
          <path d="M180 70H240V110H180V70Z" className={styles.svgNodeActive} />
          <circle cx="140" cy="90" r="4" className={styles.svgGlowDot} />
          <circle cx="210" cy="90" r="6" className={styles.svgPulseDot} />
          <path d="M240 90H290" className={styles.svgLineDashed} />
          <polygon points="290,85 300,90 290,95" className={styles.svgArrow} />
        </svg>
      );
    case "registration":
      return (
        <svg
          className={styles.visualSvg}
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Abstract Form Check Visual */}
          <rect x="10" y="15" width="180" height="12" rx="2" className={styles.svgBarBg} />
          <rect x="10" y="15" width="120" height="12" rx="2" className={styles.svgBarFill} />
          <rect x="10" y="38" width="180" height="12" rx="2" className={styles.svgBarBg} />
          <rect x="10" y="38" width="80" height="12" rx="2" className={styles.svgBarFillSecondary} />
          <path d="M160 58 L168 66 L185 48" className={styles.svgCheck} />
        </svg>
      );
    case "team":
      return (
        <svg
          className={styles.visualSvg}
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Connected Roster Nodes */}
          <circle cx="40" cy="40" r="16" className={styles.svgNodeCircle} />
          <circle cx="100" cy="25" r="18" className={styles.svgNodeCircleActive} />
          <circle cx="160" cy="40" r="16" className={styles.svgNodeCircle} />
          <path d="M56 40 L82 28" className={styles.svgLine} />
          <path d="M118 28 L144 40" className={styles.svgLine} />
          <circle cx="100" cy="25" r="5" className={styles.svgGlowDot} />
        </svg>
      );
    case "match":
      return (
        <svg
          className={styles.visualSvg}
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Match VS Nodes */}
          <rect x="15" y="25" width="60" height="30" rx="4" className={styles.svgNode} />
          <rect x="125" y="25" width="60" height="30" rx="4" className={styles.svgNode} />
          <path d="M75 40 H90 L100 30 L110 40 H125" className={styles.svgLineAccent} />
          <text x="100" y="52" textAnchor="middle" className={styles.svgVsText}>
            VS
          </text>
        </svg>
      );
    case "community":
      return (
        <svg
          className={styles.visualSvg}
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Network Constellation */}
          <circle cx="30" cy="30" r="4" className={styles.svgGlowDot} />
          <circle cx="80" cy="60" r="5" className={styles.svgGlowDot} />
          <circle cx="120" cy="20" r="6" className={styles.svgPulseDot} />
          <circle cx="170" cy="50" r="4" className={styles.svgGlowDot} />
          <path d="M30 30 L80 60 L120 20 L170 50 L80 60" className={styles.svgLine} />
          <path d="M30 30 L120 20" className={styles.svgLineDashed} />
        </svg>
      );
    case "organizer":
      return (
        <svg
          className={styles.visualSvg}
          viewBox="0 0 320 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Dashboard Control Graphic */}
          <rect x="10" y="15" width="90" height="70" rx="6" className={styles.svgNode} />
          <rect x="115" y="15" width="195" height="30" rx="6" className={styles.svgNode} />
          <rect x="115" y="55" width="90" height="30" rx="6" className={styles.svgNodeActive} />
          <rect x="220" y="55" width="90" height="30" rx="6" className={styles.svgNode} />
          <path d="M25 45 L45 35 L65 55 L80 30" className={styles.svgLineAccent} />
        </svg>
      );
    default:
      return null;
  }
}

export default function FeaturesSection() {
  return (
    <section className={styles.section} aria-labelledby="features-heading">
      {/* Background Decorative Grid and Glow Effects */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrbPurple} aria-hidden="true" />
      <div className={styles.bgOrbPink} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>WHY SEMESTA</p>
          <h2 id="features-heading" className={styles.heading}>
            EVERYTHING YOU NEED <br className={styles.headingBreak} />
            <span className={styles.headingHighlight}>TO COMPETE.</span>
          </h2>
          <p className={styles.description}>
            Dari menemukan tournament hingga mengelola pertandingan, Semesta Esports menghadirkan
            semua kebutuhan competitive gaming dalam satu platform.
          </p>
        </header>

        {/* Asymmetric Feature Architecture */}
        <div className={styles.grid}>
          {featuresData.map((feature) => {
            const accentClass =
              feature.accent === "purple"
                ? styles.accentPurple
                : feature.accent === "pink"
                ? styles.accentPink
                : styles.accentYellow;

            const cardClass = [
              styles.card,
              feature.featured ? styles.cardFeatured : "",
              feature.visualType === "organizer" ? styles.cardOrganizer : "",
              accentClass,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article key={feature.number} className={cardClass} tabIndex={0}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>{feature.number}</span>
                  <div className={styles.cardAccentIndicator} aria-hidden="true" />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  {feature.tagline && <p className={styles.cardTagline}>{feature.tagline}</p>}
                  <p className={styles.cardDescription}>{feature.description}</p>
                </div>

                <div className={styles.cardVisualWrapper} aria-hidden="true">
                  <FeatureVisual type={feature.visualType} />
                </div>

                <div className={styles.cardHoverLine} aria-hidden="true" />
              </article>
            );
          })}
        </div>

        {/* Platform Ecosystem Statement */}
        <div className={styles.statementBox}>
          <div className={styles.statementBadge}>ECOSYSTEM POWER</div>
          <p className={styles.statementText}>
            NOT JUST A TOURNAMENT PLATFORM. <br />
            <span className={styles.statementHighlight}>A COMPLETE ESPORTS ECOSYSTEM.</span>
          </p>
        </div>

        {/* Supporting Micro Stats */}
        <div className={styles.statsWrapper}>
          <div className={styles.statsGrid}>
            {statsData.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statDesc}>{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}