'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useCart } from '@/contexts/CartContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const logoRef = useRef(null)
  const navLinksRef = useRef(null)
  const cartRef = useRef(null)
  const navbarRef = useRef(null)
  const { cartItems, removeFromCart, getCartCount, clearCart } = useCart()

  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 50], [0.95, 1])
  const navbarBlur = useTransform(scrollY, [0, 50], [8, 16])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // GSAP timeline for smooth entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Logo animation
    if (logoRef.current) {
      tl.from(logoRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6
      })
    }

    // Nav links staggered animation (desktop only)
    if (navLinksRef.current && window.innerWidth >= 1024) {
      const children = Array.from(navLinksRef.current.children)
      tl.from(children, {
        opacity: 0,
        y: -15,
        stagger: 0.05,
        duration: 0.5
      }, '-=0.3')
    }

    // Cart button - fade in only, no Y movement
    if (cartRef.current) {
      tl.from(cartRef.current, {
        opacity: 0,
        duration: 0.5
      }, '-=0.4')
    }
  }, [])

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Packages' },
    { href: '/about', label: 'About' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/resources', label: 'Resources' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <>
      {/* Sticky Navbar */}
      <motion.nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'
          }`}
        style={{
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        {/* Background with gradient and blur - only visible when scrolled */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${isScrolled
            ? 'bg-black/90 border-b border-white/10 shadow-2xl'
            : 'bg-transparent'
            }`}
        />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='flex items-center justify-between h-14 sm:h-16'>
            {/* Logo */}
            <Link href='/'>
              <motion.div
                ref={logoRef}
                className='flex items-center cursor-pointer'
              >
                <div className='relative w-24 h-10 sm:w-28 sm:h-12 md:w-32 md:h-14'>
                  <Image
                    src='/logo.png'
                    alt='Cypentra Logo'
                    fill
                    className='object-contain'
                    priority
                    style={{
                      filter: 'brightness(1.05) contrast(1.15) saturate(1.4) hue-rotate(15deg)',
                    }}
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div
              ref={navLinksRef}
              className='hidden lg:flex items-center gap-1 bg-white/5 px-2 py-2 rounded-full border border-white/10 backdrop-blur-xl'
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href + index}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={link.href}
                    className='relative text-white font-medium text-sm px-3 py-2 rounded-full hover:text-[#0091a4] transition-all duration-300 group overflow-hidden'
                  >
                    {/* Hover background effect */}
                    <motion.span
                      className='absolute inset-0 bg-[#0091a4]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300'
                    />
                    <span className='relative z-10'>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side buttons */}
            <div className='flex items-center gap-2 sm:gap-3'>
              {/* Cart Button */}
              <motion.button
                key="cart-button"
                ref={cartRef}
                onClick={() => setIsCartOpen(!isCartOpen)}
                className='bg-[#0091a4] text-black px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 rounded-full font-bold cursor-pointer border-2 border-[#0091a4] hover:border-white transition-all relative overflow-visible group'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                style={{ zIndex: 60 }}
              >


                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  className='relative z-10'
                >
                  <ShoppingBag className='w-4 h-4 sm:w-5 sm:h-5' />
                </motion.div>
                <span className='hidden sm:inline relative z-10 text-sm'>Cart</span>
                {/* Cart Count Badge - Professional Design */}
                {getCartCount() > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className='relative z-10 bg-gradient-to-br from-[#0091a4] to-[#007a8a] text-white rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1.5 shadow-lg shadow-[#0091a4]/40 border-2 border-white'
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '-0.02em',
                      lineHeight: '1',
                      zIndex: 100
                    }}
                  >
                    {getCartCount() > 99 ? '99+' : getCartCount()}
                  </motion.div>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='lg:hidden bg-white/10 text-white p-2 rounded-full border border-white/20 backdrop-blur-xl'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className='w-5 h-5 sm:w-6 sm:h-6' />
                ) : (
                  <Menu className='w-5 h-5 sm:w-6 sm:h-6' />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className='fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] lg:hidden'
            />

            {/* Mobile Menu - Creative Folding Design */}
            <motion.div
              initial={{
                opacity: 0,
                x: '100%',
                scale: 0.95,
                rotateY: 10
              }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : '100%',
                scale: isMobileMenuOpen ? 1 : 0.95,
                rotateY: isMobileMenuOpen ? 0 : 10,
              }}
              exit={{
                opacity: 0,
                x: '100%',
                scale: 0.95,
                rotateY: 10
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              className={`fixed ${isScrolled ? 'top-[60px]' : 'top-[68px]'
                } right-0 bottom-0 w-full sm:w-96 bg-black z-[9999] lg:hidden border-l-2 border-[#0091a4]/30 shadow-2xl shadow-[#0091a4]/20 overflow-hidden`}
            >
              {/* Decorative Background Elements */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-[#0091a4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-[1]'></div>
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#0091a4]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 z-[1]'></div>

              {/* Animated Grid Pattern */}
              <div
                className='absolute inset-0 opacity-[0.03] z-[1]'
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 145, 164, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 145, 164, 0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              ></div>

              {/* Content Container */}
              <div className='relative z-10 flex flex-col h-full'>
                {/* Header Section */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
                  transition={{ delay: 0.1 }}
                  className='p-6 border-b border-white/10 flex-shrink-0'
                >
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-[#0091a4] animate-pulse'></div>
                      <span className='text-xs font-bold text-[#0091a4] uppercase tracking-wider'>Navigation</span>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className='text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </div>
                  <div className='h-1 bg-gradient-to-r from-[#0091a4] via-[#0091a4]/50 to-transparent rounded-full'></div>
                </motion.div>

                {/* Menu Items */}
                <div className='flex flex-col p-6 gap-2 overflow-y-auto scrollbar-hide flex-1 min-h-0'>
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: 50,
                        rotateX: -15
                      }}
                      animate={{
                        opacity: isMobileMenuOpen ? 1 : 0,
                        x: isMobileMenuOpen ? 0 : 50,
                        rotateX: isMobileMenuOpen ? 0 : -15,
                      }}
                      transition={{
                        delay: index * 0.08,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                      }}
                      whileHover={{ x: 8 }}
                      className='group'
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className='relative block text-white hover:text-[#0091a4] font-semibold text-base sm:text-lg px-5 py-4 rounded-xl hover:bg-gradient-to-r hover:from-[#0091a4]/10 hover:to-transparent transition-all duration-300 border border-transparent hover:border-[#0091a4]/30 overflow-hidden'
                      >
                        {/* Hover Background Effect */}
                        <motion.div
                          className='absolute inset-0 bg-[#0091a4]/5 rounded-xl'
                          initial={{ scaleX: 0, originX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Left Accent Line */}
                        <motion.div
                          className='absolute left-0 top-0 bottom-0 w-1 bg-[#0091a4] rounded-r-full'
                          initial={{ scaleY: 0, originY: 0 }}
                          whileHover={{ scaleY: 1 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Content */}
                        <div className='relative z-10 flex items-center justify-between'>
                          <span className='group-hover:translate-x-2 transition-transform duration-300'>{link.label}</span>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className='text-[#0091a4]'
                          >
                            →
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
                  transition={{ delay: 0.5 }}
                  className='p-6 border-t border-white/10 flex-shrink-0'
                >
                  <div className='flex items-center gap-2 text-xs text-white/40'>
                    <div className='w-1.5 h-1.5 rounded-full bg-[#0091a4]'></div>
                    <span>Secure Navigation</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className='fixed top-20 right-4 sm:right-6 lg:right-8 w-80 sm:w-96 bg-black border border-white/10 rounded-2xl shadow-2xl z-50 p-4 sm:p-6'
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg sm:text-xl font-bold text-white'>Shopping Cart</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className='text-center py-8'>
                  <ShoppingBag className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                  <p className='text-gray-400 text-sm'>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className='space-y-3 max-h-64 overflow-y-auto mb-4 scrollbar-hide'>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className='bg-white/5 border border-white/10 rounded-lg p-3 flex items-start justify-between gap-3'
                      >
                        <div className='flex-1'>
                          <h4 className='text-white font-semibold text-sm mb-1'>{item.title}</h4>
                          <p className='text-gray-400 text-xs'>{item.price} {item.priceUnit}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className='text-red-400 hover:text-red-300 transition-colors'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='space-y-2'>
                    <button
                      onClick={() => {
                        const packageIds = cartItems.map(item => item.id).join(',')
                        window.location.href = `/checkout?packages=${packageIds}`
                      }}
                      className='w-full bg-[#0091a4] text-black font-bold py-3 rounded-full hover:bg-[#007a8a] transition-colors'
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className='w-full bg-white/10 text-white font-semibold py-2 rounded-full hover:bg-white/20 transition-colors text-sm'
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className='h-14 sm:h-16' />
    </>
  )
}

export default Navbar