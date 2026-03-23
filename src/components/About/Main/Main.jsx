'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Main = () => {
  return (
    <div className='w-full grid-background relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-8 sm:mb-10 md:mb-12'
        >
        </motion.div>

        <div className='relative'>
          <div className='hidden md:block absolute -left-20 top-0 w-1 h-full bg-gradient-to-b from-[#0091a4] via-[#0091a4] to-transparent'></div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8'>
              We are a <span className='text-[#0091a4]'>cybersecurity firm</span> built for the speed, scale, and sensitivity of modern SaaS businesses.
            </h3>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-5xl leading-relaxed'>
              Founded by Scandinavian engineers and operating on U.S. time zones, we deliver high-caliber, hands-on security services without the noise or overhead.
            </p>
          </motion.div>

          {/* Stats Grid - Clean Design */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20'
          >
            {[
              { value: '500+', label: 'Businesses Protected' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Monitoring' },
              { value: '50+', label: 'Countries Served' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className='bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300'
              >
                <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2'>{stat.value}</div>
                <div className='text-xs sm:text-sm text-white/70'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Main
