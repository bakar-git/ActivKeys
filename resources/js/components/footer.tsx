"use client"

import { Key } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Deploy", href: "#security" },
  { label: "Sign In", href: "/app" },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="w-full border-t-2 border-foreground px-6 py-10 lg:px-12"
    >
      <div className="flex flex-col gap-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3">
            <Key size={14} strokeWidth={1.5} />
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold text-foreground">
              ActivKeys
            </span>
          </a>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6">
            {FOOTER_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease }}
                className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border pt-6">
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
            {"© 2026 ACTIVKEYS INC. — ENTERPRISE KEY MANAGEMENT PLATFORM."}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
            {"BUILT WITH SECURITY-FIRST PRINCIPLES."}
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
