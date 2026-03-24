'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Zap, Shield, ChevronDown, Download, ArrowRight, ShoppingCart } from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'
import FloatingCheckout from '@/components/Cart/FloatingCheckout'
import { useCart } from '@/contexts/CartContext'

const Packages = () => {
  const [expandedDetails, setExpandedDetails] = useState({})
  const { addToCart, isInCart, getCartCount } = useCart()
  const formatPrice = (value) => new Intl.NumberFormat('en-US').format(value)

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Check if package is one-time (can be added to cart)
  const isOneTimePackage = (pkg) => {
    return pkg.priceUnit && !pkg.priceUnit.startsWith('/') && pkg.priceUnit !== 'Ongoing engagement' && pkg.priceUnit !== 'Comprehensive program'
  }

  // Check if package is monthly
  const isMonthlyPackage = (pkg) => {
    return pkg.priceUnit && pkg.priceUnit.startsWith('/month')
  }

  const handleGetStarted = (pkg) => {
    if (isOneTimePackage(pkg)) {
      // Add to cart for one-time packages
      addToCart({
        id: pkg.id,
        title: pkg.title,
        price: pkg.price,
        priceUnit: pkg.priceUnit,
        duration: pkg.duration
      })
    } else if (isMonthlyPackage(pkg)) {
      // Direct checkout for monthly packages
      window.location.href = `/checkout?package=${pkg.id}`
    }
  }

  // Map package IDs to PDF filenames
  const packageIdToPdf = {
    1: 'Cypentra_CloudSecurity_StarterPack_Detailed_NDA_2.pdf', // Cloud Security Starter Pack
    3: 'Cypentra_vCISO_Lite_2.pdf', // vCISO Lite (On Demand)
    4: 'Cypentra_SOC2_Readiness_Program_Ultra_2.pdf', // SOC 2 Readiness Program
    5: 'Cypentra_vCISO_Enterprise_Ultra_2.pdf', // Enterprise vCISO
    6: 'Cypentra_PenTest_Advanced.pdf', // Advanced Penetration Testing
    7: 'Cypentra_SOC2_LitePrep_Enterprise_Expanded_WithLogo_2.pdf' // SOC 2 Lite Prep
  }

  const handleLearnMore = (packageId) => {
    const pdfFilename = packageIdToPdf[packageId]
    if (!pdfFilename) {
      console.warn(`No PDF found for package ID: ${packageId}`)
      return
    }
    
    const pdfPath = `/packages/${pdfFilename}`
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = pdfFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const litePackages = [
    {
      id: 1,
      title: 'Cloud Security Foundation',
      price: 2500,
      priceUnit: 'One-time project',
      duration: 'Typical delivery: 1-2 weeks',
      description: 'Secure AWS, Azure, or GCP environments with essential security controls',
      pricingNote: 'Fixed scope • Clear deliverables • No hidden costs',
      features: [
        'IAM configuration & MFA',
        'Logging & monitoring baseline',
        'Security hardening checklist',
        'Cloud architecture review'
      ],
      detailedDescription: 'Secure your cloud environment with a fixed-scope engagement focused on identity, visibility, and baseline hardening. You will receive clear deliverables and practical guidance to improve security quickly without slowing your team.',
      ctaText: 'Get Started',
      bestFor: 'Best for: Early-stage teams',
      badge: null,
      location: 'EU/US',
      icon: Shield
    },
    {
      id: 7,
      title: 'SOC 2 / ISO 27001 Gap Assessment',
      price: 3500,
      priceUnit: 'One-time project',
      duration: 'Typical delivery: 2-3 weeks',
      description: 'Understand your current posture and what’s required for compliance',
      pricingNote: 'Fixed scope • Clear deliverables • No hidden costs',
      features: [
        'Gap analysis against SOC 2 / ISO 27001',
        'Risk identification',
        'Actionable roadmap',
        'Summary report'
      ],
      detailedDescription: 'This service identifies your current compliance gaps and translates them into a clear, prioritized plan. You will understand exactly what needs to be implemented for SOC 2 or ISO 27001 readiness and how to move forward with confidence.',
      ctaText: 'Request Assessment',
      bestFor: 'Best for: Teams preparing for compliance',
      badge: null,
      location: null,
      icon: Shield
    },
    {
      id: 3,
      title: 'vCISO Advisory (Lite)',
      price: 3000,
      priceUnit: '/month',
      duration: 'Cancel anytime',
      description: 'Ongoing security guidance and support',
      pricingNote: 'Fixed scope • Clear deliverables • No hidden costs',
      features: [
        'Monthly advisory sessions',
        'Policy guidance',
        'Risk & incident support',
        'Priority email support'
      ],
      detailedDescription: 'Get ongoing expert support to guide policy decisions, manage risk, and strengthen your security posture each month. This is ideal for growing teams that need strategic direction without hiring a full-time security leader.',
      ctaText: 'Get Started',
      bestFor: 'Best for: Growing teams needing ongoing guidance',
      badge: 'Most Flexible',
      location: null,
      icon: Zap
    }
  ]

  const advancedPackages = [
    {
      id: 4,
      title: 'SOC 2 / ISO 27001 Readiness Program',
      price: 'Custom Pricing',
      priceUnit: 'Comprehensive program',
      duration: '3–6 months',
      description: 'End-to-end preparation for audit readiness and compliance',
      pricingNote: 'End-to-end compliance preparation',
      features: [
        'Full gap remediation',
        'Policy & control implementation',
        'Evidence collection',
        'Audit preparation'
      ],
      detailedDescription: 'Complete readiness support from remediation through audit preparation. We help your team build and operationalize controls, collect evidence, and prepare confidently for formal compliance assessments.',
      ctaText: 'Book a Compliance Call',
      badge: 'Most Popular',
      icon: Sparkles
    },
    {
      id: 5,
      title: 'Enterprise vCISO',
      price: 'Custom Pricing',
      priceUnit: 'Ongoing engagement',
      duration: 'Monthly retainer',
      description: 'Dedicated security leadership and strategic guidance for your organization',
      pricingNote: 'Dedicated security leadership and strategy',
      features: [
        'Security roadmap',
        'Board-level reporting',
        'Risk & compliance oversight',
        'Incident response leadership'
      ],
      detailedDescription: 'Access executive-level security leadership with ongoing strategic guidance, governance oversight, and reporting. This service supports scaling organizations that need mature security direction and accountability.',
      ctaText: 'Book a Compliance Call',
      badge: null,
      icon: Shield
    },
    {
      id: 6,
      title: 'Penetration Testing & Validation',
      price: 'Custom Pricing',
      priceUnit: 'One-time assessment',
      duration: '2–4 weeks',
      description: 'Validate your security posture before audits and client reviews',
      features: [
        'Web & API testing',
        'Internal testing',
        'Security validation',
        'Detailed reporting'
      ],
      detailedDescription: 'Validate real-world resilience with practical testing across your applications and infrastructure. You will receive clear findings and reporting to support remediation and stakeholder confidence.',
      ctaText: 'Book a Compliance Call',
      badge: null,
      icon: Zap
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <section className='w-full grid-background min-h-screen relative overflow-hidden'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10'>
        <Navbar />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 pt-6 sm:pt-8 md:pt-12'
        >

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white my-6 leading-tight'>
            Security &amp; Compliance <span className='text-[#0091a4]'>Services</span>
          </h1>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4'>
            Structured services designed to help Australian SaaS and cloud teams achieve security and compliance with clarity and speed.
          </p>
        </motion.div>

        {/* Lite Packages Section */}
        <div className='mb-16 sm:mb-20 md:mb-24 lg:mb-32'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-8 sm:mb-10 md:mb-12 lg:mb-16 relative'
          >
            <div className='flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4'>
              <div className='h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-[#0091a4] to-transparent'></div>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>Foundation Services</h2>
            </div>
            <p className='text-sm sm:text-base md:text-lg text-gray-300 ml-14 sm:ml-20 md:ml-24'>For teams starting their security and compliance journey</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12'
          >
            {litePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className='group relative'
              >
                {/* Glow Effect */}
                <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0091a4] via-white to-[#0091a4] opacity-0 group-hover:opacity-30 rounded-2xl sm:rounded-3xl blur-xl transition duration-500'></div>

                <div className='relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 hover:border-[#0091a4] transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-2xl group-hover:shadow-[#0091a4]/20'>
                  {/* Badge */}
                  {pkg.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                      className='absolute -top-3 -right-3 sm:-top-4 sm:-right-4'
                    >
                      <span className='bg-[#0091a4] text-black text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-1'>
                        {pkg.badge}
                      </span>
                    </motion.div>
                  )}

                  {/* Location Badge */}
                  {pkg.location && (
                    <div className='mb-3 sm:mb-4'>
                      <span className='bg-gradient-to-r from-[#0091a4]/10 to-[#0091a4]/5 text-[#0091a4] border border-[#0091a4]/20 text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full'>
                        {pkg.location}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className='w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0091a4] to-[#007a8a] flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#0091a4]/20'>
                    <pkg.icon className='w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-white' />
                  </div>

                  {/* Title */}
                  <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 group-hover:text-black/80 transition-colors leading-tight'>
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className='mb-4 sm:mb-5 md:mb-6'>
                    <div className='flex items-baseline gap-1.5 sm:gap-2 mb-1'>
                      <span className='text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent'>
                        {typeof pkg.price === 'number' ? `From €${formatPrice(pkg.price)}` : pkg.price}
                      </span>
                      {pkg.priceUnit.startsWith('/') && (
                        <span className='text-base sm:text-lg text-[#0091a4] font-semibold'>
                          {pkg.priceUnit}
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 flex-wrap'>
                      <span>{pkg.priceUnit.startsWith('/') ? pkg.duration : pkg.priceUnit}</span>
                      <span className='w-1 h-1 rounded-full bg-[#0091a4]'></span>
                      <span>{pkg.priceUnit.startsWith('/') ? '' : pkg.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-xs sm:text-sm text-black/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed'>
                    {pkg.description}
                  </p>
                  {pkg.pricingNote && (
                    <p className='text-xs sm:text-sm text-black/60 mb-4 sm:mb-5'>
                      {pkg.pricingNote}
                    </p>
                  )}

                  {/* Features */}
                  <div className='mb-4 sm:mb-5 md:mb-6 flex-grow space-y-2 sm:space-y-2.5 md:space-y-3'>
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 + idx * 0.05 }}
                        className='flex items-start gap-2 sm:gap-2.5 md:gap-3'
                      >
                        <div className='w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 rounded-full bg-[#0091a4] flex items-center justify-center flex-shrink-0 mt-0.5'>
                          <Check className='w-2.5 sm:w-3 h-2.5 sm:h-3 text-black' />
                        </div>
                        <span className='text-xs sm:text-sm text-black/80 leading-relaxed'>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* See More Details Button */}
                  <button
                    onClick={() => toggleDetails(pkg.id)}
                    className='w-full mb-3 sm:mb-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-black/60 hover:text-black transition-colors'
                  >
                    <span>See More Details</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedDetails[pkg.id] ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedDetails[pkg.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden mb-4 sm:mb-5 md:mb-6'
                      >
                        <div className='text-xs sm:text-sm text-black/70 leading-relaxed mb-4 whitespace-pre-line'>
                          {pkg.detailedDescription}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className='space-y-2 sm:space-y-2.5 md:space-y-3 mt-auto'>
                    <button
                      onClick={() => handleGetStarted(pkg)}
                      disabled={
                        (isOneTimePackage(pkg) && isInCart(pkg.id)) || 
                        (isMonthlyPackage(pkg) && getCartCount() > 0)
                      }
                      className={`w-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group/btn ${
                        (isOneTimePackage(pkg) && isInCart(pkg.id)) || 
                        (isMonthlyPackage(pkg) && getCartCount() > 0)
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                          : 'bg-gradient-to-r from-black to-gray-800 text-white hover:from-[#0091a4] hover:to-[#007a8a] hover:shadow-xl hover:shadow-[#0091a4]/30'
                      }`}
                    >
                      {isOneTimePackage(pkg) && isInCart(pkg.id) ? (
                        <>
                          <ShoppingCart className='w-3 sm:w-4 h-3 sm:h-4' />
                          <span>Added to Cart</span>
                        </>
                      ) : isMonthlyPackage(pkg) && getCartCount() > 0 ? (
                        <>
                          <span>Cart Required Empty</span>
                        </>
                      ) : (
                        <>
                          <span>{pkg.ctaText || (isOneTimePackage(pkg) ? 'Add to Cart' : 'Get Started')}</span>
                          <ArrowRight className='w-3 sm:w-4 h-3 sm:h-4 group-hover/btn:translate-x-1 transition-transform' />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleLearnMore(pkg.id)}
                      className='w-full bg-white text-black border-2 border-gray-300 hover:border-[#0091a4] hover:bg-[#0091a4]/5 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:text-[#0091a4]'
                    >
                      <Download className='w-3 sm:w-4 h-3 sm:h-4' />
                      <span>View Details</span>
                    </button>
                    <p className='text-[11px] text-center text-black/60'>
                      30-minute call • No obligation • Clear next steps
                    </p>
                  </div>
                  {pkg.bestFor && (
                    <p className='text-xs text-black/60 text-center mt-3'>
                      {pkg.bestFor}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='text-center space-y-1.5 sm:space-y-2 px-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10'
          >
            <p className='text-xs sm:text-sm text-gray-300'>
              Prices shown are starting rates. Final pricing may vary based on specific requirements.
            </p>
            <p className='text-xs text-gray-400'>
              Note: Some packages cannot be selected together due to service overlap
            </p>
          </motion.div>
        </div>

        {/* Advanced Packages Section */}
        <div className='pb-12 sm:pb-16 md:pb-20 lg:pb-24 relative'>
          {/* Section Background Accent */}
          <div className='absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-[#0091a4]/30 to-transparent mb-16'></div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-8 sm:mb-10 md:mb-12 lg:mb-16 mt-12 relative'
          >
            <div className='flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4'>
              <div className='h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-[#0091a4] to-transparent'></div>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>Advanced Services</h2>
            </div>
            <p className='text-sm sm:text-base md:text-lg text-gray-300 ml-14 sm:ml-20 md:ml-24'>End-to-end compliance and security support tailored to your organization</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12'
          >
            {advancedPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className='group relative'
              >
                {/* Glow Effect - Enhanced for Advanced */}
                <div className='absolute -inset-1 bg-gradient-to-r from-[#0091a4]/20 via-white to-[#0091a4]/20 opacity-0 group-hover:opacity-40 rounded-2xl sm:rounded-3xl blur-xl transition duration-500'></div>

                <div className='relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 hover:border-[#0091a4] transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-2xl group-hover:shadow-[#0091a4]/20'>
                  {/* Badge */}
                  {pkg.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                      className='absolute -top-3 -right-3 sm:-top-4 sm:-right-4'
                    >
                      <span className='bg-[#0091a4] text-white text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl flex items-center gap-1 border-2 border-[#0091a4]'>
                        {pkg.badge}
                      </span>
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className='w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0091a4] to-[#007a8a] flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#0091a4]/20'>
                    <pkg.icon className='w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-white' />
                  </div>

                  {/* Title */}
                  <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 leading-tight'>
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className='mb-4 sm:mb-5 md:mb-6'>
                    <span className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent'>
                      {pkg.price}
                    </span>
                    <div className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mt-1 flex-wrap'>
                      <span>{pkg.priceUnit}</span>
                      <span className='w-1 h-1 rounded-full bg-[#0091a4]'></span>
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='text-xs sm:text-sm text-black/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed'>
                    {pkg.description}
                  </p>
                  {pkg.pricingNote && (
                    <p className='text-xs sm:text-sm text-black/60 mb-4 sm:mb-5'>
                      {pkg.pricingNote}
                    </p>
                  )}

                  {/* Features */}
                  <div className='mb-4 sm:mb-5 md:mb-6 flex-grow space-y-2 sm:space-y-2.5 md:space-y-3'>
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 + idx * 0.05 }}
                        className='flex items-start gap-2 sm:gap-2.5 md:gap-3'
                      >
                        <div className='w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 rounded-full bg-[#0091a4] flex items-center justify-center flex-shrink-0 mt-0.5'>
                          <Check className='w-2.5 sm:w-3 h-2.5 sm:h-3 text-white' />
                        </div>
                        <span className='text-xs sm:text-sm text-black/80 leading-relaxed'>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* See More Details Button */}
                  <button
                    onClick={() => toggleDetails(pkg.id)}
                    className='w-full mb-3 sm:mb-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-black/60 hover:text-black transition-colors'
                  >
                    <span>See More Details</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedDetails[pkg.id] ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedDetails[pkg.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden mb-4 sm:mb-5 md:mb-6'
                      >
                        <div className='text-xs sm:text-sm text-black/70 leading-relaxed mb-4 whitespace-pre-line'>
                          {pkg.detailedDescription}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className='space-y-2 sm:space-y-2.5 md:space-y-3 mt-auto'>
                    <button
                      onClick={() => window.location.href = '/cypentra-consultation'}
                      className='w-full bg-gradient-to-r from-black to-gray-800 text-white hover:from-[#0091a4] hover:to-[#007a8a] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#0091a4]/30 border-2 border-transparent hover:border-[#0091a4] flex items-center justify-center gap-2 group/btn'
                    >
                      <span>{pkg.ctaText || 'Book a Compliance Call'}</span>
                      <ArrowRight className='w-3 sm:w-4 h-3 sm:h-4 group-hover/btn:translate-x-1 transition-transform' />
                    </button>
                    <button
                      onClick={() => handleLearnMore(pkg.id)}
                      className='w-full bg-white text-black border-2 border-gray-300 hover:border-[#0091a4] hover:bg-[#0091a4]/5 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:text-[#0091a4]'
                    >
                      <Download className='w-3 sm:w-4 h-3 sm:h-4' />
                      <span>View Details</span>
                    </button>
                    <p className='text-[11px] text-center text-black/60'>
                      30-minute call • No obligation • Clear next steps
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className='text-center space-y-1.5 sm:space-y-2 px-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10'
          >
            <p className='text-xs sm:text-sm text-gray-300'>
              All advanced packages include dedicated support and custom implementation
            </p>
            <p className='text-xs sm:text-sm text-white font-medium'>
              Contact us for a personalized quote based on your specific needs
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
      <FloatingCheckout />
    </section>
  )
}

export default Packages
