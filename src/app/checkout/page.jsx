'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  ShoppingCart, Lock, CreditCard, User, Building2,
  Mail, Phone, FileText, Shield, AlertCircle, CheckCircle, X, Zap, ArrowRight, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'
import Input from '@/components/Contact/Input/Input'
import axios from 'axios'
import { getBackendUrl } from '@/services/api'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// Package data mapping (from packages page)
const PACKAGE_DATA = {
  1: { title: 'Cloud Security Starter Pack', price: 999, priceUnit: 'One-time project' },
  2: { title: 'GDPR & Privacy Quick-Setup', price: 599, priceUnit: 'Pre-defined deliverables' },
  3: { title: 'vCISO Lite (On Demand)', price: 499, priceUnit: '/month' },
  7: { title: 'SOC 2 Lite Prep', price: 3999, priceUnit: 'One-time project' }
}

// Terms Modal Component
function TermsModal({ isOpen, onClose, type }) {
  const content = type === 'terms' ? {
    title: 'Terms and Conditions',
    text: `1. Service Agreement
By purchasing our security plans, you agree to our terms of service. These plans provide comprehensive security solutions tailored to your business needs.

2. Payment Terms
Payment is processed securely through Stripe. All transactions are encrypted and protected. Subscriptions will be automatically renewed unless cancelled.

3. Service Delivery
Upon successful payment, you will receive access to your selected security plan within 24-48 hours. Our team will contact you to begin implementation.

4. Refund Policy
Refunds are available within 30 days of purchase if you are not satisfied with our service. Contact our support team to initiate a refund request.

5. Data Protection
We are committed to protecting your personal and business data. All information is stored securely and never shared with third parties without consent.

6. Limitation of Liability
Our liability is limited to the amount paid for the service. We provide security solutions with industry-standard practices but cannot guarantee 100% protection against all threats.

7. Termination
Either party may terminate the service agreement with 30 days written notice. Upon termination, access to services will be discontinued.

8. Updates to Terms
These terms may be updated periodically. Users will be notified of significant changes via email.`
  } : {
    title: 'Privacy Policy',
    text: `1. Information We Collect
We collect personal information including name, email, phone number, and company details to provide our security services effectively.

2. How We Use Information
Your information is used to deliver services, communicate updates, provide customer support, and improve our offerings.

3. Data Storage and Security
All personal data is encrypted and stored on secure servers. We implement industry-standard security measures to protect your information.

4. Information Sharing
We do not sell, trade, or share your personal information with third parties except as required by law or to provide requested services.

5. Cookies and Tracking
Our website uses cookies to improve user experience and analyze website performance. You can disable cookies in your browser settings.

6. Your Rights
You have the right to access, update, or delete your personal information. Contact us to exercise these rights.

7. Data Retention
We retain your information for as long as necessary to provide services and comply with legal obligations.

8. Contact Information
For privacy-related inquiries, contact us at privacy@cypentra.com or through our support channels.`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className='bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border-2 border-black'
        >
          <div className='flex items-center justify-between p-6 border-b-2 border-black'>
            <div className='flex items-center gap-3'>
              <FileText className='w-6 h-6 text-[#0091a4]' />
              <h3 className='text-2xl font-bold text-black'>{content.title}</h3>
            </div>
            <button
              onClick={onClose}
              className='text-black/50 hover:text-black transition-colors'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          <div className='overflow-y-auto scrollbar-hide p-6 flex-1'>
            <div className='whitespace-pre-line text-sm text-black/70 leading-relaxed'>
              {content.text}
            </div>
          </div>
          <div className='p-6 border-t-2 border-black'>
            <button
              onClick={onClose}
              className='w-full bg-[#0091a4] hover:bg-black text-black hover:text-white border-2 border-black px-6 py-3 rounded-xl font-bold transition-all'
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Payment Form Component
function PaymentForm({ selectedPackages, totalPrice, oneTimePlans, monthlyPlans, clearCart }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paymentProgress, setPaymentProgress] = useState('')
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  })
  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!cardReady) newErrors.card = 'Please complete card details'
    if (!acceptTerms) newErrors.terms = 'You must accept the terms and conditions'
    if (!acceptPrivacy) newErrors.privacy = 'You must accept the privacy policy'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.')
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)
    setPaymentProgress('')

    try {
      const backendUrl = getBackendUrl()

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        setError('Please enter card details.')
        setIsLoading(false)
        return
      }

      // Prepare plans data
      const plansData = selectedPackages.map(pkg => ({
        planTitle: pkg.title,
        price: pkg.price,
        priceUnit: pkg.priceUnit,
        numberOfEmployees: 1,
        planId: pkg.id
      }))

      const oneTimePlansData = plansData.filter(p => !p.priceUnit?.includes('/month'))
      const ongoingPlansData = plansData.filter(p => p.priceUnit?.includes('/month'))

      let paymentId = ''

      // Process one-time plans
      if (oneTimePlans.length > 0) {
        setPaymentProgress('Processing one-time plans...')
        const oneTimeTotal = oneTimePlans.reduce((sum, pkg) => sum + (pkg.price || 0), 0)

        let resp
        try {
          resp = await axios.post(`${backendUrl}/api/subscription/create-payment-intent`, {
            plans: oneTimePlansData,
            totalPrice: oneTimeTotal,
            customerData: formData
          })
        } catch (apiError) {
          // Handle backend API errors
          if (apiError.response) {
            const errorMsg = apiError.response?.data?.message || apiError.response?.data?.error || 'Failed to create payment intent'
            throw new Error(`Payment setup failed: ${errorMsg}`)
          } else if (apiError.request) {
            throw new Error('Network error: Unable to connect to payment server. Please check your internet connection and try again.')
          } else {
            throw new Error('Payment setup failed. Please try again.')
          }
        }

        if (!resp.data?.success && resp.status !== 200) {
          throw new Error(resp.data?.message || 'Failed to create payment intent')
        }

        if (!resp.data?.data?.clientSecret && !resp.data?.data?.oneTime?.clientSecret && !resp.data?.clientSecret) {
          throw new Error('Payment setup incomplete. Please try again.')
        }

        const clientSecret = resp.data?.data?.clientSecret || resp.data?.data?.oneTime?.clientSecret || resp.data?.clientSecret

        setPaymentProgress('Confirming one-time payment...')
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
              },
            },
          },
          { redirect: 'if_required' }
        )

        if (confirmError) {
          // Handle Stripe payment errors with user-friendly messages
          let errorMessage = 'Payment failed'

          if (confirmError.type === 'card_error' || confirmError.type === 'validation_error') {
            errorMessage = confirmError.message || 'Your card was declined. Please check your card details and try again.'
          } else if (confirmError.type === 'rate_limit_error') {
            errorMessage = 'Too many requests. Please wait a moment and try again.'
          } else if (confirmError.type === 'invalid_request_error') {
            errorMessage = 'Invalid payment request. Please check your information and try again.'
          } else if (confirmError.type === 'api_error') {
            errorMessage = 'Payment service temporarily unavailable. Please try again in a few moments.'
          } else {
            errorMessage = confirmError.message || 'Payment could not be processed. Please try again.'
          }

          throw new Error(errorMessage)
        }

        if (!paymentIntent) {
          throw new Error('Payment confirmation incomplete. Please try again.')
        }

        // Check payment status
        if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_payment_method') {
          throw new Error('Additional authentication required. Please complete the payment verification.')
        }

        if (paymentIntent.status !== 'succeeded') {
          throw new Error(`Payment status: ${paymentIntent.status}. Please contact support if this issue persists.`)
        }

        paymentId = paymentIntent.id
      }

      // Process ongoing subscription
      if (monthlyPlans.length > 0) {
        setPaymentProgress('Processing ongoing subscription...')
        const ongoingTotal = monthlyPlans.reduce((sum, pkg) => sum + (pkg.price || 0), 0)

        let resp
        try {
          resp = await axios.post(`${backendUrl}/api/subscription/create-payment-intent`, {
            plans: ongoingPlansData,
            totalPrice: ongoingTotal,
            customerData: formData
          })
        } catch (apiError) {
          // Handle backend API errors
          if (apiError.response) {
            // Check for "already subscribed" error
            if (apiError.response.status === 400 && apiError.response?.data?.message?.includes('already have an active ongoing subscription')) {
              setError(`You already have an active ongoing subscription.${oneTimePlans.length > 0 ? ' Your one-time plans were processed successfully.' : ''}`)
              if (oneTimePlans.length > 0) {
                const purchaseDetails = {
                  oneTimePlans,
                  monthlyPlans: [],
                  totalAmount: oneTimePlans.reduce((sum, pkg) => sum + (pkg.price || 0), 0),
                  customerEmail: formData.email,
                  customerData: formData,
                  paymentId
                }
                sessionStorage.setItem('purchaseDetails', JSON.stringify(purchaseDetails))
                sessionStorage.setItem('paymentSession', JSON.stringify({
                  valid: true,
                  timestamp: new Date().toISOString(),
                  paymentId
                }))
                clearCart()
                router.push('/checkout/success')
              }
              setIsLoading(false)
              return
            }

            const errorMsg = apiError.response?.data?.message || apiError.response?.data?.error || 'Failed to create subscription'
            throw new Error(`Subscription setup failed: ${errorMsg}`)
          } else if (apiError.request) {
            throw new Error('Network error: Unable to connect to payment server. Please check your internet connection and try again.')
          } else {
            throw new Error('Subscription setup failed. Please try again.')
          }
        }

        if (!resp.data?.success && resp.status !== 200) {
          throw new Error(resp.data?.message || 'Failed to create subscription')
        }

        if (!resp.data?.data?.clientSecret && !resp.data?.data?.ongoing?.clientSecret && !resp.data?.clientSecret) {
          throw new Error('Subscription setup incomplete. Please try again.')
        }

        const clientSecret = resp.data?.data?.clientSecret || resp.data?.data?.ongoing?.clientSecret || resp.data?.clientSecret

        setPaymentProgress('Confirming subscription payment...')
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
              },
            },
          },
          { redirect: 'if_required' }
        )

        if (confirmError) {
          // Handle Stripe payment errors with user-friendly messages
          let errorMessage = 'Subscription payment failed'

          if (confirmError.type === 'card_error' || confirmError.type === 'validation_error') {
            errorMessage = confirmError.message || 'Your card was declined. Please check your card details and try again.'
          } else if (confirmError.type === 'rate_limit_error') {
            errorMessage = 'Too many requests. Please wait a moment and try again.'
          } else if (confirmError.type === 'invalid_request_error') {
            errorMessage = 'Invalid payment request. Please check your information and try again.'
          } else if (confirmError.type === 'api_error') {
            errorMessage = 'Payment service temporarily unavailable. Please try again in a few moments.'
          } else {
            errorMessage = confirmError.message || 'Subscription payment could not be processed. Please try again.'
          }

          throw new Error(errorMessage)
        }

        if (!paymentIntent) {
          throw new Error('Subscription confirmation incomplete. Please try again.')
        }

        // Check payment status
        if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_payment_method') {
          throw new Error('Additional authentication required. Please complete the payment verification.')
        }

        if (paymentIntent.status !== 'succeeded') {
          throw new Error(`Payment status: ${paymentIntent.status}. Please contact support if this issue persists.`)
        }

        paymentId = paymentId || paymentIntent.id
      }

      setPaymentProgress('Payment completed successfully!')

      // IMPORTANT: Stripe confirmCardPayment only returns success if payment actually succeeded.
      // The webhook will handle backend processing (emails, DB records, etc.) asynchronously.
      // We show success immediately because the payment is confirmed, but note that backend
      // processing (email delivery) may take a few moments.

      const purchaseDetails = {
        packages: selectedPackages,
        oneTimePlans,
        monthlyPlans,
        totalAmount: totalPrice,
        customerEmail: formData.email,
        customerData: formData,
        paymentId,
        paymentStatus: 'succeeded',
        // Note: Backend webhook will process emails/invoices asynchronously
        webhookPending: true
      }

      sessionStorage.setItem('purchaseDetails', JSON.stringify(purchaseDetails))
      sessionStorage.setItem('paymentSession', JSON.stringify({
        valid: true,
        timestamp: new Date().toISOString(),
        paymentId,
        paymentStatus: 'succeeded'
      }))

      clearCart()
      router.push(`/checkout/success?payment_intent=${paymentId}`)
    } catch (err) {
      console.error('Payment error:', err)

      // Extract user-friendly error message
      let errorMessage = 'Something went wrong. Please try again.'

      if (err.message) {
        errorMessage = err.message
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      }

      setError(errorMessage)

      // Don't clear form data on error so user can retry
    } finally {
      setIsLoading(false)
      setPaymentProgress('')
    }
  }

  const isFormValid = acceptTerms && acceptPrivacy && formData.firstName && formData.lastName && formData.email && cardReady

  return (
    <div className='space-y-8'>
      {/* Order Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-[#0091a4] shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)]'
      >
        <div className='flex items-center gap-3 mb-6 pb-4 border-b-2 border-black'>
          <div className='p-2 bg-[#0091a4] rounded-xl'>
            <ShoppingCart className='w-6 h-6 text-black' />
          </div>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-black'>Order Summary</h2>
            <p className='text-sm text-black/60'>
              {selectedPackages.length} {selectedPackages.length === 1 ? 'Plan' : 'Plans'} Selected
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          {oneTimePlans.length > 0 && (
            <div>
              <h4 className='font-semibold text-black mb-3 flex items-center gap-2 text-sm'>
                <Shield className='w-4 h-4 text-[#0091a4]' />
                One-Time Plans ({oneTimePlans.length})
              </h4>
              {oneTimePlans.map((pkg, index) => (
                <div key={`onetime-${index}`} className='bg-[#0091a4]/10 border-2 border-[#0091a4] p-4 rounded-xl mb-3'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <div className='font-semibold text-base text-black'>{pkg.title}</div>
                      <div className='text-xs text-black/60 mt-1'>{pkg.priceUnit}</div>
                    </div>
                    <div className='text-right ml-4'>
                      <div className='text-lg font-bold text-black'>
                        ${pkg.price?.toLocaleString()}
                      </div>
                      <div className='text-xs text-[#0091a4] font-semibold'>one-time</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {monthlyPlans.length > 0 && (
            <div>
              <h4 className='font-semibold text-black mb-3 flex items-center gap-2 text-sm'>
                <CreditCard className='w-4 h-4 text-[#0091a4]' />
                Ongoing Subscription ({monthlyPlans.length})
              </h4>
              {monthlyPlans.map((pkg, index) => (
                <div key={`ongoing-${index}`} className='bg-[#0091a4]/10 border-2 border-[#0091a4] p-4 rounded-xl mb-3'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <div className='font-semibold text-base text-black'>{pkg.title}</div>
                      <div className='text-xs text-black/60 mt-1'>{pkg.priceUnit}</div>
                      <div className='text-xs text-[#0091a4] mt-2 flex items-center gap-1 font-semibold'>
                        <AlertCircle className='w-3 h-3' />
                        Cancel anytime
                      </div>
                    </div>
                    <div className='text-right ml-4'>
                      <div className='text-lg font-bold text-black'>
                        ${pkg.price?.toLocaleString()}
                      </div>
                      <div className='text-xs text-[#0091a4] font-semibold'>monthly</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='pt-4 border-t-2 border-black'>
            <div className='bg-black p-4 rounded-xl'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-white'>Total Amount:</span>
                <span className='text-2xl font-bold text-[#0091a4]'>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border-2 border-[#0091a4] shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)]'
      >
        <div className='mb-6 sm:mb-8 md:mb-10'>
          <div className='inline-block mb-3 sm:mb-4'>
            <div className='flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-[#0091a4] rounded-full'>
              <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black animate-pulse'></div>
              <span className='text-xs font-bold text-black uppercase tracking-wider'>Secure Checkout</span>
            </div>
          </div>
          <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2 sm:mb-3 leading-tight'>
            Complete your purchase
          </h2>
          <p className='text-xs sm:text-sm md:text-base text-black/60 leading-relaxed'>
            Enter your details and payment information to proceed
          </p>
        </div>

        <form onSubmit={handlePayment} className='space-y-4 sm:space-y-5 md:space-y-6'>
          {error && (
            <div className='p-4 sm:p-5 bg-red-50 border-2 border-red-500 rounded-xl sm:rounded-2xl'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5' />
                <div>
                  <h4 className='font-bold text-red-900 mb-1 text-sm sm:text-base'>Payment Error</h4>
                  <p className='text-xs sm:text-sm text-red-700'>{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoading && paymentProgress && (
            <div className='p-4 sm:p-5 bg-[#0091a4]/10 border-2 border-[#0091a4] rounded-xl sm:rounded-2xl'>
              <div className='flex items-start gap-3'>
                <div className='w-5 h-5 sm:w-6 sm:h-6 border-2 border-[#0091a4] border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5'></div>
                <p className='text-sm sm:text-base text-black font-medium'>{paymentProgress}</p>
              </div>
            </div>
          )}

          {/* Customer Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6'>
            <Input
              type='text'
              id='firstName'
              name='firstName'
              label='First Name'
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value })
                if (errors.firstName) setErrors({ ...errors, firstName: '' })
              }}
              onFocus={() => setFocusedField('firstName')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
              fieldName='firstName'
              placeholder='John'
              error={errors.firstName}
            />

            <Input
              type='text'
              id='lastName'
              name='lastName'
              label='Last Name'
              required
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value })
                if (errors.lastName) setErrors({ ...errors, lastName: '' })
              }}
              onFocus={() => setFocusedField('lastName')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
              fieldName='lastName'
              placeholder='Doe'
              error={errors.lastName}
            />
          </div>

          <Input
            type='email'
            id='email'
            name='email'
            label='Email Address'
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: '' })
            }}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            focusedField={focusedField}
            fieldName='email'
            placeholder='john@company.com'
            error={errors.email}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6'>
            <Input
              type='tel'
              id='phone'
              name='phone'
              label='Phone Number'
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
              fieldName='phone'
              placeholder='+1 234 567 8900'
            />

            <Input
              type='text'
              id='company'
              name='company'
              label='Company Name'
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              onFocus={() => setFocusedField('company')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
              fieldName='company'
              placeholder='Your Company'
            />
          </div>

          {/* Payment Information */}
          <div className='pt-6 border-t-2 border-black'>
            <div className='mb-4'>
              <div className='flex items-center justify-between mb-3'>
                <label className='block text-xs font-bold text-black uppercase tracking-wider'>
                  Card Details <span className='text-[#0091a4]'>*</span>
                </label>
                <div className='flex items-center gap-1 text-xs text-black/50'>
                  <Lock className='w-3 h-3' />
                  <span>Secured by Stripe</span>
                </div>
              </div>
              <div className='bg-white border-2 border-black rounded-xl p-4 focus-within:border-[#0091a4] transition-all'>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#000000',
                        fontFamily: 'General Sans, Quicksand, system-ui, sans-serif',
                        '::placeholder': {
                          color: '#00000030',
                        },
                      },
                      invalid: {
                        color: '#EF4444',
                      },
                    },
                  }}
                  onChange={(event) => {
                    setCardReady(event.complete)
                    if (errors.card && event.complete) {
                      setErrors({ ...errors, card: '' })
                    }
                  }}
                />
              </div>
              {errors.card && (
                <p className='mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
                  {errors.card}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className='pt-6 border-t-2 border-black'>
            <div className='bg-black/5 p-4 sm:p-5 md:p-6 rounded-xl border-2 border-black space-y-4'>
              <div className='flex items-start gap-3'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked)
                    if (errors.terms) setErrors({ ...errors, terms: '' })
                  }}
                  className='mt-1 w-5 h-5 rounded border-2 border-black focus:ring-2 focus:ring-[#0091a4] text-[#0091a4] cursor-pointer'
                />
                <div className='flex-1'>
                  <label htmlFor='terms' className='text-sm font-semibold text-black cursor-pointer block'>
                    I agree to the Terms and Conditions <span className='text-[#0091a4]'>*</span>
                  </label>
                  <p className='text-xs text-black/60 mt-1'>
                    By checking this box, you agree to our service terms.{' '}
                    <button
                      type='button'
                      onClick={() => setShowTermsModal(true)}
                      className='text-[#0091a4] hover:text-black underline font-medium'
                    >
                      Read Terms & Conditions
                    </button>
                  </p>
                  {errors.terms && (
                    <p className='text-xs text-red-500 mt-1'>{errors.terms}</p>
                  )}
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <input
                  type='checkbox'
                  id='privacy'
                  checked={acceptPrivacy}
                  onChange={(e) => {
                    setAcceptPrivacy(e.target.checked)
                    if (errors.privacy) setErrors({ ...errors, privacy: '' })
                  }}
                  className='mt-1 w-5 h-5 rounded border-2 border-black focus:ring-2 focus:ring-[#0091a4] text-[#0091a4] cursor-pointer'
                />
                <div className='flex-1'>
                  <label htmlFor='privacy' className='text-sm font-semibold text-black cursor-pointer block'>
                    I agree to the Privacy Policy <span className='text-[#0091a4]'>*</span>
                  </label>
                  <p className='text-xs text-black/60 mt-1'>
                    By checking this box, you consent to our data practices.{' '}
                    <button
                      type='button'
                      onClick={() => setShowPrivacyModal(true)}
                      className='text-[#0091a4] hover:text-black underline font-medium'
                    >
                      Read Privacy Policy
                    </button>
                  </p>
                  {errors.privacy && (
                    <p className='text-xs text-red-500 mt-1'>{errors.privacy}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-6'>
            {!isFormValid && (
              <div className='mb-4 p-4 bg-amber-500/20 border-2 border-amber-500 rounded-xl'>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5' />
                  <p className='text-sm text-amber-800'>
                    Please fill in all required fields and accept the terms to proceed with payment.
                  </p>
                </div>
              </div>
            )}

            <motion.button
              type='submit'
              disabled={isLoading || !isFormValid}
              whileHover={!isLoading && isFormValid ? { scale: 1.02 } : {}}
              whileTap={!isLoading && isFormValid ? { scale: 0.98 } : {}}
              className='w-full bg-black hover:bg-[#0091a4] disabled:opacity-50 disabled:cursor-not-allowed text-white hover:text-black border-2 border-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group shadow-[3px_3px_0px_0px_rgba(0,145,164,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)]'
            >
              {isLoading ? (
                <>
                  <div className='w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className='w-4 sm:w-5 h-4 sm:h-5' />
                  <span>Complete Secure Payment</span>
                  <ArrowRight className='w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform' />
                </>
              )}
            </motion.button>

            <div className='mt-4 flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-black/50 px-2'>
              <div className='w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0091a4] flex-shrink-0'></div>
              <p className='text-center'>Your payment is secured with 256-bit SSL encryption</p>
            </div>
          </div>
        </form>

        {/* Terms Modals */}
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          type='terms'
        />
        <TermsModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
          type='privacy'
        />
      </motion.div>
    </div>
  )
}

