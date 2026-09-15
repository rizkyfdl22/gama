import Link from "next/link";
import styles from "./collabs.module.css";

interface Collaborator {
  id: string;
  number: string;
  name: string;
  category: string;
  shortName: string;
}

const COLLABORATORS: Collaborator[] = [
  {
    id: "collab-1",
    number: "01",
    name: "NEXUS ESPORTS",
    category: "TOURNAMENT ORGANIZER",
    shortName: "NE",
  },
  {
    id: "collab-2",
    number: "02",
    name: "PIXEL ARENA",
    category: "ESPORTS EVENT",
    shortName: "PA",
  },
  {
    id: "collab-3",
    number: "03",
    name: "VORTEX GAMING",
    category: "COMMUNITY ORGANIZER",
    shortName: "VG",
  },
  {
    id: "collab-4",
    number: "04",
    name: "LEVEL UP EVENT",
    category: "TOURNAMENT ORGANIZER",
    shortName: "LU",
  },
];

// Data untuk marquee agar terlihat looping seamless (diulang)
const MARQUEE_ITEMS = [
  "NEXUS ESPORTS",
  "PIXEL ARENA",
  "VORTEX GAMING",
  "LEVEL UP EVENT",
  "SEMESTA ECOSYSTEM",
];

export default function Collabs() {
  return (
    <section className={styles.collabs} aria-labelledby="collabs-heading">
      {/* Background & Atmospheric Visual Decorations */}
      <div className={styles.bgGlowPink} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.networkLines} aria-hidden="true" />

      {/* Marquee Background (Decorative) */}
      <div className={styles.marqueeContainer} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {/* Diulang dua kali untuk seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span key={`marquee-${index}`} className={styles.marqueeItem}>
              {item} <span className={styles.marqueeDot}>•</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>Trusted By Event Organizers</span>
          </div>
          <h2 id="collabs-heading" className={styles.title}>
            Built With The People <br />
            <span className={styles.titleHighlight}>Behind The Arena.</span>
          </h2>
          <p className={styles.description}>
            Bersama para Event Organizer, Semesta Esports menghadirkan pengalaman tournament yang lebih terstruktur, kompetitif, dan mudah diakses oleh player maupun komunitas.
          </p>
        </header>

        {/* Collaborators / Partners Grid */}
        <div className={styles.grid}>
          {COLLABORATORS.map((collab) => (
            <div key={collab.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{collab.number}</span>
                <div className={styles.cardAccentLine} aria-hidden="true" />
              </div>
              
              {/* Text-based Logo Representation */}
              <div className={styles.logoContainer} aria-hidden="true">
                <span className={styles.logoInitials}>{collab.shortName}</span>
                <div className={styles.logoGlow} />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.collabName}>{collab.name}</h3>
                <span className={styles.collabCategory}>{collab.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Statement & CTA */}
        <div className={styles.footer}>
          <p className={styles.statement}>
            Powering The Next Generation <br />
            Of Esports Tournaments.
          </p>
          
          <div className={styles.ctaWrapper}>
            <p className={styles.ctaText}>Punya tournament sendiri?</p>
            <Link href="#" className={styles.primaryCta}>
              Partner with Semesta
              <span className={styles.ctaGlow} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}