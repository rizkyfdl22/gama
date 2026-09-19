import Link from "next/link";
import styles from "./footer.module.css";

// Data-driven links
const exploreLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Games", href: "#games" },
  { label: "Collabs", href: "#collabs" },
  { label: "Features", href: "#features" },
];

const platformLinks = [
  { label: "Tournaments", href: "/tournament" }, // Placeholder for actual route
  { label: "Games", href: "#games" },
  { label: "Join Semesta", href: "/register" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/semestaesports" },
  { label: "TikTok", href: "https://tiktok.com/@semestaesports" },
  { label: "Discord", href: "https://discord.gg/semesta" },
  { label: "Email", href: "mailto:semestaesports@gmail.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Subtle Background Typography */}
      <div className={styles.bgText} aria-hidden="true">
        SEMESTA
      </div>

      <div className={styles.container}>
        {/* Footer Top CTA Area */}
        <div className={styles.cta}>
          <span className={styles.ctaTitle}>READY TO COMPETE?</span>
          <Link href="/register" className={styles.ctaLink}>
            JOIN SEMESTA <span>&rarr;</span>
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className={styles.mainGrid}>
          {/* Brand Area */}
          <div className={styles.brandArea}>
            <h2 className={styles.logo}>SEMESTA</h2>
            <div className={styles.tagline}>
              <span>YOUR GAME.</span>
              <span>YOUR TEAM.</span>
              <span>YOUR MOMENT.</span>
            </div>
            <p className={styles.description}>
              A tournament platform built for players, teams, organizers, and
              the competitive gaming community.
            </p>
          </div>

          {/* Navigation Area */}
          <div className={styles.navArea}>
            {/* Explore Group */}
            <div className={styles.navColumn}>
              <h3 className={styles.navTitle}>EXPLORE</h3>
              <nav aria-label="Explore Navigation">
                <ul className={styles.navList}>
                  {exploreLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={styles.navLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Platform Group */}
            <div className={styles.navColumn}>
              <h3 className={styles.navTitle}>PLATFORM</h3>
              <nav aria-label="Platform Navigation">
                <ul className={styles.navList}>
                  {platformLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={styles.navLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Connect Group */}
            <div className={styles.navColumn}>
              <h3 className={styles.navTitle}>CONNECT</h3>
              <nav aria-label="Social Navigation">
                <ul className={styles.navList}>
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={styles.navLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Bottom Utility */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} SEMESTA ESPORTS
          </p>
          <p className={styles.credit}>Develop by Suaka Creative</p>
          <a href="#home" className={styles.backToTop}>
            BACK TO TOP &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}