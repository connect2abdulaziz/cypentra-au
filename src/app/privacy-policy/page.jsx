'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black grid-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60">
            Transparency & Confidentiality
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              At <strong className="text-white">NordSecPro (IT SECTOR S.L.)</strong>, we are committed to full transparency and the protection of all client information. Our cybersecurity projects are executed exclusively by in-house senior developers, each of whom has signed a strict confidentiality and disclosure agreement with IT SECTOR S.L.
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              For every project, a dedicated project leader is assigned. This individual will serve as the direct point of contact with the client, maintaining regular communication during US business hours to ensure seamless collaboration and trust.
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              We handle all client data securely and in compliance with international data protection standards. No client information is shared with third parties without prior written consent.
            </p>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-xs sm:text-sm text-white/40">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

