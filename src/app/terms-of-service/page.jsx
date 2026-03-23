'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'

export default function TermsOfService() {
  const services = [
    'Penetration Testing (PenTest)',
    'Cloud Security Audits',
    'SOC 2 Compliance Assistance',
    'Vulnerability Management',
    'Incident Response Support'
  ]

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
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60">
            Services & Payment Terms
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8 sm:space-y-10"
        >
          {/* Services Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8">
              NordSecPro provides advanced cybersecurity services tailored to the US market, including but not limited to:
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mt-6 sm:mt-8">
              All services are delivered according to international security standards and industry best practices.
            </p>
          </div>

          {/* Payment Terms Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Payment Terms
            </h2>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                  <strong className="text-white">Currency:</strong> USD
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                  <strong className="text-white">Billing Model:</strong> Fixed-price or retainer-based, depending on project scope
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                  <strong className="text-white">Invoicing:</strong> Issued by IT SECTOR S.L., Marbella, Spain
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                  <strong className="text-white">Payment Methods:</strong> Bank transfer or secure online payment gateway
                </p>
              </div>
            </div>
          </div>

          {/* VAT Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              VAT (Tax Information)
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              For services provided to companies located outside the European Union (e.g., USA), invoices are issued without Spanish VAT (0% VAT). Each invoice will include the following note:
            </p>
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-black/50 border border-[#0091a4]/30 rounded-lg">
              <p className="text-xs sm:text-sm md:text-base text-white/90 italic leading-relaxed">
                "Operation exempt from VAT according to Spanish VAT Law for exports of services (Ley 37/1992, Articles 69 & 70)."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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

