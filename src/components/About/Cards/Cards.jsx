'use client'

import { Check } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Cards = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className='w-full mx-auto py-12 sm:py-16 md:py-20 lg:py-24 grid-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10'>
          {/* Philosophy Card */}
          {isMobile ? (
            <div className='bg-white/10 border border-white/20 lg:w-full rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-md hover:border-white/30 transition-all duration-300'>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8'>Our Philosophy</h3>
              <div className='space-y-4 sm:space-y-5'>
                <div className='text-sm sm:text-base md:text-lg text-white/90 flex items-start gap-3 sm:gap-4'>
                  <Check className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] shrink-0 mt-0.5' />
                  <span className='leading-relaxed'>Security should enable growth, not obstruct it.</span>
                </div>
                <div className='text-sm sm:text-base md:text-lg text-white/90 flex items-start gap-3 sm:gap-4'>
                  <Check className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] shrink-0 mt-0.5' />
                  <span className='leading-relaxed'>Communication should be direct and jargon-free.</span>
                </div>
                <div className='text-sm sm:text-base md:text-lg text-white/90 flex items-start gap-3 sm:gap-4'>
                  <Check className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] shrink-0 mt-0.5' />
                  <span className='leading-relaxed'>Results should be fast, tangible, and defensible.</span>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='bg-white/10 border border-white/20 lg:w-full rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-md hover:border-white/30 transition-all duration-300'
            >
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8'>Our Philosophy</h3>
              <div className='space-y-4 sm:space-y-5'>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className='text-sm sm:text-base md:text-lg text-white/90 flex items-start gap-3 sm:gap-4'
                >
                  <Check className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] shrink-0 mt-0.5' />
                  <span className='leading-relaxed'>Security should enable growth, not obstruct it.</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className='text-sm sm:text-base md:text-lg text-white/90 flex items-start gap-3 sm:gap-4'
                >
                  <Check className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] shrink-0 mt-0.5' />
                  <span className='leading-relaxed'>Communication should be direct and jargon-free.</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className='text-sm sm:text-base md:text-lg text-white/90 flex items-start gap-3 sm:gap-4'
                >
                  <Check className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] shrink-0 mt-0.5' />
                  <span className='leading-relaxed'>Results should be fast, tangible, and defensible.</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Why We Exist Card */}
          {isMobile ? (
            <div className='bg-[#0091a4] lg:w-full rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-[#0091a4] hover:shadow-xl transition-all duration-300'>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8'>Why We Exist</h3>
              <p className='text-sm sm:text-base md:text-lg text-black/90 leading-relaxed mb-6'>
                We saw too many startups overwhelmed by compliance, underwhelmed by overpriced consultants, and let down by cookie-cutter solutions. So we built something better.
              </p>
              <div className='w-16 h-1 bg-black/20 rounded-full'></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='bg-[#0091a4] lg:w-full rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-[#0091a4] hover:shadow-xl transition-all duration-300'
            >
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8'>Why We Exist</h3>
              <p className='text-sm sm:text-base md:text-lg text-black/90 leading-relaxed mb-6'>
                We saw too many startups overwhelmed by compliance, underwhelmed by overpriced consultants, and let down by cookie-cutter solutions. So we built something better.
              </p>
              <div className='w-16 h-1 bg-black/20 rounded-full'></div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cards
