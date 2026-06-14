"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroSection.module.css";

interface SimulationStep {
  text: string;
  type: "info" | "success" | "warning";
}

const simulations: Record<
  string,
  {
    prompt: string;
    steps: SimulationStep[];
    result: string;
  }
> = {
  sentiment: {
    prompt: "Saya sangat senang belajar dasar kecerdasan buatan hari ini!",
    steps: [
      { text: "Membaca teks input...", type: "info" },
      { text: "Mengekstrak emosi: 'sangat senang', 'belajar'", type: "success" },
      { text: "Menghubungkan ke model klasifikasi sentimen...", type: "info" },
      { text: "Skor emosi: 98% Positif", type: "success" },
    ],
    result: "😊 Sentimen: Sangat Positif",
  },
  summarize: {
    prompt: "Artificial Intelligence adalah simulasi kecerdasan manusia oleh mesin komputer untuk memecahkan masalah kompleks secara efisien.",
    steps: [
      { text: "Menganalisis panjang kalimat...", type: "info" },
      { text: "Menemukan subjek utama: 'Artificial Intelligence'", type: "success" },
      { text: "Menghapus kata penghubung sekunder...", type: "info" },
      { text: "Menyusun ringkasan 1 kalimat...", type: "success" },
    ],
    result: "📝 Ringkasan: AI adalah kecerdasan buatan komputer untuk memecahkan masalah.",
  },
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"sentiment" | "summarize" | null>(null);
  const [currentSteps, setCurrentSteps] = useState<SimulationStep[]>([]);
  const [simResult, setSimResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const startSimulation = (type: "sentiment" | "summarize") => {
    // Clear any active timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setActiveTab(type);
    setCurrentSteps([]);
    setSimResult(null);
    setIsSimulating(true);

    const sim = simulations[type];
    
    // Animate steps one by one
    sim.steps.forEach((step, index) => {
      const t = setTimeout(() => {
        setCurrentSteps((prev) => [...prev, step]);
        if (index === sim.steps.length - 1) {
          const resTimeout = setTimeout(() => {
            setSimResult(sim.result);
            setIsSimulating(false);
          }, 600);
          timeoutsRef.current.push(resTimeout);
        }
      }, (index + 1) * 800);
      timeoutsRef.current.push(t);
    });
  };

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.content}>
          <motion.div
            className={styles.versionPill}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          >
            <span className={styles.statusDot} />
            <span className={styles.pillText}>Dalam Pengembangan Aktif</span>
            <span className="skeu-badge" style={{ marginLeft: 8 }}>
              Tahap Alpha
            </span>
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
          >
            Belajar AI,
            <br />
            Dibuat <span className={styles.highlight}>Sederhana</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.75 }}
          >
            Project Alpha adalah ruang uji coba interaktif untuk memahami konsep dasar
            kecerdasan buatan secara visual. Didesain khusus untuk mahasiswa non-IT
            agar bisa bereksperimen langsung tanpa pusing dengan baris kode.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 1 }}
          >
            <motion.a
              href="#cta"
              className="skeu-btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.12 }}
            >
              Mulai Akses Awal
            </motion.a>
            <motion.a
              href="#features"
              className="skeu-btn-ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.12 }}
            >
              Pelajari Fitur Utama
            </motion.a>
          </motion.div>
        </div>

        {/* Interactive AI Simulator Box */}
        <motion.div
          className={styles.terminalWrapper}
          initial={{ opacity: 0, y: 40, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.9 }}
        >
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={styles.dot} data-color="red" />
              <span className={styles.dot} data-color="yellow" />
              <span className={styles.dot} data-color="green" />
              <span className={styles.terminalTitle}>ai-playground v0.1</span>
            </div>
            
            <div className={styles.playgroundHeader}>
              <span className={styles.selectorLabel}>Pilih Simulasi AI:</span>
              <div className={styles.selectorButtons}>
                <button
                  type="button"
                  className={`${styles.simButton} ${
                    activeTab === "sentiment" ? styles.simButtonActive : ""
                  }`}
                  onClick={() => startSimulation("sentiment")}
                  disabled={isSimulating}
                >
                  😊 Deteksi Sentimen
                </button>
                <button
                  type="button"
                  className={`${styles.simButton} ${
                    activeTab === "summarize" ? styles.simButtonActive : ""
                  }`}
                  onClick={() => startSimulation("summarize")}
                  disabled={isSimulating}
                >
                  📝 Ringkas Teks
                </button>
              </div>
            </div>

            <div className={styles.terminalBody}>
              {activeTab === null ? (
                <div className={styles.idleMessage}>
                  <p>Klik salah satu simulasi di atas untuk melihat bagaimana AI memproses input secara real-time.</p>
                  <div className={styles.promptLine}>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.cursor}>_</span>
                  </div>
                </div>
              ) : (
                <div className={styles.simulationContent}>
                  <div className={styles.simPromptRow}>
                    <span className={styles.prompt}>Input:</span>
                    <span className={styles.promptText}>&quot;{simulations[activeTab].prompt}&quot;</span>
                  </div>
                  
                  <div className={styles.stepsContainer}>
                    {currentSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        className={styles.termLine}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.type === "success" && <span className={styles.termSuccess}>✓</span>}
                        {step.type === "warning" && <span className={styles.termWarning}>⚠</span>}
                        {step.type === "info" && <span className={styles.prompt}>⟨i⟩</span>}
                        <span>{step.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {simResult && (
                      <motion.div
                        className={styles.resultBox}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.resultTitle}>Hasil Prediksi AI:</div>
                        <div className={styles.resultText}>{simResult}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.glowOrb} aria-hidden="true" />
    </section>
  );
}
