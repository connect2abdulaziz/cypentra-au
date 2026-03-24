'use client'

import React, { useState } from 'react'
import { ArrowUpRight, Calendar, ChevronDown, Download, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [expandedDetails, setExpandedDetails] = useState({})
  const { addToCart, isInCart, getCartCount } = useCart()
  const formatPrice = (price) => new Intl.NumberFormat('en-US').format(price)

  const toggleDetails = (itemId) => {
    setExpandedDetails(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  // Map Pricing item IDs to Packages page IDs
  const itemIdToPackageId = {
    'cloud-starter': 1,
    'gdpr-setup': 2,
    'soc2-lite-prep': 7,
    'vciso-lite': 3
  }

  // Check if package is one-time (can be added to cart)
  const isOneTimePackage = (item) => {
    return item.period === 'one-time'
  }

  // Check if package is monthly
  const isMonthlyPackage = (item) => {
    return item.period === 'monthly'
  }

  const handleGetStarted = (item) => {
    const packageId = itemIdToPackageId[item.id]

    if (isOneTimePackage(item) && packageId) {
      // Add to cart for one-time packages
      addToCart({
        id: packageId,
        title: item.name,
        price: `€${formatPrice(item.price)}`,
        priceUnit: item.period === 'one-time' ? 'One-time project' : '/month',
        duration: item.details || ''
      })
    } else if (isMonthlyPackage(item) && packageId) {
      // Direct checkout for monthly packages
      window.location.href = `/checkout?package=${packageId}`
    } else {
      // Fallback for items without mapping
      window.location.href = `/checkout?package=${item.id}`
    }
  }

  // Map item IDs to PDF filenames
  const itemIdToPdf = {
    'cloud-starter': 'Cypentra_CloudSecurity_StarterPack_Detailed_NDA_2.pdf',
    'soc2-lite-prep': 'Cypentra_SOC2_LitePrep_Enterprise_Expanded_WithLogo_2.pdf',
    'vciso-lite': 'Cypentra_vCISO_Lite_2.pdf',
    'soc2-readiness': 'Cypentra_SOC2_Readiness_Program_Ultra_2.pdf',
    'enterprise-vciso': 'Cypentra_vCISO_Enterprise_Ultra_2.pdf',
    'pen-testing': 'Cypentra_PenTest_Advanced.pdf'
  }

  const handleLearnMore = (itemId) => {
    const pdfFilename = itemIdToPdf[itemId]
    if (!pdfFilename) {
      console.warn(`No PDF found for item ID: ${itemId}`)
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

  const packages = [
    {
      id: 'lite',
      category: 'FOUNDATION SERVICES',
      description: 'For teams starting their security and compliance journey',
      items: [
        {
          id: 'cloud-starter',
          name: 'Cloud Security Foundation',
          price: 2500,
          period: 'one-time',
          description: 'Secure AWS/Azure/GCP setup (IAM, logging, MFA, baseline hardening)',
          details: 'Ideal for startups under 20 people.',
          features: [
            'IAM configuration & MFA',
            'Logging & monitoring baseline',
            'Security hardening checklist',
            'Cloud architecture review'
          ],
          detailedDescription: 'Secure your cloud environment with a fixed-scope engagement focused on identity, visibility, and baseline hardening. You will receive clear deliverables and practical guidance to improve security quickly without slowing your team.'
        },
        {
          id: 'soc2-lite-prep',
          name: 'SOC 2 / ISO 27001 Gap Assessment',
          price: 3500,
          period: 'one-time',
          description: 'Understand your current posture and what’s required for compliance',
          pricingNote: 'Fixed scope • Clear deliverables • No hidden costs',
          details: 'Best for: Teams preparing for compliance | Typical delivery: 2-3 weeks',
          primaryCta: 'Request Assessment',
          features: [
            'Gap analysis against SOC 2 / ISO 27001',
            'Risk identification',
            'Actionable roadmap',
            'Summary report'
          ],
          detailedDescription: 'This service identifies your current compliance gaps and translates them into a clear, prioritized plan. You will understand exactly what needs to be implemented for SOC 2 or ISO 27001 readiness and how to move forward with confidence.'
        },
        {
          id: 'vciso-lite',
          name: 'vCISO Advisory (Lite)',
          price: 3000,
          period: 'monthly',
          description: 'Ongoing security guidance and support',
          pricingNote: 'Fixed scope • Clear deliverables • No hidden costs',
          details: 'Best for: Growing teams needing ongoing guidance',
          primaryCta: 'Get Started',
          features: [
            'Monthly advisory sessions',
            'Policy guidance',
            'Risk & incident support',
            'Priority email support'
          ],
          detailedDescription: 'Get ongoing expert support to guide policy decisions, manage risk, and strengthen your security posture each month. This is ideal for growing teams that need strategic direction without hiring a full-time security leader.'
        }
      ],
      highlighted: false
    },
    {
      id: 'advanced',
      category: 'ADVANCED SERVICES',
      description: 'End-to-end compliance and security support tailored to your organization',
      items: [
        {
          id: 'soc2-readiness',
          name: 'SOC 2 / ISO 27001 Readiness Program',
          price: null,
          period: 'consultation',
          description: 'End-to-end preparation for audit readiness and compliance',
          pricingNote: 'End-to-end compliance preparation',
          primaryCta: 'Book a Compliance Call',
          features: [
            'Full gap remediation',
            'Policy & control implementation',
            'Evidence collection',
            'Audit preparation'
          ],
          detailedDescription: 'Complete readiness support from remediation through audit preparation. We help your team build and operationalize controls, collect evidence, and prepare confidently for formal compliance assessments.'
        },
        {
          id: 'enterprise-vciso',
          name: 'Enterprise vCISO',
          price: null,
          period: 'consultation',
          description: 'Dedicated security leadership and strategic guidance for your organization',
          pricingNote: 'Dedicated security leadership and strategy',
          primaryCta: 'Book a Compliance Call',
          features: [
            'Security roadmap',
            'Board-level reporting',
            'Risk & compliance oversight',
            'Incident response leadership'
          ],
          detailedDescription: 'Access executive-level security leadership with ongoing strategic guidance, governance oversight, and reporting. This service supports scaling organizations that need mature security direction and accountability.'
        },
        {
          id: 'pen-testing',
          name: 'Penetration Testing & Validation',
          price: null,
          period: 'consultation',
          description: 'Validate your security posture before audits and client reviews',
          primaryCta: 'Book a Compliance Call',
          features: [
            'Web & API testing',
            'Internal testing',
            'Security validation',
            'Detailed reporting'
          ],
          detailedDescription: 'Validate real-world resilience with practical testing across your applications and infrastructure. You will receive clear findings and reporting to support remediation and stakeholder confidence.'
        }
      ],
      highlighted: true
    }
  ]

  return (
    <section className='w-full min-h-auto grid-background py-12 px-4 sm:px-6 md:px-10 lg:px-16'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col items-center text-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
            Security &amp; Compliance <span className='text-[#0091a4]'>Services</span>
          </h2>

          <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/60 max-w-3xl'>
            Structured services designed to help Australian SaaS and cloud teams achieve security and compliance with clarity and speed.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto'>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative rounded-lg sm:rounded-2xl p-5 sm:p-8 lg:p-10 transition-all duration-300 ${pkg.highlighted
                ? 'bg-white border-2 border-white'
                : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
            >
              {/* Highlight Badge */}
              {pkg.highlighted && (
                <div className='absolute -top-3 sm:-top-4 left-6 sm:left-8 inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0091a4] text-black rounded-full font-bold text-xs sm:text-sm'>
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className='mb-6 sm:mb-8 lg:mb-10'>
                <h3 className={`text-2xl sm:text-2xl lg:text-3xl font-bold mb-2 ${pkg.highlighted ? 'text-black' : 'text-white'}`}>
                  {pkg.category}
                </h3>
                <p className={`text-xs sm:text-sm md:text-base ${pkg.highlighted ? 'text-black/70' : 'text-white/70'}`}>
                  {pkg.description}
                </p>
              </div>

              {/* Services List */}
              <div className='space-y-4 sm:space-y-6'>
                {pkg.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl transition-all duration-200 ${pkg.highlighted
                      ? 'bg-[#0091a4]/5 border border-[#0091a4]/20 hover:bg-[#0091a4]/10'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                  >
                    {/* Service Header */}
                    <div className='flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3'>
                      <div className='flex-1'>
                        <h4 className={`text-sm sm:text-base lg:text-lg font-bold mb-1 ${pkg.highlighted ? 'text-black' : 'text-white'}`}>
                          {item.name}
                        </h4>
                        <p className={`text-xs sm:text-sm ${pkg.highlighted ? 'text-black/70' : 'text-white/70'}`}>
                          {item.description}
                        </p>
                        {item.pricingNote && (
                          <p className={`text-[11px] sm:text-xs mt-1.5 ${pkg.highlighted ? 'text-black/60' : 'text-white/60'}`}>
                            {item.pricingNote}
                          </p>
                        )}
                      </div>
                      {item.price && (
                        <div className='text-right whitespace-nowrap shrink-0'>
                          <div className='text-xl sm:text-2xl lg:text-3xl font-bold text-[#0091a4]'>From €{formatPrice(item.price)}</div>
                          <div className={`text-xs ${pkg.highlighted ? 'text-black/60' : 'text-white/60'}`}>
                            {item.period === 'monthly' ? '/month' : ''}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className='mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 pl-0'>
                      {item.features.slice(0, 4).map((feature, fIdx) => (
                        <div key={fIdx} className={`text-xs sm:text-sm ${pkg.highlighted ? 'text-black/80' : 'text-white/80'}`}>
                          • {feature}
                        </div>
                      ))}
                    </div>

                    {/* See More Details Button */}
                    <button
                      onClick={() => toggleDetails(item.id)}
                      className={`w-full mb-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-colors ${pkg.highlighted ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      <span>See More Details</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedDetails[item.id] ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedDetails[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className='overflow-hidden mb-3'
                        >
                          <div className={`text-xs sm:text-sm leading-relaxed mb-3 whitespace-pre-line ${pkg.highlighted ? 'text-black/70' : 'text-white/70'}`}>
                            {item.detailedDescription}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className='flex gap-2'>
                      {item.price ? (
                        <>
                          <button
                            onClick={() => handleGetStarted(item)}
                            disabled={
                              (isOneTimePackage(item) && isInCart(itemIdToPackageId[item.id])) ||
                              (isMonthlyPackage(item) && getCartCount() > 0)
                            }
                            className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group ${(isOneTimePackage(item) && isInCart(itemIdToPackageId[item.id])) ||
                              (isMonthlyPackage(item) && getCartCount() > 0)
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                              : 'bg-[#0091a4] text-black hover:bg-white'
                              }`}
                          >
                            {isOneTimePackage(item) && isInCart(itemIdToPackageId[item.id]) ? (
                              <>
                                <ShoppingCart className='w-3 sm:w-4 h-3 sm:h-4' />
                                <span>Added to Cart</span>
                              </>
                            ) : isMonthlyPackage(item) && getCartCount() > 0 ? (
                              <span>Empty Cart First</span>
                            ) : (
                              <>
                                <span>{item.primaryCta || (isOneTimePackage(item) ? 'Add to Cart' : 'Get Started')}</span>
                                <ArrowUpRight className='w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleLearnMore(item.id)}
                            className='flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 bg-transparent border-2 border-[#0091a4] text-[#0091a4] hover:bg-[#0091a4] hover:text-black'
                          >
                            <Download className='w-3 sm:w-4 h-3 sm:h-4' />
                            <span>View Details</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => window.location.href = '/cypentra-consultation'}
                            className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group ${pkg.highlighted
                              ? 'bg-black text-white hover:bg-[#0091a4] hover:text-black'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                              }`}
                          >
                            {item.primaryCta || 'Book a Compliance Call'}
                            <ArrowUpRight className='w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                          </button>
                          <button
                            onClick={() => handleLearnMore(item.id)}
                            className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${pkg.highlighted
                              ? 'bg-transparent border-2 border-black text-black hover:bg-[#0091a4] hover:border-[#0091a4] hover:text-black'
                              : 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'
                              }`}
                          >
                            <Download className='w-3 sm:w-4 h-3 sm:h-4' />
                            <span>View Details</span>
                          </button>
                        </>
                      )}
                    </div>

                    {item.details && (
                      <p className={`text-xs mt-3 text-center ${pkg.highlighted ? 'text-black/55' : 'text-white/55'}`}>
                        {item.details}
                      </p>
                    )}
                    <p className={`text-[11px] mt-2 text-center ${pkg.highlighted ? 'text-black/55' : 'text-white/55'}`}>
                      30-minute call • No obligation • Clear next steps
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className={`mt-8 pt-6 border-t ${pkg.highlighted ? 'border-black/10' : 'border-white/10'}`}>
                <p className={`text-xs text-center ${pkg.highlighted ? 'text-black/50' : 'text-white/50'}`}>
                  {pkg.highlighted
                    ? 'Custom pricing available for enterprise needs'
                    : 'All plans include 30-day money-back guarantee'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-20 max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 text-center hover:border-white/30 transition-all duration-300'>
          <h3 className='text-2xl font-bold text-white mb-3'>Not sure which plan is right for you?</h3>
          <p className='text-white/60 mb-6'>
            Let's chat! Our team can help you find the perfect security solution for your business.
          </p>
          <button
            onClick={() => window.location.href = '/cypentra-consultation'}
            className='inline-flex items-center gap-2 bg-[#0091a4] text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-all'
          >
            <Calendar className='w-5 h-5' />
            Schedule a Consultation
          </button>
        </div>

      </div>
    </section>
  )
}

export default Pricing
