'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Shield,
  Award,
  Heart,
  ArrowUpRight,
  Mail,
  Download,
  Settings
} from 'lucide-react'

const Footer = () => {
  const [cookieConsent, setCookieConsent] = useState(null)
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [showCookiePreferences, setShowCookiePreferences] = useState(false)

  useEffect(() => {
    // Load cookie consent from localStorage
    const saved = localStorage.getItem('cookieConsent')
    if (saved) {
      setCookieConsent(JSON.parse(saved))
    } else {
      setShowCookieBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    setCookieConsent(consent)
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowCookieBanner(false)
  }

  const handleDeclineAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    setCookieConsent(consent)
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowCookieBanner(false)
  }

  const handleCustomize = () => {
    setShowCookieBanner(false)
    setShowCookiePreferences(true)
  }

  const handleManageCookies = () => {
    setShowCookiePreferences(true)
  }

  const handleSavePreferences = (preferences) => {
    setCookieConsent(preferences)
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    setShowCookiePreferences(false)
  }

  const footerSections = [
    {
      title: 'Social Media',
      links: [
        {
          label: 'X (Twitter)',
          href: 'https://x.com/cypentra?s=21',
          external: true
        },
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/sam-josefi-615b9537a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
          external: true
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/cypentra/',
          external: true
        },
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/Cypentra',
          external: true
        }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Security Assessments', href: '/services' },
        { label: 'SOC 2 Compliance', href: '/services' },
        { label: '24/7 Monitoring', href: '/services' },
        { label: 'vCISO Services', href: '/services' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'SOC 2 Starter Kit', href: '/resources' },
        { label: 'Security Guides', href: '/resources' },
        {
          label: 'Contact',
          href: '/contact'
        },
        {
          label: 'Download Privacy Notice',
          href: '/assets/privacy-notice.pdf',
          download: true
        }
      ]
    },
    {
      title: 'Legal & Privacy',
      links: [
        {
          label: 'Privacy Policy',
          href: '/privacy-policy'
        },
        {
          label: 'Terms of Service',
          href: '/terms-of-service'
        },
        {
          label: 'Download Cookie Policy',
          href: '/assets/cookie_policy.pdf',
          download: true
        },
        {
          label: 'Manage Cookie Preferences',
          href: '#',
          action: 'cookie',
          onClick: handleManageCookies
        }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/cypentra?s=21', label: 'X (Twitter)' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sam-josefi-615b9537a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/cypentra/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/Cypentra', label: 'Facebook' }
  ]

  const badges = [
    { icon: Shield, label: 'SOC 2 Certified' },
    { icon: Award, label: 'ISO 27001' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <>
      <footer className='w-full bg-black relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#0091a4]/5 rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#0091a4]/5 rounded-full blur-3xl' />
        </div>

        <div className='relative z-10'>
          {/* CTA Section */}
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 border-b border-white/10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center'
            >
              {/* CTA Content */}
              <div>
                <div className='inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-[#0091a4]/20 rounded-full mb-2 sm:mb-3 md:mb-4'>
                  <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0091a4] animate-pulse' />
                  <span className='text-xs font-bold text-[#0091a4] uppercase tracking-wider'>Available Now</span>
                </div>
                <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight'>
                  Need Security Help?
                </h3>
                <p className='text-xs sm:text-sm md:text-base lg:text-lg text-white/60 mb-0 leading-relaxed'>
                  Book a consultation with our experts to discuss your security needs.
                </p>
              </div>

              {/* CTA Button */}
              <div className='flex justify-start md:justify-end'>
                <motion.a
                  href='/cypentra-consultation'
                  whileHover={{ x: 3 }}
                  className='inline-flex items-center gap-2 text-[#0091a4] hover:text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg group'
                >
                  <span>Get Started</span>
                  <ArrowUpRight className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Main Footer Content */}
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16'>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10'
            >
              {/* Brand Section */}
              <motion.div variants={itemVariants} className='lg:col-span-4'>
                {/* Logo */}
                <div className='relative w-24 h-10 sm:w-28 sm:h-12 md:w-32 md:h-14 mb-4 sm:mb-5 md:mb-6'>
                  <Image
                    src='/logo.png'
                    alt='Cypentra Logo'
                    fill
                    className='object-contain object-left'
                    priority
                    style={{
                      filter: 'brightness(1.05) contrast(1.15) saturate(1.4) hue-rotate(15deg)',
                    }}
                  />
                </div>

                <p className='text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-4 sm:mb-5 md:mb-6'>
                  Cybersecurity consulting built for modern SaaS businesses. Fast, reliable, and focused on enabling your growth.
                </p>

                {/* Payment Methods */}
                <div className='mb-4 sm:mb-5 md:mb-6'>
                  <p className='text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 sm:mb-3'>
                    Secure Payments
                  </p>
                  <Image
                    src='/payment-icons.png'
                    alt='Accepted payment methods'
                    width={200}
                    height={32}
                    className='h-6 sm:h-7 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity'
                  />
                </div>

                {/* Certifications */}
                <div className='space-y-2 sm:space-y-2.5 mb-4 sm:mb-5 md:mb-6'>
                  {badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className='flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:border-[#0091a4]/50 transition-all cursor-pointer group'
                    >
                      <div className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-[#0091a4]/20 flex items-center justify-center group-hover:bg-[#0091a4]/30 transition-all shrink-0'>
                        <badge.icon className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0091a4]' />
                      </div>
                      <span className='text-xs sm:text-sm md:text-base text-white/80 font-medium'>{badge.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className='flex items-center gap-2 sm:gap-2.5'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ y: -3 }}
                      className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#0091a4] hover:text-black hover:border-[#0091a4] transition-all'
                      title={social.label}
                    >
                      <social.icon className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Footer Links Sections */}
              {footerSections.map((section, index) => (
                <motion.div key={index} variants={itemVariants} className='lg:col-span-2'>
                  <h3 className='text-white font-bold text-xs uppercase tracking-widest mb-3 sm:mb-4 md:mb-5 flex items-center gap-2'>
                    {section.title}
                    <span className='w-4 sm:w-5 md:w-6 h-0.5 bg-gradient-to-r from-[#0091a4] to-transparent' />
                  </h3>
                  <ul className='space-y-2 sm:space-y-2.5 md:space-y-3'>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.action === 'cookie' ? (
                          <button
                            onClick={link.onClick}
                            className='text-white/60 hover:text-white text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center gap-2 group w-full text-left'
                          >
                            <span className='w-1 h-1 rounded-full bg-[#0091a4] opacity-0 group-hover:opacity-100 transition-all' />
                            <span className='group-hover:translate-x-1 transition-transform flex items-center gap-1.5'>
                              {link.label}
                              <Settings className='w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50' />
                            </span>
                          </button>
                        ) : link.download ? (
                          <a
                            href={link.href}
                            download
                            className='text-white/60 hover:text-white text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center gap-2 group'
                          >
                            <span className='w-1 h-1 rounded-full bg-[#0091a4] opacity-0 group-hover:opacity-100 transition-all' />
                            <span className='group-hover:translate-x-1 transition-transform flex items-center gap-1.5'>
                              {link.label}
                              <Download className='w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50' />
                            </span>
                          </a>
                        ) : link.external ? (
                          <a
                            href={link.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-white/60 hover:text-white text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center gap-2 group'
                          >
                            <span className='w-1 h-1 rounded-full bg-[#0091a4] opacity-0 group-hover:opacity-100 transition-all' />
                            <span className='group-hover:translate-x-1 transition-transform'>{link.label}</span>
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className='text-white/60 hover:text-white text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center gap-2 group'
                          >
                            <span className='w-1 h-1 rounded-full bg-[#0091a4] opacity-0 group-hover:opacity-100 transition-all' />
                            <span className='group-hover:translate-x-1 transition-transform'>{link.label}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

            </motion.div>

            {/* Cookie Status Indicator */}
            {cookieConsent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 md:p-5 bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-700/50 backdrop-blur-sm'
              >
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-2 sm:gap-3'>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <div className='w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0'>
                      <svg
                        className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <span className='text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed'>
                      Cookie preferences saved: Essential ({cookieConsent.essential ? 'On' : 'Off'}), Analytics ({cookieConsent.analytics ? 'On' : 'Off'}), Marketing ({cookieConsent.marketing ? 'On' : 'Off'}), Functional ({cookieConsent.functional ? 'On' : 'Off'})
                    </span>
                  </div>
                  <button
                    onClick={handleManageCookies}
                    className='text-xs sm:text-sm text-[#0091a4] hover:text-white font-medium transition-colors'
                  >
                    Change Settings
                  </button>
                </div>
              </motion.div>
            )}

            {/* Divider */}
            <div className='h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 sm:mb-5 md:mb-6' />

            {/* Bottom Section */}
            <motion.div
              variants={itemVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 text-center sm:text-left'
            >
              <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-white/50'>
                <span>© 2025 Cypentra. All rights reserved.</span>
                <span className='hidden sm:block w-1 h-1 rounded-full bg-white/30' />
                <div className='flex items-center gap-1.5 sm:gap-2'>
                  <span>Built with</span>
                  <Heart className='w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#0091a4] fill-[#0091a4] animate-pulse' />
                  <span>for security</span>
                </div>
              </div>

              <div className='flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base text-white/50'>
                <Link href='/privacy-policy' className='hover:text-[#0091a4] transition-colors'>Privacy</Link>
                <span className='w-1 h-1 rounded-full bg-white/30' />
                <Link href='/terms-of-service' className='hover:text-[#0091a4] transition-colors'>Terms</Link>
                <span className='hidden md:block w-1 h-1 rounded-full bg-white/30' />
                <span className='hidden md:inline'>Trusted by SaaS teams worldwide • Committed to your compliance</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className='fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 md:p-6 bg-gray-900 border-t border-gray-800 shadow-2xl'
        >
          <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6'>
            <div className='flex-1'>
              <h4 className='text-white font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3'>Cookie Preferences</h4>
              <p className='text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed'>
                We use cookies to enhance your browsing experience and analyze site traffic. You can accept all, decline non-essential, or customize your preferences.
              </p>
            </div>
            <div className='flex gap-2 sm:gap-3 flex-wrap w-full sm:w-auto'>
              <button
                onClick={handleDeclineAll}
                className='px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base text-white/70 hover:text-white border border-white/20 rounded-lg sm:rounded-xl transition-colors flex-1 sm:flex-none'
              >
                Decline All
              </button>
              <button
                onClick={handleCustomize}
                className='px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base text-white/70 hover:text-white border border-white/20 rounded-lg sm:rounded-xl transition-colors flex-1 sm:flex-none'
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className='px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-[#0091a4] hover:bg-white text-black font-semibold rounded-lg sm:rounded-xl transition-colors flex-1 sm:flex-none'
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cookie Preferences Modal */}
      {showCookiePreferences && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto'
          >
            <div className='flex items-center justify-between mb-4 sm:mb-5 md:mb-6'>
              <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white'>Cookie Preferences</h3>
              <button
                onClick={() => setShowCookiePreferences(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='space-y-4 sm:space-y-5 md:space-y-6 mb-4 sm:mb-5 md:mb-6'>
              {[
                { key: 'essential', label: 'Essential Cookies', description: 'Required for the site to function properly. Cannot be disabled.', required: true },
                { key: 'analytics', label: 'Analytics Cookies', description: 'Help us understand how visitors interact with our website.' },
                { key: 'marketing', label: 'Marketing Cookies', description: 'Used to deliver personalized advertisements and track campaign performance.' },
                { key: 'functional', label: 'Functional Cookies', description: 'Enable enhanced functionality and personalization.' }
              ].map((cookie) => (
                <div key={cookie.key} className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-700/50'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1 sm:mb-2'>
                      <h4 className='text-white font-semibold text-sm sm:text-base md:text-lg'>{cookie.label}</h4>
                      {cookie.required && <span className='text-xs text-gray-500'>(Required)</span>}
                    </div>
                    <p className='text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed'>{cookie.description}</p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer sm:ml-4 flex-shrink-0'>
                    <input
                      type='checkbox'
                      checked={cookieConsent?.[cookie.key] ?? false}
                      disabled={cookie.required}
                      onChange={(e) => {
                        const newConsent = { ...cookieConsent, [cookie.key]: e.target.checked }
                        setCookieConsent(newConsent)
                      }}
                      className='sr-only peer'
                    />
                    <div className={`w-10 h-5 sm:w-11 sm:h-6 ${cookie.required ? 'bg-[#0091a4]' : 'bg-gray-700'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all ${cookie.required ? 'cursor-not-allowed' : 'cursor-pointer'}`}></div>
                  </label>
                </div>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end'>
              <button
                onClick={() => setShowCookiePreferences(false)}
                className='px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base text-white/70 hover:text-white border border-white/20 rounded-lg sm:rounded-xl transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePreferences(cookieConsent)}
                className='px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-[#0091a4] hover:bg-white text-black font-semibold rounded-lg sm:rounded-xl transition-colors'
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Footer