// Main Checkout Page Component
function CheckoutPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { cartItems, clearCart } = useCart()

  // Get packages from URL or cart
  const packageIdsParam = searchParams.get('packages')
  const singlePackageId = searchParams.get('package')

  const selectedPackages = React.useMemo(() => {
    if (packageIdsParam) {
      const ids = packageIdsParam.split(',').map(id => parseInt(id.trim()))
      return ids.map(id => {
        const pkg = PACKAGE_DATA[id]
        return pkg ? { id, ...pkg } : null
      }).filter(Boolean)
    } else if (singlePackageId) {
      const id = parseInt(singlePackageId)
      const pkg = PACKAGE_DATA[id]
      return pkg ? [{ id, ...pkg }] : []
    } else if (cartItems.length > 0) {
      return cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0,
        priceUnit: item.priceUnit
      }))
    }
    return []
  }, [packageIdsParam, singlePackageId, cartItems])

  const totalPrice = selectedPackages.reduce((sum, pkg) => sum + (pkg.price || 0), 0)
  const oneTimePlans = selectedPackages.filter(pkg => !pkg.priceUnit?.includes('/month'))
  const monthlyPlans = selectedPackages.filter(pkg => pkg.priceUnit?.includes('/month'))

  // Redirect if no packages
  useEffect(() => {
    if (selectedPackages.length === 0 && cartItems.length === 0) {
      router.push('/packages')
    }
  }, [selectedPackages, cartItems, router])

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        selectedPackages={selectedPackages}
        totalPrice={totalPrice}
        oneTimePlans={oneTimePlans}
        monthlyPlans={monthlyPlans}
        clearCart={clearCart}
      />
    </Elements>
  )
}

function CheckoutPageFallback() {
  return (
    <div className='min-h-screen bg-black grid-background flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-12 h-12 border-4 border-[#0091a4] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-white/70 text-sm'>Loading checkout...</p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className='min-h-screen bg-black grid-background'>
      <Navbar />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20'>
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
          className='mb-12 sm:mb-16 md:mb-20'
        >
          <div className='relative'>
            <div className='hidden md:block absolute -left-20 top-0 w-1 h-full bg-gradient-to-b from-[#0091a4] via-[#0091a4] to-transparent'></div>
            <div>
              <div className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6'>
                Secure Checkout
              </div>
              <h1 className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4'>
                Complete Your <span className='text-[#0091a4]'>Purchase</span>
              </h1>
              <p className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/60 max-w-2xl leading-relaxed'>
                Secure your business with our comprehensive security solutions. Your payment is protected with bank-level encryption.
              </p>
            </div>
          </div>
        </motion.div>

        <Suspense fallback={<CheckoutPageFallback />}>
          <CheckoutPageContent />
        </Suspense>
      </div>

      <Footer />
    </div>
  )
}
