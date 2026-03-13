"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Database, BarChart3, Key, FileText } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    number: "01",
    title: "SIGN_UP",
    description: "Create your ActivKeys account in seconds. Enterprise-grade security from day one.",
    icon: Shield,
  },
  {
    number: "02",
    title: "ADD_KEYS",
    description: "Generate, import, or upload your license keys in bulk. Our API handles everything.",
    icon: Key,
  },
  {
    number: "03",
    title: "VIEW_KEY_TYPES",
    description: "Instantly see Volume licenses, MAK (Multiple Activation Key), or individual keys.",
    icon: Database,
  },
  {
    number: "04",
    title: "KEY_PRODUCT_INFO",
    description: "Complete metadata: Microsoft Windows 11 24H2, Office 365, Exchange Server, etc.",
    icon: FileText,
  },
  {
    number: "05",
    title: "TRACK_ACTIVATIONS",
    description: "Monitor remaining MAK count, activation status, and usage in real-time.",
    icon: BarChart3,
  },
]

export function ProcessSection() {
  return (
    <section id="how-it-works" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// SECTION: PROCESS_FLOW"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">007</span>
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
          From Sign-Up to Live
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-2xl">
          Five simple steps to get your entire key ecosystem under management. From initial setup to real-time monitoring of activations.
        </p>
      </motion.div>

      {/* Process Flow - Desktop */}
      <div className="hidden lg:block mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="border-2 border-foreground"
        >
          {/* Timeline visualization */}
          <div className="relative">
            {/* Background line — top-12 centres on the circles (p-6 padding + half of w-12) */}
            <div className="absolute top-12 left-0 right-0 h-px bg-border" />

            {/* Steps */}
            <div className="grid grid-cols-5 gap-0 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease }}
                    className="border-r-2 border-foreground last:border-r-0 p-6 flex flex-col items-center text-center"
                  >
                    {/* Circle number */}
                    <div className="w-12 h-12 rounded-full border-2 border-foreground bg-background flex items-center justify-center mb-4 relative z-20">
                      <span className="text-xs font-mono font-bold text-primary">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-foreground mb-3"
                    />

                    {/* Title */}
                    <h3 className="text-xs font-mono font-bold tracking-tight uppercase text-foreground mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Process Flow - Mobile */}
      <div className="lg:hidden space-y-4 mb-12">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease }}
              className="border-2 border-foreground p-4 flex gap-4"
            >
              {/* Number circle */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-primary">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <Icon size={16} strokeWidth={2} className="text-foreground mt-0.5 flex-shrink-0" />
                  <h3 className="text-xs font-mono font-bold tracking-tight uppercase text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Key Management Data Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="border-2 border-foreground p-6 lg:p-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-4 block">
          {"// EXAMPLE: KEY_INVENTORY"}
        </span>

        {/* Data table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground pb-3">
                  Product
                </th>
                <th className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground pb-3">
                  Key Type
                </th>
                <th className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground pb-3">
                  Total Keys
                </th>
                <th className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground pb-3">
                  Remaining (MAK)
                </th>
                <th className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground pb-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  product: "Windows 11 Enterprise",
                  version: "24H2",
                  type: "MAK",
                  total: "500",
                  remaining: "342",
                  status: "ACTIVE",
                },
                {
                  product: "Microsoft Office",
                  version: "365",
                  type: "Volume",
                  total: "250",
                  remaining: "187",
                  status: "ACTIVE",
                },
                {
                  product: "Exchange Server",
                  version: "2019",
                  type: "Volume",
                  total: "50",
                  remaining: "45",
                  status: "ACTIVE",
                },
                {
                  product: "Windows Server",
                  version: "2022",
                  type: "MAK",
                  total: "100",
                  remaining: "28",
                  status: "WARNING",
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="text-xs font-mono text-foreground py-3">
                    {row.product}
                    <span className="text-muted-foreground ml-1">({row.version})</span>
                  </td>
                  <td className="text-xs font-mono text-foreground py-3">{row.type}</td>
                  <td className="text-xs font-mono text-foreground py-3">{row.total}</td>
                  <td className="text-xs font-mono text-primary py-3 font-bold">
                    {row.remaining}
                  </td>
                  <td className="text-xs font-mono py-3">
                    <span
                      className={`px-2 py-1 border text-[10px] tracking-widest uppercase ${row.status === "ACTIVE"
                        ? "border-primary text-primary"
                        : "border-yellow-600 text-yellow-600"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  )
}
