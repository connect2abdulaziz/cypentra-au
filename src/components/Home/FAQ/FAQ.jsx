'use client'

import React, { useState } from 'react'
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, bank transfers, and can accommodate annual payment plans for enterprise clients. All pricing is transparent with no hidden fees.',
      category: 'Billing'
    },
    {
      q: 'How does SOC 2 Readiness differ from full SOC 2 certification?',
      a: 'SOC 2 Readiness prepares you for the audit process by aligning policies, documenting controls, and gathering evidence. Full certification requires an official audit by a third-party firm, which we can help coordinate once you\'re ready.',
      category: 'Compliance'
    },
    {
      q: 'How long does it take to complete a security assessment?',
      a: 'Most assessments are completed within 2-3 weeks, depending on the size and complexity of your infrastructure. We\'ll provide a detailed timeline during our initial consultation.',
      category: 'Services'
    },
    {
      q: 'Can I upgrade or downgrade my package later?',
      a: 'Yes, absolutely! Our packages are designed to scale with your business. You can upgrade to access more features or downgrade if your needs change. Changes take effect at the start of your next billing cycle.',
      category: 'Billing'
    },
    {
      q: 'What cloud platforms do you support?',
      a: 'We support AWS, Azure, and GCP. Our team has deep expertise across all three platforms and can help you secure your infrastructure regardless of which provider you use.',
      category: 'Services'
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))]

  return (
    <section className='w-full grid-background min-h-screen py-12 px-4 sm:px-6 md:px-10 lg:px-16'>
      <div className='max-w-5xl mx-auto'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-12 sm:mb-16'
        >

          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6'>
            Frequently Asked <span className='text-[#0091a4]'>Questions</span>
          </h2>

          <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/60 max-w-3xl mx-auto'>
            Find answers to common questions about our security services, pricing, and compliance solutions.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className='mb-8 sm:mb-12 max-w-2xl mx-auto'
        >
          <div className='relative'>
            <input
              type='text'
              placeholder='Search FAQ...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-5 py-2.5 sm:py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#0091a4] transition-all text-sm sm:text-base'
            />
            <MessageCircle className='absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-white/40' />
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='space-y-4'
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className='group'
                >
                  <motion.button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full rounded-xl px-6 py-5 text-left transition-all duration-300 flex items-start justify-between gap-4 ${isOpen
                      ? 'bg-[#0091a4]/10 border border-[#0091a4]/30'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold text-white group-hover:text-[#0091a4] transition-colors'>
                        {faq.q}
                      </h3>
                      <span className='inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-white/50'>
                        {faq.category}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='shrink-0 mt-1'
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#0091a4]' : 'text-white/60'}`} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className='px-6 py-5 bg-white/5 border-t border-white/10 rounded-b-xl'>
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className='text-base text-white/80 leading-relaxed'
                          >
                            {faq.a}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-12'
            >
              <p className='text-white/60 text-lg'>No questions found matching your search.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

