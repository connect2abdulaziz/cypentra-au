'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Shield, Zap, Users, GraduationCap, Lock, Star, Fingerprint, HatGlassesIcon, ReplaceAll, TrainTrack, HandFist, Container } from 'lucide-react'

const Main = () => {
  const [activeCard, setActiveCard] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const services = [
    {
      icon: HatGlassesIcon,
      title: 'Security Assessments',
      description: 'Comprehensive evaluation of your current security posture and vulnerabilities',
    },
    {
      icon: Fingerprint,
      title: 'Security Implementation',
      description: 'Deploy robust security measures and protocols to protect your infrastructure',
    },
    {
      icon: ReplaceAll,
      title: '24/7 Monitoring',
      description: 'Continuous monitoring and threat detection to keep your systems secure',
    },
    {
      icon: TrainTrack,
      title: 'Security Training',
      description: 'Educate your team on cybersecurity best practices and threat awareness',
    },
    {
      icon: HandFist,
      title: 'Compliance Support',
      description: 'Ensure your organization meets industry standards and regulatory requirements',
    },
    {
      icon: Container,
      title: 'Incident Response',
      description: 'Rapid response and recovery services for cybersecurity incidents',
    }
  ]

  useEffect(() => {
    // Only use scroll-based animation on desktop
    if (isMobile) {
      // On mobile, show all cards immediately
      setActiveCard(services.length - 1)
      return
    }

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Calculate which card should be active based on scroll progress
      const cardCount = services.length
      const progressPerCard = 1 / (cardCount + 1) // Add buffer between cards

      let newActiveCard = -1

      // Only show one card at a time based on scroll position
      for (let i = 0; i < cardCount; i++) {
        const cardStart = (i + 1) * progressPerCard
        const cardEnd = (i + 2) * progressPerCard

        if (progress >= cardStart && progress < cardEnd) {
          newActiveCard = i
          break
        }
      }

      // Show all cards if scrolled past 90% of the section
      if (progress >= 0.9) {
        newActiveCard = cardCount - 1
      }

      setActiveCard(newActiveCard)
    })

    return () => unsubscribe()
  }, [scrollYProgress, services.length, isMobile])

  return (
    <section ref={sectionRef} className='relative py-8 sm:py-12 md:py-16 lg:py-20 grid-background' style={{ minHeight: isMobile ? 'auto' : '200vh' }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16'>
          {/* Sticky Left Section */}
          <div className='lg:sticky lg:top-1/2 lg:-translate-y-1/2 h-fit'>
            <div className='flex flex-col'>
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-5 md:mb-6'>
                Our Cybersecurity <span className='text-[#0091a4]'>Services</span>
              </h2>
              <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-lg'>
                Comprehensive remote cybersecurity solutions tailored to protect your business from evolving threats and ensure compliance with industry standards
              </p>
            </div>
          </div>

          {/* Right Section - Cards */}
          <div className='flex flex-col gap-6 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-10 lg:py-12'>
            {services.map((service, index) => {
              const IconComponent = service.icon
              // On mobile, show all cards; on desktop, use scroll-based visibility
              const isVisible = isMobile ? true : activeCard === index

              return (
                <motion.div
                  key={index}
                  initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 150 }}
                  animate={isMobile ? {
                    opacity: 1,
                    y: 0,
                  } : {
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 150,
                  }}
                  transition={isMobile ? {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  } : {
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1], // Custom easing for smoothness
                  }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                  viewport={isMobile ? { once: true, margin: '-50px' } : undefined}
                  className='bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-20 sm:pb-24 md:pb-28 lg:pb-32 backdrop-blur-sm hover:bg-white/10 hover:border-[#0091a4]/50 transition-all duration-300'
                >
                  <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8'>
                    {/* Icon */}
                    <div className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#0091a4]/20 border border-[#0091a4] rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0091a4]/30 transition-colors'>
                      <IconComponent className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#0091a4]' />
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4'>
                        {service.title}
                      </h3>
                      <p className='text-sm sm:text-base md:text-lg text-white/70 leading-relaxed'>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Main