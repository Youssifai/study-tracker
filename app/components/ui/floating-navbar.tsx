"use client"

import { motion } from "framer-motion"

export function FloatingNav() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 inset-x-4 max-w-2xl mx-auto z-50 rounded-full border border-blue-500/20 bg-[#020817]/60 backdrop-blur-xl flex items-center justify-between p-4"
    >
      <span className="text-blue-500 font-bold">StudyTracker</span>
      <nav className="flex items-center gap-4">
        <a href="#features" className="text-sm text-white/70 hover:text-white">Features</a>
        <a href="#how-it-works" className="text-sm text-white/70 hover:text-white">How it Works</a>
      </nav>
    </motion.div>
  )
}
