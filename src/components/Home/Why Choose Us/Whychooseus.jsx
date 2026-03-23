'use client'
import { ArrowUpFromDot, Asterisk, Box, Computer, HandFist, Rainbow, Wrench } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const Whychooseus = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const cardsRef = useRef(null)

  const titleInView = useInView(titleRef, { once: true, margin: '-100px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-50px' })

  // Set initial hidden state on mount
  useEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
    }
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 20 })
    }
    if (cardsRef.current) {
      gsap.set(cardsRef.current.children, { opacity: 0, y: 50 })
    }
  }, [])

  // Title and description animation - only when scrolled into view
  useEffect(() => {
    if (!titleInView) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (titleRef.current) {
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      })
    }

    if (descriptionRef.current) {
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.4')
    }
  }, [titleInView])

  // Cards staggered animation - only when scrolled into view
  useEffect(() => {
    if (!cardsInView || !cardsRef.current) return

    const cards = cardsRef.current.children
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }, [cardsInView])

  const cards = [
    {
      bg: 'bg-[#0091a4]',
      icon: Computer,
      title: 'Security chaos and uncertainty',
      description: 'Policies scattered across teams, unclear responsibilities, and no audit trail.',
      iconBg: 'bg-white'
    },
    {
      bg: 'bg-white',
      icon: Asterisk,
      title: 'Delays and lost trust',
      description: 'Compliance deadlines missed, failed customer security questionnaires, and reputational risk.',
      iconBg: 'bg-[#0091a4]'
    },
    {
      bg: 'bg-[#0091a4]',
      icon: Wrench,
      title: 'Clear structure and ongoing support',
      description: 'Cypentra\'s packages deliver defined steps, templates, and vCISO guidance that make security part of daily operations.',
      iconBg: 'bg-white'
    },
    {
      bg: 'bg-white',
      icon: Box,
      title: 'SOC 2 & ISO Readiness Guidance',
      description: 'Get structured support to prepare, align policies, and collect audit evidence without slowing down development.',
      iconBg: 'bg-[#0091a4]'
    },
    {
      bg: 'bg-[#0091a4]',
      icon: Rainbow,
      title: 'Continuous Cloud Protection',
      description: 'Detect and resolve misconfigurations across AWS, Azure, or GCP.',
      iconBg: 'bg-white'
    },
    {
      bg: 'bg-white',
      icon: HandFist,
      title: 'vCISO Support When You Need It',
      description: 'Ongoing strategic guidance and clear actions for your engineering teams.',
      iconBg: 'bg-[#0091a4]'
    }
  ]

  return (
    <section ref={sectionRef} className='w-full grid-background py-12 px-4 sm:px-6 md:px-10 lg:px-16'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col items-center text-center gap-3 sm:gap-4'>
          <h2
            ref={titleRef}
            className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight sm:leading-relaxed'
          >
            Why Choose a <span className='bg-[#0091a4] text-black px-1 sm:px-2'>Structured</span> <br /> Security <span className='bg-[#0091a4]  text-black px-1 sm:px-2'>Package?</span>
          </h2>
          <p
            ref={descriptionRef}
            className='text-xs sm:text-sm md:text-base lg:text-lg text-white/80 max-w-3xl'
          >
            Many startups handle security reactively — after an incident or audit requirement.
            Our packages address this by giving structure, clarity, and ongoing visibility before
            problems occur.
          </p>
        </div>

        <div ref={cardsRef} className='mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {cards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <motion.div
                key={index}
                className={`group rounded-lg sm:rounded-xl border border-gray-200 ${card.bg} p-4 sm:p-6 lg:p-8 text-left shadow-sm`}
                whileHover={{ y: -8, borderColor: '#0091a4', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className='flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-4'>
                  <motion.div
                    className={`w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <IconComponent className='w-5 sm:w-6 h-5 sm:h-6 text-[#1a1a1a]' />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -3, rotate: 45 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <ArrowUpFromDot className='w-5 sm:w-6 h-5 sm:h-6 text-[#1a1a1a]' />
                  </motion.div>
                </div>
                <h3 className='text-base sm:text-lg lg:text-xl font-semibold text-black mb-2 sm:mb-3'>{card.title}</h3>
                <p className={`text-xs sm:text-sm ${card.bg === 'bg-[#0091a4]' ? 'text-black/80' : 'text-gray-600'}`}>{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Whychooseus