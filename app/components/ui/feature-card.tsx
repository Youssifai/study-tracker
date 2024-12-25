"use client"

import { motion } from "framer-motion"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description, className = "", ...props }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div 
        className={`relative overflow-hidden bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-transparent 
          before:opacity-0 hover:before:opacity-100 before:transition-opacity ${className}`}
        {...props}
      >
        <div className="p-6 relative">
          <div className="text-blue-500 mb-4">{icon}</div>
          <h3 className="text-lg font-bold text-blue-300 mb-2">{title}</h3>
          <p className="text-blue-200">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
