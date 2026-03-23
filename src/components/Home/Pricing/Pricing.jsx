'use client'

import React, { useState } from 'react'
import { ArrowUpRight, Calendar, ChevronDown, Download, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [expandedDetails, setExpandedDetails] = useState({})
  const { addToCart, isInCart, getCartCount } = useCart()

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
        price: `$${item.price}`,
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
      category: 'Lite Packages',
      description: 'Quick-start solutions to build your security foundation.',
      items: [
        {
          id: 'cloud-starter',
          name: 'Cloud Security Starter Pack',
          price: 999,
          period: 'one-time',
          description: 'Secure AWS/Azure/GCP setup (IAM, logging, MFA, baseline hardening)',
          details: 'Ideal for startups under 20 people.',
          features: [
            'IAM configuration & MFA setup',
            'Logging & monitoring baseline',
            'Security hardening checklist',
            'Cloud architecture review'
          ],
          detailedDescription: 'Our Cloud Security Starter Pack strengthens your AWS, Azure, or GCP environment using best-practice frameworks such as CIS and NIST. We implement secure IAM governance, network segmentation, encryption, and continuous monitoring to eliminate misconfigurations and unauthorized access. This setup ensures your cloud architecture is compliant, auditable, and ready to scale securely — a solid foundation before SOC 2 or ISO 27001 readiness.'
        },
        {
          id: 'soc2-lite-prep',
          name: 'SOC 2 Lite Prep',
          price: 3999,
          period: 'one-time',
          description: 'Essential SOC 2 compliance preparation for startups and small teams.',
          features: [
            'SOC 2 Gap Assessment',
            'Core Policy Bundle',
            'Risk & Evidence Templates',
            'Readiness Summary Report'
          ],
          detailedDescription: 'Prepare your company for SOC 2 compliance with essential policies, risk controls, and documentation templates — all tailored to startups and small teams that need quick readiness before onboarding auditors.\n\n• SOC 2 Gap Assessment – Identify missing controls against the five Trust Services Criteria\n• Core Policy Bundle – Security, access, incident, and vendor management policies\n• Risk & Evidence Templates – Pre-built forms for risk register and control evidence\n• Readiness Summary Report – Action plan showing what\'s complete and what remains for full SOC 2\n\nOur SOC 2 Lite Prep package provides the foundation your organization needs to begin its SOC 2 Type I or Type II journey. We conduct a structured gap analysis against the AICPA Trust Services Criteria, identify control deficiencies, and create tailored security policies for your environment. You\'ll receive policy templates, risk documentation, and an implementation checklist that map directly to auditor expectations — saving weeks of preparation time. By the end of this engagement, your team will have: • Defined security and compliance ownership • Documented policies aligned with SOC 2 requirements • A clear remediation roadmap toward full SOC 2 Readiness. Ideal for SaaS startups, FinTech, or B2B companies that plan to complete a formal audit within 3–6 months.'
        },
        {
          id: 'vciso-lite',
          name: 'vCISO Lite',
          price: 499,
          period: 'monthly',
          description: '4h/month advisory via Zoom/Meet + IR Plan + Policies',
          features: [
            '4 hours monthly advisory',
            'Incident response plan',
            'Policy templates & guidance',
            'Priority email support'
          ],
          detailedDescription: 'Our vCISO Lite program provides ongoing cybersecurity leadership without the cost of a full-time CISO. You get 4 hours per month of strategic advisory, policy development, and incident response planning — ideal for startups and SMBs that need professional guidance to stay compliant and secure. We help you implement governance controls, risk management frameworks, and ensure your policies align with SOC 2, ISO 27001, and GDPR standards.'
        }
      ],
      highlighted: false
    },
    {
      id: 'advanced',
      category: 'Advanced Packages',
      description: 'Comprehensive readiness and strategic support.',
      items: [
        {
          id: 'soc2-readiness',
          name: 'SOC 2 Readiness Program',
          price: null,
          period: 'consultation',
          description: 'Complete SOC 2 Type II preparation with gap analysis and documentation',
          details: 'Book a free Zoom meeting to discuss your needs.',
          features: [
            'Full gap analysis & remediation',
            'Policy & procedure development',
            'Control implementation support',
            'Pre-audit readiness assessment',
            'Vendor management framework',
            'Continuous monitoring setup'
          ],
          detailedDescription: 'Our SOC 2 Readiness Program provides full end-to-end preparation for SOC 2 Type I and Type II audits. We conduct an in-depth gap analysis across your controls, policies, and infrastructure, then guide your team through implementation and documentation. You\'ll receive complete evidence mapping, continuous monitoring setup, and pre-audit review to ensure successful auditor validation. Ideal for SaaS, FinTech, and enterprise clients pursuing formal compliance certification.'
        },
        {
          id: 'enterprise-vciso',
          name: 'Enterprise vCISO',
          price: null,
          period: 'consultation',
          description: 'Dedicated security leadership and strategic guidance for your organization',
          details: 'Monthly retainer',
          features: [
            'Dedicated vCISO support',
            'Strategic security roadmap',
            'Board-level reporting',
            'Incident response leadership',
            'Security program management',
            'Compliance oversight (SOC 2, ISO, GDPR)'
          ],
          detailedDescription: 'Our Enterprise vCISO service delivers dedicated cybersecurity leadership on a continuous basis. We act as your organization\'s Chief Information Security Officer, managing governance, risk, and compliance (GRC) programs, leading incident response, and reporting directly to executive leadership. This includes strategic roadmap development, board-ready metrics, and oversight across SOC 2, ISO 27001, GDPR, and other compliance frameworks. Designed for scaling companies that require full-time security guidance — without full-time overhead.'
        },
        {
          id: 'pen-testing',
          name: 'Advanced Penetration Testing',
          price: null,
          period: 'consultation',
          description: 'Comprehensive security testing with detailed remediation guidance',
          details: '2–4 weeks assessment',
          features: [
            'External & internal testing',
            'Web application testing',
            'API security assessment',
            'Social engineering testing',
            'Detailed remediation report',
            'Post-test consultation'
          ],
          detailedDescription: 'Our Advanced Penetration Testing engagement combines manual and automated testing to identify, exploit, and remediate vulnerabilities across your cloud, network, and application environments. Following OWASP, MITRE ATT&CK, and NIST 800-115 methodologies, our certified testers perform internal, external, and API assessments with detailed remediation guidance. The engagement concludes with a risk-prioritized report and optional retesting to confirm fixes — ensuring your systems are resilient, compliant, and secure.'
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
            Tailored Plans for Your <span className='text-[#0091a4]'>Security Needs</span>
          </h2>

          <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/60 max-w-3xl'>
            Choose the perfect package to strengthen your security posture. From startups to enterprises, we have a solution for you.
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
                      </div>
                      {item.price && (
                        <div className='text-right whitespace-nowrap shrink-0'>
                          <div className='text-2xl sm:text-2xl lg:text-3xl font-bold text-[#0091a4]'>${item.price}</div>
                          <div className={`text-xs ${pkg.highlighted ? 'text-black/60' : 'text-white/60'}`}>
                            /{item.period}
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
                                <span>{isOneTimePackage(item) ? 'Add to Cart' : 'Get Started'}</span>
                                <ArrowUpRight className='w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleLearnMore(item.id)}
                            className='flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 bg-transparent border-2 border-[#0091a4] text-[#0091a4] hover:bg-[#0091a4] hover:text-black'
                          >
                            <Download className='w-3 sm:w-4 h-3 sm:h-4' />
                            <span>Learn More</span>
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
                            Book a Zoom Meeting
                            <ArrowUpRight className='w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                          </button>
                          <button
                            onClick={() => handleLearnMore(item.id)}
                            className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${pkg.highlighted
                              ? 'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white'
                              : 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'
                              }`}
                          >
                            <Download className='w-3 sm:w-4 h-3 sm:h-4' />
                            <span>Learn More</span>
                          </button>
                        </>
                      )}
                    </div>

                    {item.details && (
                      <p className={`text-xs mt-3 text-center ${pkg.highlighted ? 'text-black/50' : 'text-white/50'}`}>
                        {item.details}
                      </p>
                    )}
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
