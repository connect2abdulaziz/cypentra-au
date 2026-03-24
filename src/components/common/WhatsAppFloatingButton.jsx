'use client'

import React from 'react'

const WhatsAppFloatingButton = () => {
  const phoneNumber = '12818607832'
  const message = encodeURIComponent('Hi, I have a question about your security services')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat with us on WhatsApp'
      className='fixed bottom-6 left-6 z-50 group'
    >
      <span className='pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        Chat with us
      </span>
      <div className='flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#25D366]/50'>
        <svg viewBox='0 0 32 32' className='h-7 w-7 sm:h-8 sm:w-8 fill-black' aria-hidden='true'>
          <path d='M19.11 17.18c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.97 2.62 1.11 2.8c.14.18 1.9 2.9 4.61 4.06.64.28 1.14.44 1.53.56.64.2 1.22.17 1.68.1.51-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z' />
          <path d='M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.7 6.4L3.2 28.8l6.56-1.67A12.75 12.75 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2zm0 23.25c-2 0-3.95-.54-5.65-1.57l-.4-.24-3.9 1 .99-3.8-.26-.42a10.41 10.41 0 0 1-1.6-5.42c0-5.74 4.67-10.41 10.41-10.41S26 10.26 26 16s-4.67 10.45-10 10.45z' />
        </svg>
      </div>
    </a>
  )
}

export default WhatsAppFloatingButton
