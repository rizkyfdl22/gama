import styles from "./about.module.css";

interface FeatureItem {
  number: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    number: "01",
    title: "COMPETE",
    description:
      "Temukan tournament yang sesuai dan buktikan kemampuanmu di arena kompetitif.",
  },
  {
    number: "02",
    title: "CONNECT",
    description:
      "Bangun koneksi dengan player, team, dan komunitas dalam ekosistem esports.",
  },
  {
    number: "03",
    title: "CONQUER",
    description:
      "Naikkan level permainanmu, raih kemenangan, dan bangun reputasi sebagai competitor.",
  },
];

export default function About() {
  return (
    <section className={styles.about} aria-label="About Section">
      {/* Background & Atmospheric Visual Decorations */}
      <div className={styles.bgGlowPurple} aria-hidden="true" />
      <div className={styles.bgGlowPink} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgWatermark} aria-hidden="true">
        SEMESTA
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>The Esports Ecosystem</span>
          </div>
          <h2 className={styles.title}>
            One Platform. <br />
            <span className={styles.titleHighlight}>Every Competitor.</span>
          </h2>
        </header>

        {/* Main Content (Editorial Two-Column Layout) */}
        <div className={styles.mainContent}>
          <div className={styles.leftCol}>
            <h3 className={styles.statement}>
              More Than A Tournament. <br />
              <span className={styles.statementHighlight}>
                It&apos;s Your Arena.
              </span>
            </h3>
          </div>

          <div className={styles.rightCol}>
            <p className={styles.description}>
              Semesta Esports adalah platform tournament yang dirancang untuk
              mempertemukan para player, team, dan komunitas dalam satu ekosistem
              kompetitif yang lebih mudah, terstruktur, dan seru.
            </p>
            <p className={styles.description}>
              Dari menemukan tournament hingga bertanding dan membangun
              perjalanan kompetitif, Semesta Esports membantu setiap competitor
              menemukan arena mereka dan membuktikan kemampuan mereka.
            </p>
          </div>
        </div>

        {/* Visual Centerpiece: Abstract Esports Arena / Digital Universe */}
        <div className={styles.visualContainer} aria-hidden="true">
          <div className={styles.arenaFrame}>
            <div className={styles.arenaGrid} />
            <div className={styles.orbitRingOuter} />
            <div className={styles.orbitRingInner} />
            
            <div className={styles.arenaCore}>
              <div className={styles.coreGlow} />
              <div className={styles.corePulse} />
              <div className={styles.coreCenter} />
            </div>

            <div className={styles.nodePoint1} />
            <div className={styles.nodePoint2} />
            <div className={styles.nodePoint3} />
            <div className={styles.scanLine} />
          </div>
        </div>

        {/* Feature / Value Propositions Grid */}
        <div className={styles.featuresGrid}>
          {FEATURES.map((feature) => (
            <div key={feature.number} className={styles.featureCard}>
              <div className={styles.featureHeader}>
                <span className={styles.featureNumber}>{feature.number}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
              </div>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Statement / Manifesto */}
        <div className={styles.manifesto}>
          <p className={styles.manifestoText}>
            Your Game.{" "}
            <span className={styles.manifestoPurple}>Your Team.</span>{" "}
            <span className={styles.manifestoPink}>Your Moment.</span>
          </p>
        </div>
      </div>
    </section>
  );
}