"use client";

import { motion } from "framer-motion";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: "GitHub", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>▲ Project Alpha</span>
          <span className={styles.copy}>
            &copy; {year} Project Alpha. All rights reserved.
          </span>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={styles.link}
              whileHover={{ color: "#FA3C00" }}
              transition={{ duration: 0.15 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className={styles.versionInfo}>
          <span className={styles.versionLabel}>Build</span>
          <span className={styles.versionValue}>0.1.0-alpha.42</span>
        </div>
      </div>
    </footer>
  );
}
