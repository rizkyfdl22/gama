import Link from "next/link";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero Section">
      {/* Background Decorations */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.glowPurple} aria-hidden="true" />
      <div className={styles.glowPink} aria-hidden="true" />
      <div className={styles.decorLine1} aria-hidden="true" />
      <div className={styles.decorLine2} aria-hidden="true" />

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <h2>The Next Generation of Esports</h2>
            <span className={styles.eyebrowLine} aria-hidden="true" />
          </div>

          <h1 className={styles.headline}>
            Compete. Conquer. <br />
            <span className={styles.highlight}>Become Legend.</span>
          </h1>

          <p className={styles.description}>
            Platform tournament esports untuk para player dan komunitas yang siap naik level, bertanding, dan membuktikan siapa yang terbaik.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/tournaments" className={styles.primaryCta}>
              Ikuti Tournament
            </Link>
            <Link href="/about" className={styles.secondaryCta}>
              Tentang Kami
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1,000+</span>
              <span className={styles.statLabel}>Players</span>
            </div>
            
            <div className={styles.divider} aria-hidden="true" />
            
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Tournaments</span>
            </div>
            
            <div className={styles.divider} aria-hidden="true" />
            
            <div className={styles.statItem}>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>Communities</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}