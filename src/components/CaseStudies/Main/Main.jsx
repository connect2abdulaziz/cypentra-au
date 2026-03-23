'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Quote, Award } from 'lucide-react'
import Image from 'next/image'

const Main = () => {
  // Shuffle function to randomize array order
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Brand logos for infinite carousel - randomized on each page load
  const brandLogos = useMemo(() => {
    const logos = [
      { id: 1, src: '/brands/1.jpg', alt: 'Brand 1' },
      { id: 2, src: '/brands/2.jpg', alt: 'Brand 2' },
      { id: 3, src: '/brands/3.jpg', alt: 'Brand 3' },
      { id: 4, src: '/brands/4.jpg', alt: 'Brand 4' },
      { id: 5, src: '/brands/5.jpg', alt: 'Brand 5' },
      { id: 7, src: '/brands/7.png', alt: 'Brand 7' },
      { id: 8, src: '/brands/8.png', alt: 'Brand 8' },
      { id: 9, src: '/brands/9.png', alt: 'Brand 9' },
    ]
    return shuffleArray(logos)
  }, [])

  // Reverse order for second row
  const brandLogosReversed = useMemo(() => {
    return [...brandLogos].reverse()
  }, [brandLogos])

  const caseStudies = [
    {
      id: 1,
      company: 'TechCorp',
      logo: 'TC',
      industry: 'SaaS Platform',
      metric: '70%',
      metricLabel: 'Technical Debt Reduced',
      headline: 'Transforming Technical Debt into Strategic Advantage',
      description: 'How TechCorp leveraged advanced issue tracking to eliminate 70% of their technical debt in just 6 months.',
      quote: 'Linking maintenance issues to code was exactly what we were looking for. We\'ve now fixed 70% of our technical issues and our deployment velocity has doubled.',
      author: {
        name: 'Sarah Johnson',
        title: 'Senior Software Developer',
        company: 'TechCorp',
        avatar: 'SJ'
      },
      stats: [
        { value: '70%', label: 'Debt Reduced' },
        { value: '2x', label: 'Deploy Speed' },
        { value: '6mo', label: 'Timeline' }
      ]
    },
    {
      id: 2,
      company: 'SecureNet',
      logo: 'SN',
      industry: 'Cybersecurity',
      metric: '85%',
      metricLabel: 'Faster Resolution',
      headline: 'Delivering High-Quality Software Through Unified Security Practices',
      description: 'SecureNet centralized their security workflow and achieved unprecedented code quality improvements.',
      quote: 'Previously, security tasks were everywhere: in Jira, TODOs, Slack. We were losing track of critical issues. Now everything is centralized and nothing falls through the cracks.',
      author: {
        name: 'Michael Chen',
        title: 'Senior Software Engineer',
        company: 'SecureNet',
        avatar: 'MC'
      },
      stats: [
        { value: '85%', label: 'Faster Fix' },
        { value: '100%', label: 'Visibility' },
        { value: '3mo', label: 'Timeline' }
      ]
    },
    {
      id: 3,
      company: 'CloudGuard',
      logo: 'CG',
      industry: 'Cloud Infrastructure',
      metric: '50%',
      metricLabel: 'Security Improvement',
      headline: 'Achieving SOC 2 Compliance While Scaling Rapidly',
      description: 'CloudGuard improved their security posture by 50% while maintaining aggressive growth targets.',
      quote: 'The structured approach to security compliance transformed how we handle technical debt. We achieved SOC 2 certification 3 months ahead of schedule.',
      author: {
        name: 'Emily Rodriguez',
        title: 'Security Lead',
        company: 'CloudGuard',
        avatar: 'ER'
      },
      stats: [
        { value: '50%', label: 'Security Up' },
        { value: 'SOC 2', label: 'Certified' },
        { value: '4mo', label: 'Timeline' }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className='w-full grid-background py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='mb-12 sm:mb-16 md:mb-20'
        >
          {/* Badge */}
          <div className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 rounded-full'>
            Success Stories
          </div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6'>
            Real Results,
            <br />
            <span className='text-[#0091a4]'>Real Impact</span>
          </h1>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl leading-relaxed'>
            Discover how leading companies transformed their security posture and achieved measurable business outcomes
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20'
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className='group relative'
            >
              {/* Glow Effect */}
              <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0091a4] via-white to-[#0091a4] opacity-0 group-hover:opacity-20 rounded-2xl sm:rounded-3xl blur-xl transition duration-500'></div>

              <div className={`relative ${index === 1 ? 'bg-[#0091a4]' : 'bg-white/5'} backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border ${index === 1 ? 'border-[#0091a4]' : 'border-white/10 hover:border-[#0091a4]/50'} transition-all duration-300 h-full flex flex-col`}>
                {/* Company Header */}
                <div className='flex items-center justify-between mb-4 sm:mb-5 md:mb-6'>
                  <div className='flex items-center gap-3 sm:gap-4'>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl ${index === 1 ? 'bg-black' : 'bg-[#0091a4]/20 border border-[#0091a4]/30'} flex items-center justify-center`}>
                      <span className={`text-base sm:text-lg md:text-xl font-bold ${index === 1 ? 'text-[#0091a4]' : 'text-white'}`}>
                        {study.logo}
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${index === 1 ? 'text-black' : 'text-white'}`}>{study.company}</h3>
                      <p className={`text-xs sm:text-sm ${index === 1 ? 'text-black/70' : 'text-white/60'} font-medium`}>{study.industry}</p>
                    </div>
                  </div>

                  {/* Metric Badge */}
                  <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${index === 1 ? 'bg-black' : 'bg-[#0091a4]/20 border border-[#0091a4]/30'}`}>
                    <div className={`text-lg sm:text-xl md:text-2xl font-bold ${index === 1 ? 'text-[#0091a4]' : 'text-[#0091a4]'}`}>
                      {study.metric}
                    </div>
                  </div>
                </div>

                {/* Headline */}
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${index === 1 ? 'text-black' : 'text-white'} mb-3 sm:mb-4 leading-tight group-hover:opacity-90 transition-opacity`}>
                  {study.headline}
                </h2>

                {/* Description */}
                <p className={`text-sm sm:text-base ${index === 1 ? 'text-black/80' : 'text-white/70'} mb-4 sm:mb-5 md:mb-6 leading-relaxed`}>
                  {study.description}
                </p>

                {/* Stats */}
                <div className={`grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6 pb-4 sm:pb-5 md:pb-6 border-b ${index === 1 ? 'border-black/10' : 'border-white/10'}`}>
                  {study.stats.map((stat, idx) => (
                    <div key={idx} className='text-center'>
                      <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${index === 1 ? 'text-black' : 'text-white'} mb-1`}>{stat.value}</div>
                      <div className={`text-xs sm:text-sm ${index === 1 ? 'text-black/70' : 'text-white/60'} font-medium`}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quote Section */}
                <div className={`${index === 1 ? 'bg-black/10' : 'bg-white/5'} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 relative`}>
                  <Quote className={`w-6 h-6 sm:w-8 sm:h-8 ${index === 1 ? 'text-black/20' : 'text-white/20'} absolute top-3 sm:top-4 left-3 sm:left-4`} />
                  <p className={`text-xs sm:text-sm md:text-base ${index === 1 ? 'text-black/80' : 'text-white/80'} leading-relaxed italic pl-6 sm:pl-8`}>
                    {study.quote}
                  </p>
                </div>

                {/* Author Section */}
                <div className='flex items-center mt-auto'>
                  <div className='flex items-center gap-3 sm:gap-4'>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${index === 1 ? 'bg-black' : 'bg-[#0091a4]/20 border border-[#0091a4]/30'} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xs sm:text-sm font-bold ${index === 1 ? 'text-[#0091a4]' : 'text-[#0091a4]'}`}>
                        {study.author.avatar}
                      </span>
                    </div>
                    <div>
                      <p className={`font-bold ${index === 1 ? 'text-black' : 'text-white'} text-sm sm:text-base`}>{study.author.name}</p>
                      <p className={`text-xs sm:text-sm ${index === 1 ? 'text-black/70' : 'text-white/60'}`}>{study.author.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted Brands Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mb-12 sm:mb-16 md:mb-20 relative'
        >
          {/* Section Header */}
          <div className='text-center mb-8 sm:mb-10 md:mb-12'>
            <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] rounded-full mb-4 sm:mb-6'>
              <Award className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              <span className='text-xs sm:text-sm font-bold uppercase tracking-wider'>Trusted Partners</span>
            </div>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4'>
              Securing <span className='text-[#0091a4]'>Leading Brands</span>
            </h2>
            <p className='text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed'>
              Join the companies that trust us with their security
            </p>
          </div>

          {/* Infinite Carousel Container */}
          <div className='relative overflow-hidden py-6 sm:py-8 md:py-10 carousel-mask'>
            {/* First Row - Scroll Right */}
            <div className='mb-6 sm:mb-8 relative'>
              <div className='flex gap-6 sm:gap-8 md:gap-10 animate-scroll-right will-change-transform'>
                {[...brandLogos, ...brandLogos].map((brand, index) => (
                  <div
                    key={`row1-${brand.id}-${index}`}
                    className='flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 h-20 sm:h-24 md:h-28 lg:h-32 bg-white/5 backdrop-blur-sm border-t border-b border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex items-center justify-center group hover:bg-white/10 hover:border-t-[#0091a4] hover:border-b-[#0091a4] hover:scale-105 transition-all duration-300 cursor-pointer'
                  >
                    <div className='relative w-full h-full'>
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        fill
                        className='object-contain transition-all duration-300 opacity-80 group-hover:opacity-100'
                        sizes='(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px'
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Scroll Left */}
            <div className='relative'>
              <div className='flex gap-6 sm:gap-8 md:gap-10 animate-scroll-left will-change-transform'>
                {[...brandLogosReversed, ...brandLogosReversed].map((brand, index) => (
                  <div
                    key={`row2-${brand.id}-${index}`}
                    className='flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 h-20 sm:h-24 md:h-28 lg:h-32 bg-white/5 backdrop-blur-sm border-t border-b border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex items-center justify-center group hover:bg-white/10 hover:border-t-[#0091a4] hover:border-b-[#0091a4] hover:scale-105 transition-all duration-300 cursor-pointer'
                  >
                    <div className='relative w-full h-full'>
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        fill
                        className='object-contain transition-all duration-300 opacity-80 group-hover:opacity-100'
                        sizes='(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px'
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* CSS for infinite scroll animations */}
      <style jsx>{`
        .carousel-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Main