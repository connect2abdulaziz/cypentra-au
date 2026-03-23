'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ size = 'md', text, fullScreen = false, className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
    xl: 'w-20 h-20 border-4'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  if (fullScreen) {
    return (
      <div className='fixed inset-0 bg-black/90 backdrop-blur-sm z-[99999] flex items-center justify-center'>
        <div className='text-center'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`${sizeClasses[size]} border-[#0091a4] border-t-transparent rounded-full animate-spin mx-auto mb-4`}
          />
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${textSizes[size]} text-white/70 font-medium`}
            >
              {text}
            </motion.p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`${sizeClasses[size]} border-[#0091a4] border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${textSizes[size]} text-white/70 font-medium mt-4`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default Loader

