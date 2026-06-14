"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeaturesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "⚡",
    title: "Instant Feedback Loop",
    description:
      "See changes reflected in real-time. No rebuild, no refresh. Your flow stays unbroken while the engine handles the rest.",
    status: "Working",
  },
  {
    icon: "🔌",
    title: "Plugin Architecture",
    description:
      "Extend functionality through a simple plugin API. Drop in modules, connect services, and compose your own toolchain.",
    status: "Experimental",
  },
  {
    icon: "🛡️",
    title: "Built-in Guardrails",
    description:
      "Validation, error boundaries, and safe defaults baked into the core. Fail gracefully instead of catastrophically.",
    status: "In Progress",
  },
];

const statusColors: Record<string, string> = {
  Working: "var(--color-success)",
  Experimental: "var(--color-warning)",
  "In Progress": "var(--color-secondary)",
};

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll("[data-feature-card]");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="features" className={`section ${styles.features}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            What we&apos;re building
          </motion.h2>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          >
            Three core capabilities in active development. Some stable, some rough
            around the edges. All intentional.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              data-feature-card
              className={styles.card}
              whileHover={{ y: -4 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{feature.icon}</span>
                </div>
                <div className={styles.statusBadge}>
                  <span
                    className={styles.statusDot}
                    style={{ background: statusColors[feature.status] }}
                  />
                  <span
                    className={styles.statusLabel}
                    style={{ color: statusColors[feature.status] }}
                  >
                    {feature.status}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
