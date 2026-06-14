"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatusSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { label: "Concept", complete: true, date: "Jan 2026" },
  { label: "Prototype", complete: true, date: "Mar 2026" },
  { label: "Alpha", active: true, date: "Jun 2026" },
  { label: "Beta", complete: false, date: "Q3 2026" },
  { label: "Release", complete: false, date: "Q4 2026" },
];

const stats = [
  { value: "127", label: "Commits this month", icon: "⟩" },
  { value: "34", label: "Open issues", icon: "○" },
  { value: "12", label: "Contributors", icon: "◆" },
  { value: "89%", label: "Test coverage", icon: "■" },
];

export default function StatusSection() {
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!progressRef.current || !sectionRef.current) return;

    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    const statEls = sectionRef.current.querySelectorAll("[data-stat]");
    gsap.fromTo(
      statEls,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="status" className={`section ${styles.status}`} ref={sectionRef}>
      <div className="container">
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          Development status
        </motion.h2>

        {/* Timeline / Progress */}
        <div className={styles.timeline}>
          <div className={styles.trackBg}>
            <div
              className={styles.trackFill}
              ref={progressRef}
              style={{ transformOrigin: "left center" }}
            />
          </div>
          <div className={styles.milestones}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.label}
                className={`${styles.milestone} ${
                  m.complete
                    ? styles.complete
                    : m.active
                    ? styles.active
                    : styles.upcoming
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.3 + i * 0.1,
                }}
              >
                <div className={styles.markerOuter}>
                  <div className={styles.marker}>
                    {m.complete ? "✓" : m.active ? "▲" : ""}
                  </div>
                </div>
                <span className={styles.milestoneLabel}>{m.label}</span>
                <span className={styles.milestoneDate}>{m.date}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} data-stat className={styles.statCard}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
