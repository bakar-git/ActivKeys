"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const CAPABILITIES = [
  "VALIDATION",
  "ACTIVATION",
  "TRACKING",
  "SECURITY",
  "LICENSING",
  "COMPLIANCE",
  "AUDIT_LOG",
  "REAL_TIME",
  "SCALABLE",
  "RELIABLE",
]

function LogoBlock({ name, glitch }: { name: string; glitch: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-8 py-4 border-r-2 border-foreground shrink-0 ${glitch ? "animate-glitch" : ""
        }`}
    >
      <span className="text-sm font-mono tracking-[0.15em] uppercase text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function GlitchMarquee() {
  const glitchIndices = [2, 6]

  return (
    <section className="w-full py-16 px-6 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// FEATURES: CORE_CAPABILITIES"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">009</span>
      </motion.div>

      {/* Final CTA block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground p-8 lg:p-12 mb-10"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground">
              Ready to take control of your keys?
            </h2>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Start your 30-day free trial today. No credit card required. Enterprise-grade key management in minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <motion.a
              href="/app"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-widest uppercase"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-primary">
                <ArrowRight size={14} strokeWidth={2} className="text-background" />
              </span>
              <span className="px-4 py-2.5">Start Free Trial</span>
            </motion.a>
            <a
              href="#pricing"
              className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              View pricing →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden border-2 border-foreground"
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...CAPABILITIES, ...CAPABILITIES].map((name, i) => (
            <LogoBlock
              key={`${name}-${i}`}
              name={name}
              glitch={glitchIndices.includes(i % CAPABILITIES.length)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
