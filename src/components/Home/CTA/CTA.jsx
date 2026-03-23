'use client'
import React from 'react'
import { ArrowUpRight, CheckCircle } from 'lucide-react'

const CTA = () => {
  const benefits = [
    { text: 'SOC 2 Ready in weeks, not months' },
    { text: 'Continuous compliance management' },
    { text: 'Enterprise-grade security' }
  ]

  return (
    <section className='w-full grid-background py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center'>
          {/* Left Column - Content */}
          <div className='space-y-6 sm:space-y-8'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-full w-fit'>
              <span className='text-xs sm:text-sm font-bold text-[#0091a4] uppercase tracking-wider'>Get Started</span>
            </div>

            {/* Headline */}
            <div className='space-y-3 sm:space-y-4'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                Ready to secure your <span className='text-[#0091a4]'>core systems?</span>
              </h2>
              <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg'>
                Whether you need a starting point or continuous oversight, we'll help you reach compliance and confidence.
              </p>
            </div>

            {/* Benefits */}
            <div className='space-y-2 sm:space-y-3 pt-2 sm:pt-4'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 sm:gap-3'
                >
                  <CheckCircle className='w-4 sm:w-5 h-4 sm:h-5 text-[#0091a4] shrink-0' />
                  <span className='text-xs sm:text-sm md:text-base text-white/80'>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4'>
              <button
                onClick={() => window.location.href = '/cypentra-consultation'}
                className='inline-flex items-center justify-center gap-2 bg-[#0091a4] text-black px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-white transition-all'
              >
                <span>Book Free Review</span>
                <ArrowUpRight className='w-4 sm:w-5 h-4 sm:h-5' />
              </button>

              <button
                onClick={() => window.location.href = '/packages'}
                className='inline-flex items-center justify-center gap-2 bg-white/10 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-base lg:text-lg border border-white/20 hover:bg-white/20 transition-all'
              >
                <span>Explore Packages</span>
                <ArrowUpRight className='w-4 sm:w-5 h-4 sm:h-5' />
              </button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className='relative h-64 sm:h-80 md:h-96 lg:h-full min-h-64 sm:min-h-80 md:min-h-96'>
            {/* Simple Card */}
            <div className='absolute inset-0 bg-white/5 border border-white/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between'>
              {/* Top content */}
              <div className='space-y-3 sm:space-y-4'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div className='w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-[#0091a4] flex items-center justify-center shrink-0'>
                    <CheckCircle className='w-5 sm:w-6 h-5 sm:h-6 text-black' />
                  </div>
                  <div>
                    <p className='text-xs text-white/60 uppercase tracking-wider font-semibold'>Security Score</p>
                    <p className='text-xl sm:text-2xl font-bold text-white'>95/100</p>
                  </div>
                </div>

                <div className='space-y-2 pt-4'>
                  {['SOC 2 Compliant', 'ISO 27001 Ready', '24/7 Monitoring'].map((item, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <div className='w-1.5 h-1.5 rounded-full bg-[#0091a4]' />
                      <span className='text-sm text-white/70'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom content */}
              <div className='pt-6 border-t border-white/10'>
                <div className='text-xs text-white/50 mb-2'>Last Updated</div>
                <div className='text-sm font-semibold text-white'>Nov 11, 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Statement */}
        <div className='mt-16 pt-12 border-t border-white/10 text-center'>
          <p className='text-white/60 text-sm md:text-base'>
            Join 200+ SaaS companies that trust us for their security compliance
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA

