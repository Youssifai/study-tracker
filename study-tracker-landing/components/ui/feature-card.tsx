"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className={cn(
          "relative overflow-hidden bg-purple-900/30 backdrop-blur-xl border-purple-500/20",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
          className
        )}
        {...props}
      >
        <CardContent className="p-6 relative">
          <div className="text-pink-500 mb-4">{icon}</div>
          <h3 className="text-lg font-bold text-purple-300 mb-2">{title}</h3>
          <p className="text-purple-200">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

