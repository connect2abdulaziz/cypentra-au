'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { Shield } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const ratingRef = useRef(null)
  const boxesRef = useRef(null)
  const boxesInView = useInView(boxesRef, { once: true, margin: '-100px' })

  // Number counter animation
  const Counter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)
    const boxesInViewForCounter = useInView(boxesRef, { once: true, margin: '-50px' })

    useEffect(() => {
      if (!boxesInViewForCounter) {
        // Show final value if not in view yet
        setCount(end)
        return
      }

      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(end) // Ensure final value
        }
      }
      requestAnimationFrame(animate)
    }, [boxesInViewForCounter, end, duration])

    return <span ref={countRef}>{count}{suffix}</span>
  }

  // Initial hero animations - run only once on mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Title animation - smooth fade and slide up
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }

    // Subtitle fade in
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.4')
    }

    // Buttons animation
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current.children, { opacity: 0, y: 20 })
      tl.to(buttonsRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5
      }, '-=0.3')
    }

    // Rating animation
    if (ratingRef.current) {
      gsap.set(ratingRef.current, { opacity: 0, y: 20 })
      tl.to(ratingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.2')
    }
  }, []) // Empty dependency array - runs only once on mount

  // Boxes animation - separate effect that only runs when boxes come into view
  useEffect(() => {
    if (boxesRef.current) {
      const boxes = boxesRef.current.children
      if (boxesInView && boxes.length > 0) {
        gsap.fromTo(boxes,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3,
            clearProps: 'all' // Clear any inline styles after animation
          }
        )
      } else if (boxes.length > 0) {
        // Ensure boxes are visible even if not in view yet
        gsap.set(boxes, { opacity: 1, y: 0 })
      }
    }
  }, [boxesInView]) // Only depends on boxesInView

  return (
    <div className='w-full grid-background' ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-24'>
        <div className='text-center flex flex-col items-center justify-center gap-4 w-full' style={{ position: 'relative', zIndex: 1 }}>
          <h1
            ref={titleRef}
            className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight'
          >
            Cybersecurity & <span className='text-[#0091a4]'>Compliance</span> <br /> for Australian SaaS &amp; <span className='text-[#0091a4]'>Cloud Companies</span>
          </h1>

          <p
            ref={subtitleRef}
            className='text-white/70 text-xs sm:text-sm md:text-base lg:text-lg font-light px-2 sm:px-4'
          >
            Practical cybersecurity and compliance solutions designed for fast-
            moving teams. <br /> Choose your path: quick setup or full-scale readiness.
          </p>

          <div
            ref={buttonsRef}
            className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 w-full px-2'
          >
            <motion.button
              onClick={() => window.location.href = '/cypentra-consultation'}
              className='bg-[#0091a4] text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold cursor-pointer text-xs sm:text-sm md:text-base w-full sm:w-auto'
              whileHover={{
                boxShadow: '0 10px 30px rgba(0, 145, 164, 0.4)',
                y: -2
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Book a Free Security Review
            </motion.button>
            <motion.button
              onClick={() => window.location.href = '/packages'}
              className='bg-transparent text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold cursor-pointer border border-white text-xs sm:text-sm md:text-base w-full sm:w-auto'
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#0091a4',
                y: -2
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Compare Packages
            </motion.button>
          </div>


          {/* Boxes Section */}
          <div
            ref={boxesRef}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full items-end mt-8 sm:mt-12'
            style={{ position: 'relative', zIndex: 10 }}
          >
            {/* Card 1 - Enterprise Security */}
            <motion.div
              className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white h-48 sm:h-64 md:h-80 lg:h-96 group cursor-pointer shadow-lg shadow-[#0091a4]/20 hover:shadow-2xl hover:shadow-[#0091a4]/40 transition-all duration-300'
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                border: '2px solid #0091a4',
                boxShadow: 'inset 0 0 0 1px rgba(0, 145, 164, 0.1)',
                position: 'relative',
                zIndex: 1,
              }}
            >

              {/* Creative gradient background */}
              <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
                {/* Animated gradient overlay */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-[#0091a4]/30 via-transparent to-[#0091a4]/20'
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                />
                {/* Animated background pattern */}
                <div className='absolute inset-0 opacity-20'>
                  <div className='absolute inset-0' style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #0091a4 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}></div>
                </div>
              </div>
              {/* Text content */}
              <div className='relative w-full h-full flex items-center justify-center p-4 sm:p-6' style={{ zIndex: 10 }}>
                <div className='text-center text-white relative' style={{ zIndex: 20 }}>
                  <motion.h3
                    className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-2xl'
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Counter end={200} suffix="+" />
                  </motion.h3>
                  <p className='text-xs sm:text-sm md:text-base font-medium text-white leading-tight drop-shadow-lg'>
                    Companies<br />
                    Secured & Protected
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - SOC 2 Compliance */}
            <motion.div
              className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0091a4] h-[220px] sm:h-[280px] lg:h-[320px] group cursor-pointer shadow-lg shadow-[#0091a4]/30 hover:shadow-2xl hover:shadow-[#0091a4]/50 transition-all duration-300'
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                border: '2px solid #0091a4',
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 1,
              }}
            >

              {/* Creative gradient background */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#0091a4] via-[#007a8a] to-[#005f6b]'>
                {/* Animated diagonal lines */}
                <motion.div
                  className='absolute inset-0 opacity-30'
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                  }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent'
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              {/* Text content */}
              <div className='relative w-full h-full flex items-center justify-center p-4 sm:p-6' style={{ zIndex: 10 }}>
                <div className='text-center text-white relative' style={{ zIndex: 20 }}>
                  <motion.h3
                    className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-2xl'
                    whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    SOC 2 Ready
                  </motion.h3>
                  <p className='text-xs sm:text-sm md:text-base font-medium text-white leading-tight drop-shadow-lg'>
                    Compliance<br />
                    made simple
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Security Assessments */}
            <motion.div
              className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white h-40 sm:h-52 md:h-60 lg:h-60 group cursor-pointer shadow-lg shadow-[#0091a4]/20 hover:shadow-2xl hover:shadow-[#0091a4]/40 transition-all duration-300'
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                border: '2px solid #0091a4',
                boxShadow: 'inset 0 0 0 1px rgba(0, 145, 164, 0.1)',
                position: 'relative',
                zIndex: 1,
              }}
            >

              {/* Creative gradient background */}
              <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
                {/* Floating particles effect */}
                <div className='absolute inset-0 overflow-hidden'>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-2 h-2 bg-[#0091a4] rounded-full'
                      animate={{
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
                {/* Subtle pattern */}
                <div className='absolute inset-0 opacity-5'>
                  <div className='absolute inset-0' style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #0091a4 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}></div>
                </div>
              </div>
              {/* Text content */}
              <div className='relative w-full h-full flex items-center justify-center p-4 sm:p-6' style={{ zIndex: 10 }}>
                <div className='text-center text-black relative' style={{ zIndex: 20 }}>
                  <motion.h3
                    className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-gray-900 drop-shadow-2xl'
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Counter end={500} suffix="+" />
                  </motion.h3>
                  <p className='text-xs sm:text-sm md:text-base font-medium text-gray-700 leading-tight drop-shadow-lg'>
                    Security<br />
                    Assessments
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - vCISO Services */}
            <motion.div
              className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1e4d4d] h-[220px] sm:h-[280px] lg:h-[320px] group cursor-pointer shadow-lg shadow-[#0091a4]/20 hover:shadow-2xl hover:shadow-[#0091a4]/40 transition-all duration-300'
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                border: '2px solid #0091a4',
                boxShadow: 'inset 0 0 0 1px rgba(0, 145, 164, 0.2)',
                position: 'relative',
                zIndex: 1,
              }}
            >

              {/* Creative gradient background */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#1e4d4d] via-[#0f3d3d] to-[#1e4d4d]'>
                {/* Animated gradient overlay */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-[#0091a4]/30 via-transparent to-[#0091a4]/20'
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                />
                {/* Grid pattern */}
                <div className='absolute inset-0 opacity-20'>
                  <div className='absolute inset-0' style={{
                    backgroundImage: 'linear-gradient(#0091a4 1px, transparent 1px), linear-gradient(90deg, #0091a4 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                  }}></div>
                </div>
                {/* Animated dots */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute w-1 h-1 bg-[#0091a4] rounded-full'
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${20 + i * 20}%`,
                    }}
                  />
                ))}
              </div>
              {/* Text content */}
              <div className='relative w-full h-full flex items-center justify-center p-4 sm:p-6' style={{ zIndex: 10 }}>
                <div className='text-center text-white relative' style={{ zIndex: 20 }}>
                  <motion.h3
                    className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-2xl'
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    vCISO Support
                  </motion.h3>
                  <p className='text-xs sm:text-sm md:text-base font-medium text-white leading-tight drop-shadow-lg'>
                    Strategic security<br />
                    leadership
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 5 - 24/7 Monitoring */}
            <motion.div
              className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white h-[250px] sm:h-[320px] lg:h-[380px] group cursor-pointer shadow-lg shadow-[#0091a4]/20 hover:shadow-2xl hover:shadow-[#0091a4]/40 transition-all duration-300'
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                border: '2px solid #0091a4',
                boxShadow: 'inset 0 0 0 1px rgba(0, 145, 164, 0.1)',
                position: 'relative',
                zIndex: 1,
              }}
            >

              {/* Creative gradient background */}
              <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900'>
                {/* Rotating ring effect */}
                <motion.div
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-[#0091a4] rounded-full opacity-20'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                ></motion.div>
                <motion.div
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-[#0091a4] rounded-full opacity-30'
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                ></motion.div>
                {/* Animated scan line effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-b from-transparent via-[#0091a4]/20 to-transparent'
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ zIndex: 1 }}
                ></motion.div>
                {/* Pulsing dots */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute w-1.5 h-1.5 bg-[#0091a4] rounded-full'
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${15 + (i % 3) * 35}%`,
                      top: `${20 + Math.floor(i / 3) * 30}%`,
                    }}
                  />
                ))}
              </div>
              {/* Text content */}
              <div className='relative w-full h-full flex items-center justify-center p-4 sm:p-6' style={{ zIndex: 10 }}>
                <div className='text-center text-white relative' style={{ zIndex: 20 }}>
                  <motion.h3
                    className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-2xl'
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    24/7 Monitoring
                  </motion.h3>
                  <p className='text-xs sm:text-sm md:text-base font-medium text-white leading-tight drop-shadow-lg'>
                    Continuous threat<br />
                    detection & response
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero