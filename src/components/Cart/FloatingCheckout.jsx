'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

const FloatingCheckout = () => {
  const { cartItems, getCartCount, clearCart } = useCart()
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (getCartCount() === 0) return null

  const handleCheckout = () => {
    const packageIds = cartItems.map(item => item.id).join(',')
    window.location.href = `/checkout?packages=${packageIds}`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='fixed bottom-6 right-6 z-50'
      >
        {isExpanded ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 w-80 sm:w-96'
          >
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold text-white'>Cart ({getCartCount()})</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
            
            <div className='space-y-2 max-h-48 overflow-y-auto mb-4 scrollbar-hide'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='bg-white/5 border border-white/10 rounded-lg p-3'
                >
                  <h4 className='text-white font-semibold text-sm mb-1'>{item.title}</h4>
                  <p className='text-gray-400 text-xs'>{item.price} {item.priceUnit}</p>
                </div>
              ))}
            </div>
            
            <div className='space-y-2'>
              <button
                onClick={handleCheckout}
                className='w-full bg-[#0091a4] text-black font-bold py-3 rounded-xl hover:bg-[#007a8a] transition-colors shadow-lg shadow-[#0091a4]/30'
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className='w-full bg-white/10 text-white font-semibold py-2 rounded-xl hover:bg-white/20 transition-colors text-sm'
              >
                Clear Cart
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className='bg-[#0091a4] text-black px-6 py-4 rounded-full font-bold shadow-2xl shadow-[#0091a4]/50 flex items-center gap-3 border-2 border-white hover:bg-white transition-all'
          >
            <div className='relative'>
              <ShoppingCart className='w-6 h-6' />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className='absolute -top-1.5 -right-1.5 bg-gradient-to-br from-[#0091a4] to-[#007a8a] text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 shadow-lg shadow-[#0091a4]/40 border-2 border-white'
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  lineHeight: '1'
                }}
              >
                {getCartCount() > 99 ? '99+' : getCartCount()}
              </motion.div>
            </div>
            <span className='text-base sm:text-lg'>Checkout</span>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default FloatingCheckout

