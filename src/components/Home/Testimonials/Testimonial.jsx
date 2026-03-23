'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    text: "Dazzle has been a game-changer. The process is so simple and quick that I can send money anytime, anywhere, and it's immediately available to the recipient.",
    name: "Sarah Wilson",
    role: "CEO of Hummingbird",
    image: "/model4.jpg",
    color: 'bg-black'
  },
  {
    text: "Cypentra helped us prepare for SOC 2 from zero. Sam followed up on every detail and gave clear guidance to our developers.",
    name: "E-commerce Client",
    role: "AWS platform",
    image: "/model3.jpg",
    color: 'bg-yellow-400'
  },
  {
    text: "The team's expertise in cloud security helped us identify and fix critical vulnerabilities before they became issues.",
    name: "SaaS Startup",
    role: "GCP platform",
    image: "/model1.jpg",
    color: 'bg-[#0091a4]'
  },
  // {
  //   text: "GDPR compliance was overwhelming until Cypentra provided clear templates and step-by-step guidance.",
  //   name: "FinTech Company",
  //   role: "EU-based",
  //   image: "/model2.jpg",
  //   color: 'bg-blue'
  // }
]

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  // Get the colors for the three layers based on current index
  const getCardColors = () => {
    const colors = ['bg-yellow-400', 'bg-green-500', 'bg-black']
    const rotatedColors = []
    for (let i = 0; i < 3; i++) {
      rotatedColors.push(colors[(currentIndex + i) % colors.length])
    }
    return rotatedColors
  }

  const [backColor, middleColor, frontColor] = getCardColors()

  return (
    <section className='w-full py-12 px-4 sm:px-6 md:px-10 lg:px-16'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight'>
            Trust is built with<br />consistency
          </h2>
        </div>

        {/* Stacked Cards Container */}
        <div className='relative flex items-center justify-center mb-8 sm:mb-12 min-h-64 sm:min-h-72 md:min-h-80 xl:min-h-96'>
          {/* Back Card */}
          <div
            key={`back-${currentIndex}`}
            className={`absolute w-full max-w-4xl h-[300px] md:h-[350px] rounded-3xl ${backColor}`}
            style={{
              transform: 'translate(20px, -20px)',
              zIndex: 1,
              transition: 'background-color 0.5s ease-in-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* Middle Card */}
          <div
            key={`middle-${currentIndex}`}
            className={`absolute w-full max-w-4xl h-[300px] md:h-[350px] rounded-3xl ${middleColor}`}
            style={{
              transform: 'translate(10px, -10px)',
              zIndex: 2,
              transition: 'background-color 0.5s ease-in-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* Front Card */}
          <div
            key={`front-${currentIndex}`}
            className={`relative w-full max-w-4xl h-[300px] md:h-[350px] rounded-3xl ${frontColor} testimonial-card-enter`}
            style={{
              zIndex: 3,
              willChange: 'background-color, opacity, transform',
              transition: 'background-color 0.5s ease-in-out'
            }}
          >
            <div className='h-full p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8'>
              {/* Left Section - Icon, Text, and Attribution */}
              <div className='flex-1 flex flex-col'>
                {/* Circular Icon - Half Green, Half White */}
                <div className='mb-4'>
                  <div className='w-12 h-12 rounded-full relative overflow-hidden'>
                    <div className='absolute inset-0 bg-green-500' style={{ width: '50%' }} />
                    <div className='absolute inset-0 bg-white' style={{ left: '50%', width: '50%' }} />
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className={`text-base md:text-lg leading-relaxed mb-4 flex-1 ${frontColor === 'bg-black' ? 'text-white' : 'text-black'
                  }`}>
                  "{currentTestimonial.text}"
                </p>

                {/* Attribution */}
                <div>
                  <p className={`font-semibold text-sm md:text-base ${frontColor === 'bg-black' ? 'text-white' : 'text-black'
                    }`}>
                    {currentTestimonial.name}
                  </p>
                  <p className={`text-xs md:text-sm ${frontColor === 'bg-black' ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>

              {/* Right Section - Portrait Photo */}
              <div className='w-full md:w-1/3 flex-shrink-0'>
                <div className='relative w-full h-full min-h-[150px] md:min-h-[200px] rounded-2xl overflow-hidden bg-black'>
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='flex items-center justify-center gap-4'>
          <button
            onClick={prevTestimonial}
            className='w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200 flex items-center justify-center group'
            aria-label="Previous testimonial"
          >
            <ChevronLeft className='w-6 h-6 text-gray-700 group-hover:text-gray-900' />
          </button>
          <button
            onClick={nextTestimonial}
            className='w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200 flex items-center justify-center group'
            aria-label="Next testimonial"
          >
            <ChevronRight className='w-6 h-6 text-gray-700 group-hover:text-gray-900' />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonial