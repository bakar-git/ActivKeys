"use client"

import { motion } from "framer-motion"
import { Cloud, Server, Code, Users } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const deploymentOptions = [
  {
    id: "cloud",
    icon: Cloud,
    title: "CLOUD_HOSTED",
    subtitle: "ActivKeys Cloud",
    description:
      "Zero infrastructure overhead. Instant deployment. Global edge locations. Sub-10ms validation worldwide.",
    features: ["99.99% Uptime SLA", "Auto-scaling", "Global CDN", "Automatic backups"],
    label: "RECOMMENDED",
  },
  {
    id: "vps",
    icon: Server,
    title: "SELF_HOSTED",
    subtitle: "Your VPS / On-Premise",
    description:
      "Full control over your infrastructure. Deploy on AWS, Azure, GCP, or your own servers. Complete data residency.",
    features: ["Complete control", "Data residency", "Custom configuration", "Your infrastructure"],
    label: "ENTERPRISE",
  },
  {
    id: "hybrid",
    icon: Code,
    title: "HYBRID_SETUP",
    subtitle: "Best of Both Worlds",
    description:
      "Combine cloud reliability with on-premise security. Flexible failover, redundancy, and custom topology.",
    features: ["Failover support", "Redundancy", "Custom topology", "Flexible routing"],
    label: "FLEXIBLE",
  },
  {
    id: "integration",
    icon: Users,
    title: "MANAGED_INTEGRATION",
    subtitle: "Our Expert Team Handles It",
    description:
      "Let our team integrate ActivKeys into your existing systems. API setup, middleware configuration, custom workflows.",
    features: ["Custom integration", "Expert support", "API optimization", "Workflow design"],
    label: "SUPPORT",
  },
]

export function FlexibilitySection() {
  return (
    <section id="security" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// SECTION: DEPLOYMENT_FLEXIBILITY"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">008</span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-12"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground mb-3">
          Deploy Your Way
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-2xl">
          One platform. Infinite flexibility. Whether you prefer cloud, on-premise, or hybrid—we've got you covered. Our team ensures seamless integration with your existing infrastructure.
        </p>
      </motion.div>

      {/* Deployment Options Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        {deploymentOptions.map((option, index) => {
          const Icon = option.icon
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease }}
              className={`border-2 p-6 lg:p-8 flex flex-col gap-4 transition-all duration-300 ${option.id === "cloud"
                  ? "border-primary bg-primary/5"
                  : "border-foreground hover:border-primary/50 hover:bg-muted/20"
                }`}
            >
              {/* Header with icon and label */}
              <div className="flex items-start justify-between">
                <Icon size={24} strokeWidth={1.5} className="text-foreground" />
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 border ${option.id === "cloud"
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground"
                    }`}
                >
                  {option.label}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xs lg:text-sm font-mono font-bold tracking-tight uppercase text-foreground">
                  {option.title}
                </h3>
                <p className="text-[10px] font-mono text-primary mt-1">{option.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-xs font-mono text-muted-foreground leading-relaxed flex-1">
                {option.description}
              </p>

              {/* Features */}
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  {option.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="text-primary text-xs mt-0.5">✓</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Why Flexibility Matters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="border-2 border-foreground p-6 lg:p-8 mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* No Vendor Lock-in */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm lg:text-base font-mono font-bold tracking-tight uppercase text-foreground">
              No Vendor Lock-In
            </h3>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              Your data. Your infrastructure. Your rules. Migrate anytime. Switch providers. We don't lock you in.
            </p>
          </div>

          {/* Regulatory Compliance */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm lg:text-base font-mono font-bold tracking-tight uppercase text-foreground">
              Regulatory Compliance
            </h3>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              GDPR, HIPAA, SOC 2. On-premise deployment ensures data residency for regulated industries.
            </p>
          </div>

          {/* Expert Integration */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm lg:text-base font-mono font-bold tracking-tight uppercase text-foreground">
              Expert Integration
            </h3>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              Our team doesn't just hand you an API. We integrate. We optimize. We make it work seamlessly.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Integration Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
        className="border-2 border-primary bg-primary/5 p-6 lg:p-8"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          <div className="flex-1">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-3 block">
              {"// SERVICE: INTEGRATION_SUPPORT"}
            </span>
            <h3 className="text-lg lg:text-xl font-mono font-bold tracking-tight uppercase text-foreground mb-3">
              Your Success Is Our Mission
            </h3>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed mb-4 lg:mb-0">
              Whether you're migrating from legacy systems, building custom workflows, or integrating with existing infrastructure—our team is here. We provide architecture consulting, API optimization, custom middleware development, and ongoing technical support. Let's build something great together.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 bg-foreground text-background px-6 py-3 text-xs font-mono tracking-widest uppercase whitespace-nowrap"
          >
            Schedule a Call
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
