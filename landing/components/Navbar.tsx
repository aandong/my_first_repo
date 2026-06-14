"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Navbar.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Status", href: "#status" },
    { label: "Access", href: "#cta" },
  ];

  return (
    <motion.nav
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ opacity: 0 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }}
    >
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>▲</span>
          <span className={styles.logoText}>Project Alpha</span>
          <span className="skeu-badge">Alpha v0.1</span>
        </a>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                className={styles.navLink}
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ type: "tween", duration: 0.15 }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#cta"
          className={`skeu-btn-primary ${styles.navCta}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "tween", duration: 0.15 }}
        >
          Get Early Access
        </motion.a>
      </div>
    </motion.nav>
  );
}
