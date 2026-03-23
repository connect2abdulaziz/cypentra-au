'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'

const Textarea = ({
  label,
  required,
  error,
  helperText,
  focusedField,
  fieldName,
  onFocus,
  onBlur,
  ...props
}) => {
  const isFocused = focusedField === fieldName

  return (
    <div className='relative group'>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className='block text-xs font-bold text-black uppercase tracking-wider mb-2 sm:mb-3'
        >
          {label} {required && <span className='text-[#0091a4]'>*</span>}
        </label>
      )}
      <textarea
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full bg-white border-2 ${error
            ? 'border-red-500 focus:border-red-500'
            : 'border-black focus:border-[#0091a4]'
          } rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base text-black placeholder-black/30 transition-all outline-none resize-none font-medium`}
      />
      <div className={`absolute bottom-0 left-0 h-0.5 bg-[#0091a4] transition-all duration-300 ${isFocused ? 'w-full' : 'w-0'}`}></div>
      {error && (
        <p className='mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500 flex items-center gap-1'>
          <AlertCircle className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className='mt-1.5 sm:mt-2 text-xs sm:text-sm text-black/50'>{helperText}</p>
      )}
    </div>
  )
}

export default Textarea

