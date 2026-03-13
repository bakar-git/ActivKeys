"use client"

import { TerminalCard } from "@/components/bento/terminal-card"
import { DitherCard } from "@/components/bento/dither-card"
import { MetricsCard } from "@/components/bento/metrics-card"
import { StatusCard } from "@/components/bento/status-card"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease },
  }),
}

const features = [
  {
    id: "validation",
    number: "01",
    title: "REAL_TIME_VALIDATION",
    description: "Instantly verify license key authenticity and status with sub-10ms response times. Every validation is logged for complete auditability.",
    benefit: "No delays. No guesswork. Just absolute certainty.",
  },
  {
    id: "tracking",
    number: "02",
    title: "ACTIVATION_TRACKING",
    description: "Track every key activation across your customer base. Monitor usage patterns, detect anomalies, and respond in real-time.",
    benefit: "Know exactly how your licenses are being used.",
  },
  {
    id: "security",
    number: "03",
    title: "ENTERPRISE_SECURITY",
    description: "Bank-grade encryption, role-based access control, and compliance-ready audit trails. Built for regulated industries.",
    benefit: "Security that meets the strictest standards.",
  },
  {
    id: "management",
    number: "04",
    title: "INVENTORY_MANAGEMENT",
    description: "Manage your entire key ecosystem from a single dashboard. Create, revoke, rotate, and monitor with surgical precision.",
    benefit: "Complete control over your key lifecycle.",
  },
  {
    id: "bulk",
    number: "05",
    title: "BULK_OPERATIONS",
    description: "Generate, activate, and revoke thousands of keys in seconds. Built for scale without sacrificing reliability.",
    benefit: "Efficiency at enterprise scale.",
  },
  {
    id: "history",
    number: "06",
    title: "HISTORICAL_TRACKING",
    description: "Complete audit logs with timestamped records of every action. Full compliance documentation at your fingertips.",
    benefit: "Full transparency. Complete accountability.",
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// SECTION: CORE_FEATURES"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">004</span>
      </motion.div>

      {/* Features Grid - 6 cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            custom={index}
            variants={cardVariants}
            className="border-2 border-foreground p-6 flex flex-col gap-4 bg-background hover:bg-muted/30 transition-colors duration-300"
          >
            {/* Number badge */}
            <div className="flex items-start justify-between">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
                {feature.number}
              </span>
              <Check size={16} className="text-primary" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h3 className="text-sm lg:text-base font-mono font-bold tracking-tight uppercase text-foreground">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-xs font-mono text-muted-foreground leading-relaxed flex-1">
              {feature.description}
            </p>

            {/* Benefit highlight */}
            <div className="pt-3 border-t border-border">
              <span className="text-xs font-mono text-primary italic">
                {feature.benefit}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* System Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground p-8 lg:p-12 mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What is ActivKeys */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {"// WHAT_IS_ACTIVKEYS"}
            </span>
            <h3 className="text-lg lg:text-xl font-mono font-bold tracking-tight uppercase">
              Enterprise Key Management Platform
            </h3>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              ActivKeys is the deterministic layer between your licensing model and your users. Purpose-built for SaaS platforms and ISVs who need bulletproof key management. Real-time validation. Complete audit trails. Zero compromises on security.
            </p>
          </div>

          {/* Who it&apos;s for */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {"// TARGET_AUDIENCE"}
            </span>
            <h3 className="text-lg lg:text-xl font-mono font-bold tracking-tight uppercase">
              Enterprise Teams. Independent Software Vendors. Scale-ups.
            </h3>
            <ul className="text-xs lg:text-sm font-mono text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Teams managing 100+ active keys across global user bases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Businesses requiring compliance and audit documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Organizations needing sub-10ms validation latency</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Interactive Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 border-2 border-foreground"
      >
        {/* Terminal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={cardVariants}
          className="border-b-2 md:border-b-0 md:border-r-2 border-foreground min-h-[280px]"
        >
          <TerminalCard />
        </motion.div>

        {/* Dither */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={cardVariants}
          className="border-b-2 md:border-b-0 border-foreground min-h-[280px]"
        >
          <DitherCard />
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={cardVariants}
          className="border-t-2 md:border-r-2 border-foreground min-h-[280px]"
        >
          <MetricsCard />
        </motion.div>

        {/* Status */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={cardVariants}
          className="border-t-2 border-foreground min-h-[280px]"
        >
          <StatusCard />
        </motion.div>
      </motion.div>
    </section>
  )
}
