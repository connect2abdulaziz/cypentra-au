'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { getReviews } from '@/services/reviews'

const ReviewsCarousel = ({ trustpilotUrl }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch all reviews (increase limit to get more)
        const data = await getReviews(1, 100) // Fetch up to 100 reviews
        // Handle different response structures
        let reviewsData = []
        if (Array.isArray(data)) {
          reviewsData = data
        } else if (data?.data?.reviews) {
          reviewsData = Array.isArray(data.data.reviews) ? data.data.reviews : []
        } else if (data?.reviews) {
          reviewsData = Array.isArray(data.reviews) ? data.reviews : []
        }
        setReviews(reviewsData)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (reviews.length <= 3) return // Don't auto-rotate if 3 or fewer reviews

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(reviews.length / 3) - 1
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 5000) // Change every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [reviews.length])

  // Get current set of 3 reviews to display
  const getCurrentReviews = () => {
    const startIndex = currentIndex * 3
    return reviews.slice(startIndex, startIndex + 3)
  }

  // Calculate total number of pages (sets of 3)
  const totalPages = Math.ceil(reviews.length / 3)

  const handleReviewClick = (review) => {
    // Redirect to Trustpilot review URL
    if (trustpilotUrl) {
      window.open(trustpilotUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating || 5)

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            className='w-3 h-3 sm:w-4 sm:h-4 fill-[#0091a4] text-[#0091a4]'
          />
        )
      } else {
        stars.push(
          <Star
            key={i}
            className='w-3 h-3 sm:w-4 sm:h-4 fill-gray-300 text-gray-300'
          />
        )
      }
    }
    return stars
  }

  if (loading) {
    return null
  }

  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <section className='w-full py-8 sm:py-12 md:py-16 lg:py-20 grid-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16'>
        {/* Section Header */}
        <div className='text-center mb-8 sm:mb-10 md:mb-12'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4'>
            What Our <span className='text-[#0091a4]'>Clients Say</span>
          </h2>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto'>
            Real feedback from businesses we've helped secure
          </p>
        </div>

        {/* Reviews Grid - 3 Cards with Auto-Rotation */}
        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8'
            >
              {getCurrentReviews().map((review, index) => (
                <motion.div
                  key={review._id || review.review_id || `${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleReviewClick(review)}
                  className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-black hover:border-[#0091a4] transition-all cursor-pointer shadow-lg hover:shadow-xl group h-full flex flex-col'
                >
                  {/* Review Header */}
                  <div className='flex items-start justify-between gap-3 mb-3 sm:mb-4'>
                    <div className='flex-1'>
                      {/* Reviewer Info */}
                      <div className='flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0091a4] flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0'>
                          {review.consumer_name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-sm sm:text-base font-bold text-black truncate'>
                            {review.consumer_name || 'Anonymous'}
                          </h3>
                          <p className='text-xs text-black/60'>
                            {review.consumer_country || 'Verified Customer'}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className='flex items-center gap-2 mb-2 sm:mb-3'>
                        <div className='flex gap-0.5'>
                          {renderStars(review.review_rating || 5)}
                        </div>
                        <span className='text-xs sm:text-sm font-semibold text-black'>
                          {review.review_rating || 5}.0
                        </span>
                      </div>
                    </div>

                    {/* External Link Icon */}
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black group-hover:bg-[#0091a4] flex items-center justify-center transition-all'>
                        <ExternalLink className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className='flex-1 mb-3 sm:mb-4'>
                    <p className='text-xs sm:text-sm text-black leading-relaxed line-clamp-4'>
                      {review.review_text || review.review_title || 'No review text available.'}
                    </p>
                  </div>

                  {/* Review Footer */}
                  <div className='flex items-center justify-between pt-3 border-t border-black/10'>
                    <div className='flex items-center gap-1.5'>
                      <div className='w-1.5 h-1.5 rounded-full bg-[#0091a4]'></div>
                      <span className='text-xs text-black/60'>
                        Verified
                      </span>
                    </div>
                    {review.createdAt && (
                      <span className='text-xs text-black/50'>
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 mt-6 sm:mt-8 md:mt-10'>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    // Reset auto-rotation timer
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current)
                    }
                    intervalRef.current = setInterval(() => {
                      setCurrentIndex((prevIndex) => {
                        const maxIndex = Math.ceil(reviews.length / 3) - 1
                        return prevIndex >= maxIndex ? 0 : prevIndex + 1
                      })
                    }, 5000)
                  }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-[#0091a4] w-6 sm:w-8'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to review set ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReviewsCarousel

