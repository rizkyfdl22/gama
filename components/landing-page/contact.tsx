import React from "react";
import styles from "./contact.module.css";

const contacts = [
  {
    label: "GENERAL INQUIRIES",
    value: "semestaesports@gmail.com",
    href: "mailto:semestaesports@gmail.com",
  },
  {
    label: "PARTNERSHIP",
    value: "semestaesports@gmail.com",
    href: "mailto:semestaesports@gmail.com",
  },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "DISCORD", href: "#" },
  { label: "TIKTOK", href: "#" },
  { label: "YOUTUBE", href: "#" },
];

export default function ContactSection() {
  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      {/* Background Arena Visuals (CSS Only) */}
      <div className={styles.arenaVisuals} aria-hidden="true">
        {/* Giant typography background */}
        <div className={styles.giantText}>SEMESTA</div>
        
        {/* Digital Portal / Energy Core */}
        <div className={styles.portal}>
          <div className={styles.coreGlow} />
          <div className={styles.ring} data-layer="1" />
          <div className={styles.ring} data-layer="2" />
          <div className={styles.ring} data-layer="3" />
          <div className={styles.ring} data-layer="4" />
        </div>

        {/* Perspective Grid Floor */}
        <div className={styles.gridFloor} />
      </div>

      <div className={styles.container}>
        {/* Main Content Area */}
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              YOUR NEXT MOVE
            </p>
            <h2 id="contact-heading" className={styles.heading}>
              <span className={styles.headingWhite}>READY TO</span>
              <br />
              <span className={styles.headingAccent}>ENTER THE ARENA?</span>
            </h2>
            <p className={styles.description}>
              Siap membawa permainanmu ke level berikutnya? Bergabung dengan Semesta Esports dan temukan arena, komunitas, dan kesempatan untuk bertanding.
            </p>
          </header>

          {/* Call to Action Group */}
          <div className={styles.ctaGroup}>
            <a href="#" className={styles.primaryCta}>
              MULAI BERTANDING
              <span className={styles.ctaGlow} aria-hidden="true" />
            </a>
            <a href="#" className={styles.secondaryCta}>
              JADI ORGANIZER
            </a>
          </div>
        </div>

        {/* Contact Information & Socials Grid */}
        <div className={styles.bottomGrid}>
          <div className={styles.infoGroup}>
            {contacts.map((contact, index) => (
              <div key={index} className={styles.infoItem}>
                <p className={styles.infoLabel}>{contact.label}</p>
                <a href={contact.href} className={styles.infoLink}>
                  {contact.value}
                </a>
              </div>
            ))}
          </div>

          <nav className={styles.socialNav} aria-label="Social Media">
            <ul className={styles.socialList}>
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a href={social.href} className={styles.socialLink}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Final Closing Statement */}
        <div className={styles.closingStatement}>
          <span aria-hidden="true">///</span> SEE YOU IN THE ARENA. <span aria-hidden="true">///</span>
        </div>
      </div>
    </section>
  );
}