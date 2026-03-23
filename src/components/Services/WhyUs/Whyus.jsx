'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Award, Clock, CheckCircle } from 'lucide-react'

const Whyus = () => {
  const benefits = [
    {
      number: '01',
      title: 'Expert Team',
      description: 'Industry-certified professionals with years of experience',
      icon: Award
    },
    {
      number: '02',
      title: 'Proven Track Record',
      description: '500+ security assessments done',
      icon: Shield
    },
    {
      number: '03',
      title: 'Compliance Ready',
      description: 'SOC 2, ISO 27001, and GDPR compliant solutions',
      icon: CheckCircle
    },
    {
      number: '04',
      title: '24/7 Support',
      description: 'Round-the-clock monitoring and incident response',
      icon: Clock
    }
  ]

  return (
    <section className='w-full grid-background py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-[#0091a4]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-[#0091a4]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center'>
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='lg:col-span-7'
          >
            {/* Badge */}
            <div className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 rounded-full'>
              Why Choose Us
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight'>
              Trusted by <span className='text-[#0091a4]'>Leading Businesses</span>
            </h2>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl'>
              We combine expertise, technology, and dedication to deliver unparalleled security solutions
            </p>

            {/* Benefits Grid - 2x2 */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className='group relative'
                  >
                    {/* Glow effect */}
                    <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0091a4] via-white to-[#0091a4] opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition duration-500'></div>

                    <div className='relative bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-sm hover:bg-white/10 hover:border-[#0091a4]/50 transition-all duration-300 h-full'>
                      {/* Icon */}
                      <div className='mb-3 sm:mb-4'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#0091a4]/20 border border-[#0091a4]/30 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[#0091a4]/30 group-hover:scale-110 transition-all duration-300'>
                          <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#0091a4]' />
                        </div>
                      </div>

                      {/* Number */}
                      <div className='mb-2 sm:mb-3'>
                        <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0091a4]/20 leading-none'>
                          {benefit.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight'>
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className='text-xs sm:text-sm md:text-base text-white/70 leading-relaxed'>
                        {benefit.description}
                      </p>

                      {/* Accent line */}
                      <div className='mt-4 sm:mt-5 w-12 h-0.5 bg-gradient-to-r from-[#0091a4] to-transparent rounded-full group-hover:w-20 transition-all duration-300'></div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Section - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='lg:col-span-5 relative'
          >
            <div className='relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full rounded-xl sm:rounded-2xl overflow-hidden group'>
              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-[#0091a4]/20 via-transparent to-transparent z-10 group-hover:from-[#0091a4]/30 transition-all duration-300'></div>

              {/* Border glow */}
              <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0091a4] via-transparent to-[#0091a4] opacity-0 group-hover:opacity-50 rounded-xl sm:rounded-2xl blur-xl transition duration-500'></div>

              {/* Image */}
              <div className='relative w-full h-full'>
                <Image
                  src='/Server 1.png'
                  alt='Security Server'
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-700'
                  priority
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>

              {/* Decorative elements */}
              <div className='absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-[#0091a4]/20 rounded-full blur-2xl z-0'></div>
              <div className='absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 bg-[#0091a4]/20 rounded-full blur-xl z-0'></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Whyus