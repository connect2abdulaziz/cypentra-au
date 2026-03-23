'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, AlertTriangle, Lock, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Track 404 page view
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'page_view',
        page_title: '404 - Page Not Found',
        page_path: window.location.pathname,
      })

      // Track mouse movement for interactive effects
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black grid-background relative overflow-hidden">
      <div className="w-full">
        <Navbar />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0091a4] rounded-full opacity-30"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0,
            }}
            animate={{
              y: [null, `calc(${Math.random() * 100}% + ${Math.random() * 200 - 100}px)`],
              scale: [0, 1, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0091a4] rounded-full blur-3xl opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0091a4] rounded-full blur-3xl opacity-10"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="max-w-3xl w-full mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-6 sm:mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#0091a4]" />
              <span className="text-xs font-bold text-[#0091a4] uppercase tracking-wider">
                Page Not Found
              </span>
            </motion.div>

            {/* 404 Number with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative mb-6 sm:mb-8"
            >
              <motion.h1
                className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black text-white leading-none relative"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(0,145,164,0)',
                    '0 0 20px rgba(0,145,164,0.5)',
                    '0 0 0px rgba(0,145,164,0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                4
                <motion.span
                  className="text-[#0091a4] inline-block"
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  0
                </motion.span>
                4
              </motion.h1>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-2 border-[#0091a4] rounded-full"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-2 border-[#0091a4] rounded-full"
                />
              </div>
            </motion.div>

            {/* Title with Animated Underline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative mb-4 sm:mb-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                Oops! Page{' '}
                <span className="text-[#0091a4] relative">
                  Disappeared
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-3 bg-[#0091a4] -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto"
            >
              The page you're looking for seems to have vanished into the digital void.
              Don't worry, we'll help you find your way back!
            </motion.p>

            {/* Animated Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
            >
              {[Lock, Shield, Zap].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#0091a4]/20 border-2 border-[#0091a4] flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#0091a4]" />
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10"
            >
              <Link
                href="/"
                className="group relative flex items-center justify-center gap-2 px-8 py-4 sm:py-5 bg-[#0091a4] hover:bg-white text-black font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,145,164,1)] hover:scale-105 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <Home className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                <span className="relative z-10">Back to Homepage</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all relative z-10" />
              </Link>

              <Link
                href="/services"
                className="group flex items-center justify-center gap-2 px-8 py-4 sm:py-5 bg-white hover:bg-black text-black hover:text-white border-2 border-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,145,164,1)] hover:scale-105"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Explore Services</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
              </Link>
            </motion.div>

            {/* Quick Links Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 sm:mt-12 md:mt-16"
            >
              <p className="text-sm sm:text-base text-white/40 mb-4 sm:mb-6 font-semibold">Quick Navigation:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { label: 'Services', href: '/services', icon: Shield },
                  { label: 'Packages', href: '/packages', icon: Zap },
                  { label: 'Resources', href: '/resources', icon: Lock },
                  { label: 'Contact', href: '/contact', icon: Search },
                  { label: 'About', href: '/about', icon: Home },
                ].map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0091a4] rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:scale-105"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 bg-[#0091a4]/20 rounded-full flex items-center justify-center"
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#0091a4]" />
                      </motion.div>
                      <p className="text-xs sm:text-sm text-white/60 group-hover:text-[#0091a4] transition-colors font-medium">
                        {link.label}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Fun Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-[#0091a4]/20 rounded-xl sm:rounded-2xl"
            >
              <p className="text-xs sm:text-sm text-white/50 italic">
                "Even the best security systems can't prevent a page from going missing.
                But we can help you find what you're looking for!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
