import React from "react";
import Link from "next/link";
import styles from "./games.module.css";

const games = [
  {
    name: "Mobile Legends",
    slug: "mobile-legends",
    shortName: "MLBB",
  },
  {
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    shortName: "PUBG",
  },
  {
    name: "Free Fire",
    slug: "free-fire",
    shortName: "FF",
  },
  {
    name: "Valorant",
    slug: "valorant",
    shortName: "VAL",
  },
  {
    name: "EA FC",
    slug: "ea-fc",
    shortName: "FC",
  },
  {
    name: "Dota 2",
    slug: "dota-2",
    shortName: "DOTA",
  },
];

export default function GamesSection() {
  return (
    <section className={styles.section} aria-labelledby="games-heading">
      <div className={styles.container}>
        
        {/* Header Area */}
        <header className={styles.header}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>THE ARENA</span>
          </div>
          <h2 id="games-heading" className={styles.heading}>
            CHOOSE YOUR <span className={styles.accentText}>GAME.</span>
          </h2>
          <p className={styles.description}>
            Find tournaments for your favorite game and get ready to compete.
          </p>
        </header>

        {/* Games Grid Area */}
        <div className={styles.grid}>
          {games.map((game, index) => {
            const indexNumber = (index + 1).toString().padStart(2, "0");
            
            return (
              <Link 
                key={game.slug}
                href={`/tournament/${game.slug}`}
                className={styles.card}
                aria-label={`View ${game.name} tournaments`}
              >
                {/* Decorative Elements */}
                <div className={styles.cardCorner} aria-hidden="true" />
                <div className={styles.cardGlow} aria-hidden="true" />
                
                {/* Top Section: Index & Short Name */}
                <div className={styles.cardTop}>
                  <span className={styles.index}>{indexNumber}</span>
                  <span className={styles.shortName} aria-hidden="true">
                    {game.shortName}
                  </span>
                </div>

                {/* Main Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.gameName}>{game.name}</h3>
                </div>

                {/* Bottom Section: CTA */}
                <div className={styles.cardBottom}>
                  <span className={styles.ctaText}>VIEW TOURNAMENT</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}