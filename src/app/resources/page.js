'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'
import { FileCheck, Shield, Search, Download, Sparkles, ArrowRight, Lock } from 'lucide-react'

const ResourcesPage = () => {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const cardsRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  const titleInView = useInView(titleRef, { once: true, margin: '-100px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-50px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-50px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

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
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })
    }
    if (statsRef.current) {
      gsap.set(statsRef.current.children, { opacity: 0, y: 30 })
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

  // CTA animation
  useEffect(() => {
    if (!ctaInView || !ctaRef.current) return

    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
  }, [ctaInView])

  // Stats animation
  useEffect(() => {
    if (!statsInView || !statsRef.current) return

    const stats = statsRef.current.children
    gsap.to(stats, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }, [statsInView])

  const resources = [
    {
      id: 1,
      title: 'SOC 2 Starter Kit',
      description: 'Complete compliance framework with policies, templates, and controls checklist to accelerate your certification journey',
      icon: FileCheck,
      badge: 'Most Downloaded',
      fileSize: '78 KB',
      pages: '2 pages',
      format: 'PDF',
      downloads: '2.3k',
      filePath: '/assets/soc2-starter-kit.pdf'
    },
    {
      id: 2,
      title: 'Cloud Security Blueprint',
      description: 'Comprehensive security hardening guide for AWS, Azure, and GCP with prioritized implementation roadmap',
      icon: Shield,
      badge: 'Essential',
      fileSize: '93 KB',
      pages: '2 pages',
      format: 'PDF',
      downloads: '1.9k',
      filePath: '/assets/cloud-security-cheat-sheet.pdf'
    },
    {
      id: 3,
      title: 'Penetration Test Playbook',
      description: 'Strategic preparation guide to maximize security assessment value and accelerate remediation workflows',
      icon: Search,
      badge: 'New Release',
      fileSize: '80 KB',
      pages: '2 pages',
      format: 'PDF',
      downloads: '1.5k',
      filePath: '/assets/pentest-readiness-guide.pdf'
    }
  ]

  const handleDownload = async (filePath, fileName) => {
    try {
      // Fetch the file as a blob
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || filePath.split('/').pop()
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: open in new tab if download fails
      window.open(filePath, '_blank')
    }
  }

  const stats = [
    { value: '5.7k+', label: 'Downloads' },
    { value: '100%', label: 'Free Access' },
    { value: '0', label: 'Email Required' }
  ]

  return (
    <div className="min-h-screen grid-background">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <Navbar />
        </div>
      </div>

      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12 sm:mb-16 md:mb-20'
          >
            <div className='relative'>
              <div className='hidden md:block absolute -left-20 top-0 w-1 h-full bg-gradient-to-b from-[#0091a4] via-[#0091a4] to-transparent'></div>
              <div>
                <div className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6'>
                  Free Resources
                </div>
                <h1
                  ref={titleRef}
                  className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4'
                >
                  Security <span className='text-[#0091a4]'>Knowledge, </span>
                  <br />
                  Instantly Accessible
                </h1>
                <p
                  ref={descriptionRef}
                  className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed'
                >
                  Expert-crafted security frameworks and implementation guides. No gatekeeping, no email captures—just immediate access to the resources you need.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Resource Cards Section */}
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon

              return (
                <motion.div
                  key={resource.id}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl border-2 border-black p-4 sm:p-6 md:p-8 flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0091a4] to-black opacity-0 group-hover:opacity-10 rounded-2xl sm:rounded-3xl blur-xl transition-all duration-300 pointer-events-none"></div>

                  {/* Badge */}
                  {resource.badge && (
                    <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3">
                      <div className="bg-[#0091a4] text-black text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 border-black flex items-center gap-1">

                        {resource.badge}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-5 md:mb-6">
                    <motion.div
                      className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl bg-[#0091a4] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-black" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3 group-hover:text-black/80 transition-colors leading-tight">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-black/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed flex-1">
                    {resource.description}
                  </p>

                  {/* File Info */}
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 pb-4 sm:pb-5 md:pb-6 border-b-2 border-black/10 flex-wrap">
                    <div className="text-xs text-black/60">
                      <span className="font-semibold">{resource.fileSize}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-black/30"></div>
                    <div className="text-xs text-black/60">
                      <span className="font-semibold">{resource.pages}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-black/30"></div>
                    <div className="text-xs text-black/60">
                      <span className="font-semibold">{resource.format}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDownload(resource.filePath, `${resource.title.replace(/\s+/g, '-').toLowerCase()}.pdf`)
                    }}
                    type="button"
                    className="w-full bg-black text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 hover:bg-[#0091a4] hover:text-black border-2 border-black transition-all duration-300 group-hover:shadow-[3px_3px_0px_0px_rgba(0,145,164,1)] sm:group-hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] relative z-10 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5" />
                    <span>Download Now</span>
                    <ArrowRight className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </motion.button>

                  {/* Download Count */}
                  <div className="mt-3 sm:mt-4 text-center">
                    <p className="text-xs text-black/50 font-medium">{resource.downloads} downloads</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Trust Badge */}
          <motion.div
            ref={ctaRef}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-black to-black/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-black relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-[#0091a4]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-[#0091a4]/10 rounded-full blur-3xl"></div>

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-7 md:gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 justify-center md:justify-start">
                    <Lock className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 text-[#0091a4]" />
                    <span className="text-xs font-bold text-[#0091a4] uppercase tracking-wider">No Barriers</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    Completely Free. No Strings Attached.
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    We believe security knowledge should be accessible to everyone. Download instantly without providing your email or personal information.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 text-white">
                    <div className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 rounded-full bg-[#0091a4] flex items-center justify-center flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <Download className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-black" />
                      </motion.div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Instant download</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-white">
                    <div className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 rounded-full bg-[#0091a4] flex items-center justify-center flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <Lock className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-black" />
                      </motion.div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">No email required</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-white">
                    <div className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 rounded-full bg-[#0091a4] flex items-center justify-center flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      >

                      </motion.div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">Always up-to-date</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Need something specific?</p>
            <motion.button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white border-2 border-white text-black rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0091a4] hover:border-[#0091a4] transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Request Custom Resource</span>
              <ArrowRight className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4" />
            </motion.button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ResourcesPage