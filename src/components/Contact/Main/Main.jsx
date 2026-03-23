'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MapPin, Mail, Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import { submitContactForm } from '@/services/contact'

const Main = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
  const [recaptchaValue, setRecaptchaValue] = useState(null)
  const recaptchaRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (minimum 10 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value)
    // Clear captcha error if exists
    if (errors.recaptcha) {
      setErrors({
        ...errors,
        recaptcha: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Check reCAPTCHA
    if (!recaptchaValue) {
      setErrors({
        ...errors,
        recaptcha: 'Please complete the reCAPTCHA verification'
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm({
        ...formData,
        recaptchaToken: recaptchaValue
      })

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setFocusedField(null)
      setRecaptchaValue(null)
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='w-full grid-background min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20'>
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
                Get In Touch
              </div>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4'>
                Let's start a<br /> <span className='text-[#0091a4]'>conversation</span>
              </h1>
              <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed'>
                Transform your security posture with expert guidance tailored to your business
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16'>
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='lg:col-span-5 space-y-4 sm:space-y-6 md:space-y-8'
          >
            {/* Quick Contact Cards */}
            <div className='space-y-3 sm:space-y-4'>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className='bg-black p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-black hover:border-[#0091a4] transition-all group relative overflow-hidden'
              >
                <div className='absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#0091a4]/10 rounded-full blur-3xl group-hover:bg-[#0091a4]/20 transition-all'></div>
                <div className='relative flex items-start gap-3 sm:gap-4 md:gap-5'>
                  <div className='w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl bg-[#0091a4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform'>
                    <Mail className='w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-black' />
                  </div>
                  <div>
                    <p className='text-xs text-white/50 mb-1 sm:mb-2 uppercase tracking-wider font-semibold'>Email Address</p>
                    <a href='mailto:info@cypentra.com' className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white group-hover:text-[#0091a4] transition-colors break-all'>
                      info@cypentra.com
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className='bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-black hover:border-[#0091a4] transition-all group relative overflow-hidden'
              >
                <div className='absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#0091a4]/10 rounded-full blur-3xl group-hover:bg-[#0091a4]/20 transition-all'></div>
                <div className='relative flex items-start gap-3 sm:gap-4 md:gap-5'>
                  <div className='w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl bg-[#0091a4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform'>
                    <MapPin className='w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-black' />
                  </div>
                  <div>
                    <p className='text-xs text-black/50 mb-1 sm:mb-2 uppercase tracking-wider font-semibold'>Headquarters</p>
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black mb-1'>
                      Nueva Andalucia
                    </p>
                    <p className='text-xs sm:text-sm md:text-base text-black/70'>
                      Marbella-29069, Spain
                    </p>
                    <div className='mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-black/10'>
                      <p className='text-xs sm:text-sm text-black/60 font-medium'>Remote-first across 3 continents</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className='bg-[#0091a4] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-black group relative overflow-hidden'
              >
                <div className='absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-all'></div>
                <div className='relative flex items-start gap-3 sm:gap-4 md:gap-5'>
                  <div className='w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform'>
                    <Clock className='w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-[#0091a4]' />
                  </div>
                  <div>
                    <p className='text-xs text-black/50 mb-2 sm:mb-3 uppercase tracking-wider font-semibold'>Response Time</p>
                    <div className='space-y-1.5 sm:space-y-2'>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black'></div>
                        <p className='text-xs sm:text-sm md:text-base text-black font-semibold leading-tight'>Standard: 24 hours</p>
                      </div>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black'></div>
                        <p className='text-xs sm:text-sm md:text-base text-black font-semibold leading-tight'>Emergency: Immediate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Info Box */}
            <div className='bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-[#0091a4]'>
              <div className='flex items-start gap-3 sm:gap-4'>
                <div className='w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-lg sm:rounded-xl bg-black flex items-center justify-center flex-shrink-0'>
                  <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0091a4]'></div>
                </div>
                <div>
                  <p className='text-xs sm:text-sm font-bold text-black mb-1.5 sm:mb-2'>Direct Communication</p>
                  <p className='text-xs sm:text-sm text-black/70 leading-relaxed break-words'>
                    Every inquiry is personally reviewed by our security experts. We believe in genuine conversations, not automated responses.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='lg:col-span-7'
          >
            <div className='bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-3xl border-2 border-[#0091a4] shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] md:shadow-[8px_8px_0px_0px_rgba(0,145,164,1)]'>
              <div className='mb-6 sm:mb-8 md:mb-10'>
                <div className='inline-block mb-3 sm:mb-4'>
                  <div className='flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-[#0091a4] rounded-full'>
                    <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black animate-pulse'></div>
                    <span className='text-xs font-bold text-black uppercase tracking-wider'>Available Now</span>
                  </div>
                </div>
                <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black mb-2 sm:mb-3 leading-tight'>
                  Send us a message
                </h2>
                <p className='text-xs sm:text-sm md:text-base text-black/60 leading-relaxed'>
                  Share your requirements and we'll connect you with the right security expert
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5 md:space-y-6'>
                {/* Name & Email Row */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6'>
                  <Input
                    type='text'
                    id='name'
                    name='name'
                    label='Full Name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    focusedField={focusedField}
                    fieldName='name'
                    placeholder='John Doe'
                    error={errors.name}
                  />

                  <Input
                    type='email'
                    id='email'
                    name='email'
                    label='Email Address'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    focusedField={focusedField}
                    fieldName='email'
                    placeholder='john@company.com'
                    error={errors.email}
                  />
                </div>

                {/* Phone & Subject Row */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6'>
                  <Input
                    type='tel'
                    id='phone'
                    name='phone'
                    label='Phone Number'
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    focusedField={focusedField}
                    fieldName='phone'
                    placeholder='+1 234 567 8900'
                    error={errors.phone}
                  />

                  <Input
                    type='text'
                    id='subject'
                    name='subject'
                    label='Subject'
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    focusedField={focusedField}
                    fieldName='subject'
                    placeholder='SOC 2 Compliance'
                    error={errors.subject}
                  />
                </div>

                {/* Message Field */}
                <Textarea
                  id='message'
                  name='message'
                  label='Your Message'
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  focusedField={focusedField}
                  fieldName='message'
                  placeholder='Describe your security requirements, timeline, and any specific concerns...'
                  error={errors.message}
                  helperText='Please provide as much detail as possible'
                />

                {/* reCAPTCHA */}
                <div className='flex flex-col items-center'>
                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme='light'
                    />
                  ) : (
                    <div className='p-4 bg-yellow-50 border-2 border-yellow-500 rounded-lg'>
                      <p className='text-sm text-yellow-800'>
                        reCAPTCHA site key not configured. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your .env.local file.
                      </p>
                    </div>
                  )}
                  {errors.recaptcha && (
                    <p className='mt-2 text-xs text-red-500'>{errors.recaptcha}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type='submit'
                  disabled={isSubmitting || !recaptchaValue}
                  whileHover={!isSubmitting && recaptchaValue ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && recaptchaValue ? { scale: 0.98 } : {}}
                  className='w-full bg-black hover:bg-[#0091a4] disabled:opacity-50 disabled:cursor-not-allowed text-white hover:text-black border-2 border-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group shadow-[3px_3px_0px_0px_rgba(0,145,164,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)]'
                >
                  {isSubmitting ? (
                    <>
                      <div className='h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className='w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform' />
                    </>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className='p-4 sm:p-5 bg-[#0091a4]/10 border-2 border-[#0091a4] rounded-xl sm:rounded-2xl'
                    >
                      <div className='flex items-start gap-3'>
                        <CheckCircle className='w-5 h-5 sm:w-6 sm:h-6 text-[#0091a4] flex-shrink-0 mt-0.5' />
                        <div>
                          <h4 className='font-bold text-black mb-1 text-sm sm:text-base'>
                            Message Sent Successfully!
                          </h4>
                          <p className='text-xs sm:text-sm text-black/70'>
                            Thank you for reaching out. Our security team will review your inquiry and respond within 24 hours.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className='p-4 sm:p-5 bg-red-50 border-2 border-red-500 rounded-xl sm:rounded-2xl'
                    >
                      <div className='flex items-start gap-3'>
                        <AlertCircle className='w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5' />
                        <div>
                          <h4 className='font-bold text-red-900 mb-1 text-sm sm:text-base'>
                            Submission Failed
                          </h4>
                          <p className='text-xs sm:text-sm text-red-700'>
                            There was an error sending your message. Please try again or contact us directly at info@cypentra.com
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className='flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-black/50 px-2'>
                  <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0091a4] flex-shrink-0'></div>
                  <p className='text-center'>Your information is secure and will never be shared</p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-12 sm:mt-16 md:mt-20 bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 border-2 border-black relative overflow-hidden'
        >
          <div className='absolute top-0 right-0 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 rounded-full blur-3xl'></div>

          <div className='relative text-center max-w-3xl mx-auto px-4'>
            <div className='inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0091a4] rounded-full mb-4 sm:mb-5 md:mb-6'>
              <Zap className='w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-black' />
              <span className='text-xs font-bold text-black uppercase tracking-wider'>Priority Support</span>
            </div>

            <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight'>
              Security Emergency?
            </h3>

            <p className='text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-7 md:mb-8 leading-relaxed'>
              For critical security incidents requiring immediate attention, bypass the form and reach our emergency response team directly.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <a
                href='mailto:info@cypentra.com'
                className='inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0091a4] hover:bg-white text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all border-2 border-[#0091a4]'
              >
                <Mail className='w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5' />
                <span>Emergency Contact</span>
              </a>
              <a
                href='tel:+12818607832'
                className='inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-transparent hover:bg-white/10 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all border-2 border-white'
              >
                <span>Call Direct Line</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Main