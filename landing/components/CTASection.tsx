"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CTASection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector("[data-cta-card]"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className={`section ${styles.cta}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.card} data-cta-card>
          <div className={styles.cardContent}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              Shape what comes next
            </motion.h2>

            <motion.p
              className={styles.desc}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.1,
              }}
            >
              Early access means direct influence. Report bugs, request features,
              break things. We read every message.
            </motion.p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.inputWrap}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                      aria-label="Email address for early access"
                      id="cta-email-input"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="skeu-btn-primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "tween", duration: 0.12 }}
                    id="cta-submit-btn"
                  >
                    Request Access
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span className={styles.successIcon}>✓</span>
                  <span>
                    You&apos;re on the list. We&apos;ll be in touch when the next build ships.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className={styles.disclaimer}>
              No spam. Unsubscribe anytime. We only email about major milestones.
            </p>
          </div>

          {/* Decorative glow */}
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
