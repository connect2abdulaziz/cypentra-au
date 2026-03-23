'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import Loader from '@/components/common/Loader/Loader'

const ThreatMap = () => {
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false)
  const containerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // Lazy load iframe only when component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadIframe) {
            setShouldLoadIframe(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [shouldLoadIframe])

  useEffect(() => {
    // Set loading to false after a delay (iframe loads)
    if (shouldLoadIframe) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [shouldLoadIframe])

  return (
    <section className='w-full grid-background py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-6 sm:mb-8 md:mb-10'
        >
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>
            Cypentra Threat Map <span className='text-[#0091a4]'>— Real-Time Visualization</span>
          </h2>
          <p className='text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto mb-2'>
            Powered by <span className='text-[#0091a4] font-semibold'>Cypentra Threat Intelligence</span>
          </p>
        </motion.div>

        {/* ThreatMap Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#0091a4]/30 bg-black/50 backdrop-blur-sm shadow-2xl hover:border-[#0091a4]/50 transition-all duration-300'
          style={{ height: '600px' }}
        >
          {/* Color Overlay - Shifts colors toward teal theme */}
          <div
            className='absolute inset-0 pointer-events-none z-20 mix-blend-color opacity-40'
            style={{
              background: 'linear-gradient(135deg, rgba(0, 145, 164, 0.25) 0%, rgba(0, 200, 200, 0.2) 50%, rgba(0, 145, 164, 0.25) 100%)'
            }}
          ></div>
          {/* Loading State */}
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/80 z-10 rounded-xl sm:rounded-2xl'>
              <Loader size='lg' text='Loading Threat Map...' />
            </div>
          )}

          {/* Error Fallback */}
          {iframeError ? (
            <div className='absolute inset-0 flex items-center justify-center bg-black/90 z-10'>
              <div className='text-center p-6'>
                <p className='text-white text-lg mb-2'>Unable to load Threat Map</p>
                <p className='text-white/70 text-sm mb-4'>
                  The threat map may be blocked by browser security settings.
                </p>
                <a
                  href='https://threatmap.checkpoint.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block bg-[#0091a4] hover:bg-[#007a8a] text-white px-6 py-3 rounded-lg font-semibold transition-colors'
                >
                  View Threat Map in New Tab
                </a>
              </div>
            </div>
          ) : (
            <div className='relative w-full h-full'>
              {shouldLoadIframe ? (
                <iframe
                  src='https://threatmap.checkpoint.com/'
                  width='100%'
                  height='100%'
                  style={{
                    border: 'none',
                    display: 'block',
                    minHeight: '600px',
                    filter: 'hue-rotate(200deg) saturate(1.15) brightness(0.95) contrast(1.05)'
                  }}
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIframeError(true)
                    setIsLoading(false)
                  }}
                  title='Cypentra Threat Map - Real-Time Visualization'
                  className='w-full h-full'
                />
              ) : (
                <div className='absolute inset-0 flex items-center justify-center bg-black/80 z-10 rounded-xl sm:rounded-2xl'>
                  <Loader size='lg' text='Threat Map will load when visible...' />
                </div>
              )}
              {/* Teal color overlay - shifts green toward teal #0091a4 */}
              <div
                className='absolute inset-0 pointer-events-none z-30 mix-blend-color opacity-45'
                style={{
                  background: 'rgba(0, 145, 164, 0.35)'
                }}
              ></div>
              {/* Additional overlay to push green to teal */}
              <div
                className='absolute inset-0 pointer-events-none z-30 mix-blend-hue opacity-30'
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 145, 164, 0.25) 0%, rgba(0, 200, 200, 0.2) 50%, rgba(0, 145, 164, 0.25) 100%)'
                }}
              ></div>
            </div>
          )}

          {/* Invisible Click Interceptor - Top Right: "PREVENTION STARTS NOW" button */}
          <div
            onClick={() => router.push('/packages')}
            className='absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 lg:top-6 lg:right-6 w-[200px] sm:w-[220px] md:w-[240px] h-[45px] sm:h-[50px] md:h-[55px] z-50 cursor-pointer'
            title='View Our Security Packages'
            style={{
              background: 'transparent'
            }}
          />

          {/* Invisible Click Interceptor - Top Left: CHECK POINT logo - Entire Area */}
          <div
            onClick={() => router.push('/about')}
            className='absolute top-0 left-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px] z-50 cursor-pointer'
            title='About Cypentra'
            style={{
              background: 'transparent'
            }}
          />

          {/* Invisible Click Interceptor - Bottom Right: THREATCLOUD logo/button - Entire Area */}
          <div
            onClick={() => router.push('/contact')}
            className='absolute bottom-0 right-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[80px] sm:h-[90px] md:h-[100px] lg:h-[110px] z-50 cursor-pointer'
            title='Contact Us'
            style={{
              background: 'transparent'
            }}
          />
        </motion.div>

        {/* Footer Note */}
        <div className='mt-4 text-center'>
          <p className='text-xs sm:text-sm text-white/50'>
            Real-time threat intelligence visualization
          </p>
        </div>
      </div>
    </section>
  )
}

export default ThreatMap

