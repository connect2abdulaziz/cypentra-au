'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'
import Loader from '@/components/common/Loader/Loader'

export default function CypentraConsultation() {
  const [isWidgetLoading, setIsWidgetLoading] = useState(true)

  useEffect(() => {
    // Fire GTM dataLayer event for tracking consultation page visit
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []

      window.dataLayer.push({
        event: 'consultation_page_view',
        page_title: 'Consultation Booking',
        page_path: '/cypentra-consultation',
      })
    }

    // Hide scrollbars in Calendly widget after it loads
    const hideCalendlyScrollbars = () => {
      const calendlyWidget = document.querySelector('.calendly-inline-widget')
      if (calendlyWidget) {
        // Apply CSS to hide scrollbars on the widget container
        calendlyWidget.style.overflow = 'hidden'
        calendlyWidget.style.setProperty('-ms-overflow-style', 'none', 'important')
        calendlyWidget.style.setProperty('scrollbar-width', 'none', 'important')

        // Try to access iframe (may be blocked by CORS)
        const iframe = calendlyWidget.querySelector('iframe')
        if (iframe) {
          // Hide scrollbars via CSS on iframe
          iframe.style.overflow = 'hidden'
          iframe.style.setProperty('-ms-overflow-style', 'none', 'important')
          iframe.style.setProperty('scrollbar-width', 'none', 'important')

          try {
            // This might not work due to CORS, but we try
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
            if (iframeDoc) {
              const style = iframeDoc.createElement('style')
              style.textContent = `
                * {
                  -ms-overflow-style: none !important;
                  scrollbar-width: none !important;
                }
                *::-webkit-scrollbar {
                  display: none !important;
                }
                body {
                  overflow: hidden !important;
                }
              `
              iframeDoc.head.appendChild(style)
            }
          } catch (e) {
            // CORS blocked - this is expected for external iframes
            // Scrollbars are hidden via CSS on the iframe element itself
          }
        }
      }
    }

    // Check when Calendly widget is loaded
    const checkWidgetLoaded = () => {
      const calendlyWidget = document.querySelector('.calendly-inline-widget')
      const iframe = calendlyWidget?.querySelector('iframe')

      // Check if iframe exists and has loaded content
      if (iframe) {
        // Check if iframe has loaded by checking its src or onload
        if (iframe.src && iframe.src.includes('calendly.com')) {
          // Widget is loaded
          setIsWidgetLoading(false)
          hideCalendlyScrollbars()
          return true
        }

        // Also check if iframe has content loaded
        try {
          if (iframe.contentWindow && iframe.contentWindow.document) {
            setIsWidgetLoading(false)
            hideCalendlyScrollbars()
            return true
          }
        } catch (e) {
          // CORS - can't access, but iframe exists means it's loading
        }
      }
      return false
    }

    // Use MutationObserver to detect when iframe is added to DOM
    const calendlyWidget = document.querySelector('.calendly-inline-widget')
    let observer = null

    if (calendlyWidget) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            // Check if iframe was added
            const iframe = calendlyWidget.querySelector('iframe')
            if (iframe) {
              // Wait a bit for iframe to load
              setTimeout(() => {
                setIsWidgetLoading(false)
                hideCalendlyScrollbars()
              }, 1000)

              // Also listen for iframe load event
              iframe.addEventListener('load', () => {
                setIsWidgetLoading(false)
                hideCalendlyScrollbars()
              })
            }
          }
        })
      })

      observer.observe(calendlyWidget, {
        childList: true,
        subtree: true
      })
    }

    // Also try to detect when widget loads via polling
    const checkInterval = setInterval(() => {
      if (checkWidgetLoaded()) {
        clearInterval(checkInterval)
        if (observer) observer.disconnect()
      }
    }, 500)

    // Listen for Calendly page event if available
    const handleCalendlyEvent = (e) => {
      if (e.data && e.data.event && e.data.event.indexOf('calendly') === 0) {
        setIsWidgetLoading(false)
        hideCalendlyScrollbars()
      }
    }

    window.addEventListener('message', handleCalendlyEvent)

    // Fallback: hide loader after max wait time
    const maxWaitTimeout = setTimeout(() => {
      setIsWidgetLoading(false)
      hideCalendlyScrollbars()
      clearInterval(checkInterval)
      if (observer) observer.disconnect()
    }, 10000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(maxWaitTimeout)
      if (observer) observer.disconnect()
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black grid-background">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base md:text-lg font-medium">Back to Home</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-4 sm:mb-6">
            <span className="text-xs font-bold text-[#0091a4] uppercase tracking-wider">
              Book Consultation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Schedule Your <span className="text-[#0091a4]">Consultation</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Choose a time that works best for you. Our team is ready to discuss your security needs.
          </p>
        </motion.div>

        {/* Calendly Inline Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#0091a4] shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] md:shadow-[8px_8px_0px_0px_rgba(0,145,164,1)] p-4 sm:p-6 md:p-8 relative"
        >
          {/* Loading State */}
          {isWidgetLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl sm:rounded-2xl md:rounded-3xl z-10">
              <Loader size="lg" text="Loading calendar..." />
            </div>
          )}

          <div
            className="calendly-inline-widget scrollbar-hide"
            data-url="https://calendly.com/cypentra-consultation/30min"
            style={{
              minWidth: '320px',
              height: '700px',
              overflow: 'hidden',
              position: 'relative'
            }}
          />
        </motion.div>
      </div>

      {/* Load Calendly Script */}
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <Footer />
    </div>
  )
}

