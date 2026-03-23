'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'
import { FileText, TrendingUp, Lightbulb } from 'lucide-react'

const InsightsPage = () => {
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

  // Title and description animation
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

  // Cards staggered animation
  useEffect(() => {
    if (!cardsInView || !cardsRef.current) return

    const cards = cardsRef.current.children
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    })
  }, [cardsInView])

  const insights = [
    {
      id: 1,
      category: 'COMPLIANCE',
      title: 'SOC 2 vs ISO 27001: What Your SaaS Needs to Know',
      description: 'Understanding the key differences and choosing the right framework for your business stage.',
      icon: FileText,
      style: 'image-overlay', // Inspired by first card in image 2
      accentText: '30%',
      accentSubtext: 'Faster compliance'
    },
    {
      id: 2,
      category: 'FUNDING',
      title: 'Security Debt: The Silent Killer of Series A Deals',
      description: 'How security gaps can derail fundraising and what VCs really look for in due diligence.',
      icon: TrendingUp,
      style: 'yellow', // Inspired by second card in image 2
      accentText: '200+',
      accentSubtext: 'Deals secured'
    },
    {
      id: 3,
      category: 'STRATEGY',
      title: 'Prioritizing Security with a Team of Three',
      description: 'Practical security wins for resource-constrained startups — maximum impact, minimal overhead.',
      icon: Lightbulb,
      style: 'black', // Inspired by third card in image 2
      accentText: '50+',
      accentSubtext: 'Startups helped'
    }
  ]

  return (
    <div>
      <section className="w-full min-h-screen grid-background py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <Navbar />

          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4"
            >
              Security <span className="text-[#0091a4]">Insights</span>
            </h1>
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl px-4"
            >
              Actionable ideas. No fluff. Expert guidance on compliance, security, and growth strategies for modern SaaS businesses.
            </p>
          </div>

          {/* Cards Section */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon

              if (insight.style === 'image-overlay') {
                // Card 1: Image overlay style
                return (
                  <motion.div
                    key={insight.id}
                    className="relative rounded-lg sm:rounded-xl bg-white shadow-lg group cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Content */}
                    <div className="relative p-4 sm:p-6 md:p-8 h-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col justify-between">
                      {/* Top Section */}
                      <div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-4">
                          <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-lg bg-black/10 flex items-center justify-center border border-black/20">
                            <IconComponent className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-black" />
                          </div>
                        </div>
                        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10 text-black text-xs font-semibold uppercase tracking-wider border border-black/20">
                          {insight.category}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-3 sm:mt-4 mb-2 sm:mb-3 leading-tight">
                          {insight.title}
                        </h3>
                        <p className="text-black/80 text-xs sm:text-sm leading-relaxed">
                          {insight.description}
                        </p>
                      </div>
                      {/* Accent Text Overlay */}
                      <div className="mt-auto pt-3 sm:pt-4">
                        <div className="text-black">
                          <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-0.5 sm:mb-1">{insight.accentText}</div>
                          <div className="text-xs sm:text-sm font-medium opacity-90">{insight.accentSubtext}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              }

              if (insight.style === 'yellow') {
                // Card 2: Yellow card style
                return (
                  <motion.div
                    key={insight.id}
                    className="relative rounded-lg sm:rounded-xl bg-[#0091a4] p-4 sm:p-6 md:p-8 shadow-lg group cursor-pointer min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Top Section */}
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-4">
                        <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-lg bg-black/10 flex items-center justify-center">
                          <IconComponent className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-black" />
                        </div>
                      </div>
                      <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10 text-black text-xs font-semibold uppercase tracking-wider">
                        {insight.category}
                      </span>
                    </div>

                    {/* Accent Text */}
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-0.5 sm:mb-1">{insight.accentText}</div>
                      <div className="text-xs sm:text-sm font-medium text-black/80">{insight.accentSubtext}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3 leading-tight">
                        {insight.title}
                      </h3>
                      <p className="text-black/80 text-xs sm:text-sm leading-relaxed">
                        {insight.description}
                      </p>
                    </div>

                    {/* User Avatars Placeholder */}
                    <div className="mt-4 sm:mt-5 md:mt-6 flex items-center gap-1 sm:gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full border-2 border-black ${i === 4 ? 'bg-black text-white flex items-center justify-center text-xs font-bold' : 'bg-white'
                            }`}
                          style={{ marginLeft: i > 1 ? '-6px' : '0' }}
                        >
                          {i === 4 ? '+' : ''}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              }

              if (insight.style === 'black') {
                // Card 3: Black card style
                return (
                  <motion.div
                    key={insight.id}
                    className="relative rounded-lg sm:rounded-xl bg-black p-4 sm:p-6 md:p-8 shadow-lg group cursor-pointer min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Stars Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-5 md:mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 text-yellow-400 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-4 sm:mb-5 md:mb-6">
                      <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-4">
                        <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                          <IconComponent className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" />
                        </div>
                      </div>
                      <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 mb-3 sm:mb-4">
                        {insight.category}
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                        {insight.title}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                        {insight.description}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                      <div className="text-white/60 text-xs sm:text-sm mb-1.5 sm:mb-2">Trusted by</div>
                      <div className="text-2xl sm:text-2.5xl md:text-3xl font-bold text-white">{insight.accentText}</div>
                      <div className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">{insight.accentSubtext}</div>
                    </div>
                  </motion.div>
                )
              }
            })}
          </div>
        </div>
      </section >
      <Footer />
    </div>
  )
}
export default InsightsPage
