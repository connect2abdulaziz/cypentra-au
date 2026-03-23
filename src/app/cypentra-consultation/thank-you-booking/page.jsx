'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Home, Sparkles, Calendar, Mail, Clock } from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'

export default function ThankYouBooking() {
  useEffect(() => {
    // Fire GTM dataLayer event for successful booking
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []

      // Push conversion event to dataLayer
      window.dataLayer.push({
        event: 'consultation_booking_complete',
        event_category: 'Booking',
        event_label: 'Cypentra Consultation',
        value: 1.0,
        currency: 'USD',
        transaction_id: Date.now().toString(),
      })

      // Optional: Push page view
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Booking Confirmed',
        page_path: '/cypentra-consultation/thank-you-booking',
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-black grid-background">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { x: '10%', y: '20%', delay: 0, duration: 3 },
            { x: '80%', y: '30%', delay: 0.5, duration: 3.5 },
            { x: '30%', y: '70%', delay: 1, duration: 4 },
            { x: '70%', y: '80%', delay: 1.5, duration: 3.2 },
            { x: '50%', y: '10%', delay: 0.3, duration: 3.8 },
            { x: '20%', y: '90%', delay: 0.8, duration: 3.6 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#0091a4] rounded-full opacity-20"
              initial={{
                x: pos.x,
                y: pos.y,
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                y: [pos.y, `calc(${pos.y} + 30px)`],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="max-w-2xl w-full mx-auto"
          >
            {/* Main Success Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#0091a4] shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] md:shadow-[8px_8px_0px_0px_rgba(0,145,164,1)] p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden"
            >
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0091a4]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0091a4]/5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-6 sm:mb-8"
                >
                  <Sparkles className="w-4 h-4 text-[#0091a4]" />
                  <span className="text-xs font-bold text-[#0091a4] uppercase tracking-wider">
                    Booking Confirmed
                  </span>
                </motion.div>

                {/* Success Icon with Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.4
                  }}
                  className="mb-6 sm:mb-8 relative"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto">
                    {/* Pulsing Ring */}
                    <motion.div
                      className="absolute inset-0 bg-[#0091a4] rounded-full opacity-20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Main Icon Circle */}
                    <div className="absolute inset-0 bg-[#0091a4] rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-black" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight"
                >
                  Meeting Scheduled{' '}
                  <span className="text-[#0091a4] block sm:inline">Successfully!</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-black/70 mb-6 sm:mb-8 leading-relaxed"
                >
                  Thank you for booking a consultation with Cypentra.
                  We've sent a confirmation email with all the meeting details.
                </motion.p>

                {/* Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                  <div className="bg-black/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-black/10">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] mb-2 mx-auto sm:mx-0" />
                    <p className="text-xs sm:text-sm font-semibold text-black mb-1">Calendar Invite</p>
                    <p className="text-xs text-black/60">Check your email</p>
                  </div>
                  <div className="bg-black/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-black/10">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] mb-2 mx-auto sm:mx-0" />
                    <p className="text-xs sm:text-sm font-semibold text-black mb-1">Confirmation Sent</p>
                    <p className="text-xs text-black/60">To your inbox</p>
                  </div>
                  <div className="bg-black/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-black/10">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] mb-2 mx-auto sm:mx-0" />
                    <p className="text-xs sm:text-sm font-semibold text-black mb-1">24/7 Support</p>
                    <p className="text-xs text-black/60">We're here to help</p>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm sm:text-base text-black/60 mb-6 sm:mb-8 leading-relaxed"
                >
                  Our team will connect with you at the scheduled time to discuss
                  how we can help with your security requirements.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link
                    href="/"
                    className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-black hover:bg-[#0091a4] text-white hover:text-black border-2 border-black rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,145,164,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] hover:scale-105"
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Back to Homepage</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </Link>

                  <Link
                    href="/services"
                    className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-white hover:bg-black text-black hover:text-white border-2 border-black rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] hover:scale-105"
                  >
                    <span>Explore Our Services</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 sm:mt-8 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-[#0091a4]/20 p-4 sm:p-6 text-center"
            >
              <p className="text-xs sm:text-sm text-white/60">
                Need to reschedule? Check your confirmation email for instructions or{' '}
                <Link href="/contact" className="text-[#0091a4] hover:text-[#0091a4]/80 underline font-semibold">
                  contact us
                </Link>
                {' '}directly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
