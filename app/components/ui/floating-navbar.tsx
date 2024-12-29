"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/app/providers/theme-provider"

export function FloatingNav() {
  const { theme } = useTheme()

  const navColors = {
    'blue-dark': {
      border: 'border-[rgb(107,140,251)]/20',
      text: 'text-[rgb(107,140,251)]'
    },
    'pink-dark': {
      border: 'border-purple-500/20',
      text: 'text-purple-500'
    },
    default: {
      border: 'border-blue-500/20',
      text: 'text-blue-500'
    }
  }

  const { border, text } = navColors[theme] || navColors.default

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-4 inset-x-4 max-w-2xl mx-auto z-50 rounded-full border ${border} bg-[#020817]/60 backdrop-blur-xl flex items-center justify-between p-4`}
    >
      <span className={`${text} font-bold`}>StudyTracker</span>
      <nav className="flex items-center gap-4">
        <a href="#features" className="text-sm text-white/70 hover:text-white">Features</a>
        <a href="#how-it-works" className="text-sm text-white/70 hover:text-white">How it Works</a>
      </nav>
    </motion.div>
  )
}
