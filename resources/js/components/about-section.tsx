"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

/* ── scramble text reveal ── */
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./:"

  useEffect(() => {
    if (!inView) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      iteration += 0.5
      if (iteration >= text.length) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [inView, text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

/* ── blinking cursor ── */
function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-primary animate-blink" />
}

/* ── live uptime counter ── */
function UptimeCounter() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const base = 31536000 + Math.floor(Math.random() * 1000000)
    setSeconds(base)
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const format = (n: number) => {
    const d = Math.floor(n / 86400)
    const h = Math.floor((n % 86400) / 3600)
    const m = Math.floor((n % 3600) / 60)
    const s = n % 60
    return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
  }

  return (
    <span className="font-mono text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(seconds)}
    </span>
  )
}

/* ── stat block ── */
const STATS = [
  { label: "KEYS_VALIDATED", value: "2.3M" },
  { label: "VALIDATION_ACCURACY", value: "99.9%" },
  { label: "SYSTEM_UPTIME", value: "99.97%" },
  { label: "ENTERPRISES", value: "500+" },
]

function StatBlock({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease }}
      className="flex flex-col gap-1 border-2 border-foreground px-4 py-3"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        {label}
      </span>
      <span className="text-xl lg:text-2xl font-mono font-bold tracking-tight">
        <ScrambleText text={value} />
      </span>
    </motion.div>
  )
}

/* ── main about section ── */
export function AboutSection() {
  return (
    <section id="about" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: ABOUT_ACTIVKEYS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          005
        </span>
      </motion.div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-0 border-2 border-foreground">
        {/* Left: API Code Preview */}
        <motion.div
          initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] border-b-2 lg:border-b-0 lg:border-r-2 border-foreground overflow-hidden bg-foreground flex flex-col"
        >
          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-background/20 shrink-0">
            <span className="h-2 w-2 bg-primary rounded-full" />
            <span className="h-2 w-2 bg-background/40 rounded-full" />
            <span className="h-2 w-2 border border-background/20 rounded-full" />
            <span className="ml-auto text-[10px] tracking-widest text-background/50 uppercase font-mono">
              api.activkeys.io / v1 / validate
            </span>
          </div>

          {/* Code content */}
          <div className="flex-1 p-5 lg:p-6 font-mono text-xs leading-relaxed overflow-auto">
            <p className="text-background/40 mb-3">{"// POST /api/v1/keys/validate"}</p>
            <p className="text-background/60">{"{"}</p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"key"</span>
              {": "}
              <span className="text-background/80">"XXXX-YYYY-ZZZZ-AAAA"</span>
              {","}
            </p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"product_id"</span>
              {": "}
              <span className="text-background/80">"win11-enterprise-24h2"</span>
              {","}
            </p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"machine_id"</span>
              {": "}
              <span className="text-background/80">"abc123def456"</span>
            </p>
            <p className="text-background/60">{"}"}</p>

            <div className="my-5 border-t border-background/10" />

            <p className="text-background/40 mb-3">{"// 200 OK — response"}</p>
            <p className="text-background/60">{"{"}</p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"status"</span>
              {": "}
              <span className="text-green-400">"VALID"</span>
              {","}
            </p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"remaining_activations"</span>
              {": "}
              <span className="text-background/80">342</span>
              {","}
            </p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"response_time_ms"</span>
              {": "}
              <span className="text-background/80">8</span>
              {","}
            </p>
            <p className="text-background/60 pl-4">
              <span className="text-primary">"audit_id"</span>
              {": "}
              <span className="text-background/80">"audit_7f3a..."</span>
            </p>
            <p className="text-background/60">{"}"}</p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t-2 border-background/20 shrink-0">
            <span className="text-[10px] tracking-[0.2em] uppercase text-background/40 font-mono">
              {"< 10ms"}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-mono">
              RESPONSE: VALID
            </span>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-col w-full lg:w-1/2"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              ACTIVKEYS.md
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              v2.0.0
            </span>
          </div>

          {/* Content body */}
          <div className="flex-1 flex flex-col justify-between px-5 py-6 lg:py-8">
            <div className="flex flex-col gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance"
              >
                Enterprise key management
                <br />
                <span className="text-primary">purpose-built</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: 0.3, duration: 0.5, ease }}
                className="flex flex-col gap-4"
              >
                <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                  We built the platform that validates, tracks, and manages license
                  keys at enterprise scale. Real-time verification, audit trails,
                  and instant activation. Security-first, performance-obsessed, and
                  designed for compliance from the ground up.
                </p>
                <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                  Trusted by 500+ enterprises worldwide. From SaaS platforms to
                  ISVs, ActivKeys powers the infrastructure behind digital licensing.
                  Zero downtime. Maximum transparency. Absolute security.
                </p>
              </motion.div>

              {/* Uptime line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease }}
                style={{ transformOrigin: "left" }}
                className="flex items-center gap-3 py-3 border-t-2 border-b-2 border-foreground"
              >
                <span className="h-1.5 w-1.5 bg-primary" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                  UPTIME:
                </span>
                <UptimeCounter />
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-0 mt-6">
              {STATS.map((stat, i) => (
                <StatBlock key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
