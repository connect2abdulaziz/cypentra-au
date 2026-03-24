'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'

const Partners = () => {
  const logos = useMemo(
    () => [
      { id: 1, src: '/brands/1.jpg', alt: 'Partner logo 1' },
      { id: 2, src: '/brands/2.jpg', alt: 'Partner logo 2' },
      { id: 3, src: '/brands/3.jpg', alt: 'Partner logo 3' },
      // { id: 4, src: '/brands/4.jpg', alt: 'Partner logo 4' },
      // { id: 5, src: '/brands/5.jpg', alt: 'Partner logo 5' },
      { id: 7, src: '/brands/7.png', alt: 'Partner logo 7' },
      { id: 8, src: '/brands/8.png', alt: 'Partner logo 8' },
      { id: 9, src: '/brands/9.png', alt: 'Partner logo 9' },
      { id: 10, src: '/brands/10.png', alt: 'Partner logo 10' },
    ],
    []
  )

  return (
    <section className='w-full grid-background py-10 sm:py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16'>
        <div className='text-center mb-8 sm:mb-10 md:mb-12'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
            In collaboration with <span className='text-[#0091a4]'>trusted partners</span>
          </h2>
        </div>

        <div className='relative overflow-hidden py-2 carousel-mask'>
          <div className='flex gap-6 sm:gap-8 md:gap-10 animate-scroll-left will-change-transform'>
            {[...logos, ...logos].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className='shrink-0 w-28 sm:w-36 md:w-44 lg:w-48 h-16 sm:h-20 md:h-24 lg:h-28 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex items-center justify-center'
              >
                <div className='relative w-full h-full'>
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    className='object-contain'
                    sizes='(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 192px'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 26s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Partners
