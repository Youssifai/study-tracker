"use client"

import { Clock, Users, BookOpen, Target, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { AnimatedText } from "@/components/ui/animated-text"
import { FeatureCard } from "@/components/ui/feature-card"
import { Spotlight } from "@/components/ui/spotlight"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <AnimatedText
              text="Transform Your Study Habits"
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            />
            <AnimatedText
              text="Track progress, collaborate with peers, and achieve your academic goals with our intelligent study companion."
              className="max-w-[700px] text-purple-200 text-lg md:text-xl"
            />
            <div className="flex gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-xl" />
            <div className="glass-card rounded-xl p-4">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="StudyTracker Dashboard Preview"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="Powerful Features for Better Learning"
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
            />
            <p className="text-purple-200 md:text-lg max-w-[700px] mx-auto">
              Everything you need to excel in your studies, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "Smart Study Timer",
                description: "Track and optimize your study sessions with AI-powered insights",
              },
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Collaborative Groups",
                description: "Study together, share resources, and stay motivated",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-purple-400" />,
                title: "Course Management",
                description: "Organize your courses, assignments, and deadlines",
              },
              {
                icon: <Target className="h-8 w-8 text-purple-400" />,
                title: "Progress Analytics",
                description: "Visualize your progress with detailed analytics",
              },
            ].map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <AnimatedText
              text="Start Your Journey"
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
            />
            <p className="text-purple-200 md:text-lg max-w-[700px] mx-auto">
              Get started in minutes and transform your study habits forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up and set your study goals",
              },
              {
                step: "02",
                title: "Join Groups",
                description: "Connect with study partners",
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Monitor your improvements",
              },
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 rounded-xl relative group bg-purple-900/30">
                <Spotlight />
                <div className="text-pink-500 text-4xl font-bold mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-2 text-purple-300">{step.title}</h3>
                <p className="text-purple-200">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <div className="glass-card p-8 md:p-12 rounded-xl text-center max-w-3xl mx-auto bg-purple-900/30">
            <Spotlight />
            <AnimatedText
              text="Ready to Transform Your Study Habits?"
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
            />
            <p className="text-purple-200 md:text-lg mb-8 max-w-[600px] mx-auto">
              Join thousands of students who are already achieving their academic goals with StudyTracker.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-purple-200">© 2024 StudyTracker. All rights reserved.</p>
            <nav className="flex gap-4">
              <a href="#" className="text-purple-200 hover:text-white">Terms</a>
              <a href="#" className="text-purple-200 hover:text-white">Privacy</a>
              <a href="#" className="text-purple-200 hover:text-white">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

