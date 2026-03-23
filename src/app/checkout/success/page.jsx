'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  CheckCircle, ArrowRight, Home, Sparkles, Mail, Shield, 
  CreditCard, FileText, Download, Clock, Zap 
} from 'lucide-react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Footer from '@/components/Home/Footer/Footer'
import Loader from '@/components/common/Loader/Loader'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [purchaseDetails, setPurchaseDetails] = useState(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Get purchase details from sessionStorage
    const stored = sessionStorage.getItem('purchaseDetails')
    const session = sessionStorage.getItem('paymentSession')
    
    if (!stored || !session) {
      // Redirect if no purchase data
      router.push('/packages')
      return
    }

    try {
      const details = JSON.parse(stored)
      const sessionData = JSON.parse(session)
      
      // Verify session is valid (within last hour)
      const sessionTime = new Date(sessionData.timestamp)
      const now = new Date()
      const hoursDiff = (now - sessionTime) / (1000 * 60 * 60)
      
      if (hoursDiff > 1) {
        router.push('/packages')
        return
      }

      setPurchaseDetails(details)
      setIsValid(true)

      // Fire GTM dataLayer event for successful purchase
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        
        window.dataLayer.push({
          event: 'purchase_complete',
          event_category: 'Ecommerce',
          event_label: 'Checkout Success',
          value: details.totalAmount || 0,
          currency: 'USD',
          transaction_id: details.paymentId || searchParams.get('payment_intent') || Date.now().toString(),
        })

        window.dataLayer.push({
          event: 'page_view',
          page_title: 'Payment Successful',
          page_path: '/checkout/success',
        })
      }

      // Clear sessionStorage after displaying
      // sessionStorage.removeItem('purchaseDetails')
      // sessionStorage.removeItem('paymentSession')
    } catch (error) {
      console.error('Error parsing purchase details:', error)
      router.push('/packages')
    }
  }, [router, searchParams])

  if (!isValid || !purchaseDetails) {
    return (
      <div className="min-h-screen bg-black grid-background flex items-center justify-center">
        <Loader size='lg' text='Loading purchase details...' />
      </div>
    )
  }

  const { 
    packages = [], 
    oneTimePlans = [], 
    monthlyPlans = [], 
    totalAmount = 0,
    customerEmail = '',
    customerData = {},
    paymentId = ''
  } = purchaseDetails

  const paymentIntentId = searchParams.get('payment_intent') || paymentId

  return (
    <div className="min-h-screen bg-black grid-background">
      <Navbar />

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

        <div className="relative z-10">
          {/* Main Success Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#0091a4] shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)] md:shadow-[8px_8px_0px_0px_rgba(0,145,164,1)] p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden mb-8"
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
                    Payment Successful
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight text-center"
                >
                  Payment <span className="text-[#0091a4]">Confirmed!</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-black/70 mb-4 sm:mb-6 leading-relaxed text-center"
                >
                  Thank you for your purchase! Your payment has been confirmed successfully.
                  {monthlyPlans.length > 0 && ' Your subscription is now active.'}
                </motion.p>

                {/* Processing Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mb-8 sm:mb-10 p-4 bg-[#0091a4]/10 border-2 border-[#0091a4] rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#0091a4] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-black mb-1">Processing Your Order</p>
                      <p className="text-xs text-black/70">
                        Your confirmation email and invoice are being processed and will arrive within a few minutes. 
                        If you don't receive them, please check your spam folder or contact support.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Payment ID */}
                {paymentIntentId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6 sm:mb-8 p-4 bg-black/5 rounded-xl border-2 border-black/10"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#0091a4]" />
                        <span className="text-xs font-semibold text-black/60 uppercase tracking-wider">Payment ID:</span>
                      </div>
                      <span className="text-sm font-mono text-black font-bold">{paymentIntentId}</span>
                    </div>
                  </motion.div>
                )}

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8 sm:mb-10"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    {/* One-time Plans */}
                    {oneTimePlans.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-black/60 mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-[#0091a4]" />
                          One-Time Plans ({oneTimePlans.length})
                        </h3>
                        {oneTimePlans.map((plan, index) => (
                          <div key={`onetime-${index}`} className="bg-[#0091a4]/10 border-2 border-[#0091a4] p-4 rounded-xl mb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-semibold text-base text-black">{plan.title || plan.planTitle}</div>
                                <div className="text-xs text-black/60 mt-1">{plan.priceUnit || 'One-time'}</div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-lg font-bold text-black">
                                  ${(plan.price || 0).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Monthly Plans */}
                    {monthlyPlans.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-black/60 mb-3 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#0091a4]" />
                          Ongoing Subscription ({monthlyPlans.length})
                        </h3>
                        {monthlyPlans.map((plan, index) => (
                          <div key={`ongoing-${index}`} className="bg-[#0091a4]/10 border-2 border-[#0091a4] p-4 rounded-xl mb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-semibold text-base text-black">{plan.title || plan.planTitle}</div>
                                <div className="text-xs text-black/60 mt-1">{plan.priceUnit || '/month'}</div>
                                <div className="text-xs text-[#0091a4] mt-2 font-semibold">
                                  Active subscription • Billed monthly
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-lg font-bold text-black">
                                  ${(plan.price || 0).toLocaleString()}
                                </div>
                                <div className="text-xs text-[#0091a4] font-semibold">per month</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total */}
                    <div className="pt-4 border-t-2 border-black">
                      <div className="bg-black p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-white">Total Paid:</span>
                          <span className="text-2xl font-bold text-[#0091a4]">
                            ${totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10"
                >
                  <div className="bg-black p-4 sm:p-6 rounded-xl border-2 border-black hover:border-[#0091a4] transition-all group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#0091a4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1 sm:mb-2">Confirmation Email</h3>
                        <p className="text-xs sm:text-sm text-white/60">
                          Sent to {customerEmail || customerData?.email || 'your email'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-black hover:border-[#0091a4] transition-all group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#0091a4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-black mb-1 sm:mb-2">Invoice Available</h3>
                        <p className="text-xs sm:text-sm text-black/60">
                          Download your invoice from the email
                        </p>
                      </div>
                    </div>
                  </div>

                  {monthlyPlans.length > 0 && (
                    <>
                      <div className="bg-[#0091a4] p-4 sm:p-6 rounded-xl border-2 border-black group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-[#0091a4]" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-black mb-1 sm:mb-2">Next Billing</h3>
                            <p className="text-xs sm:text-sm text-black/70">
                              Automatically charged monthly
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-black hover:border-[#0091a4] transition-all group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#0091a4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-black" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-black mb-1 sm:mb-2">Service Active</h3>
                            <p className="text-xs sm:text-sm text-black/60">
                              Your subscription is now live
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  <Link
                    href="/"
                    className="flex-1 bg-black hover:bg-[#0091a4] text-white hover:text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group shadow-[3px_3px_0px_0px_rgba(0,145,164,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)]"
                  >
                    <Home className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-[-4px] transition-transform" />
                    <span>Back to Home</span>
                  </Link>

                  <Link
                    href="/packages"
                    className="flex-1 bg-white hover:bg-[#0091a4] text-black hover:text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group shadow-[3px_3px_0px_0px_rgba(0,145,164,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,145,164,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,145,164,1)]"
                  >
                    <span>View Packages</span>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Security Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-black"
                >
                  <div className="flex items-center justify-center gap-2 text-xs text-black/50">
                    <Shield className="w-4 h-4 text-[#0091a4]" />
                    <p className="text-center">Your payment was processed securely. All transactions are encrypted and protected.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function CheckoutSuccessFallback() {
  return (
    <div className="min-h-screen bg-black grid-background flex items-center justify-center">
      <Loader size='lg' text='Loading purchase details...' />
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<CheckoutSuccessFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

