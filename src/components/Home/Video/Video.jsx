'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Star, Play, X } from 'lucide-react'
import { motion } from 'framer-motion'

const Video = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);

  useEffect(() => {
    testimonials.forEach(testimonial => {
      const videoElement = videoRefs.current[testimonial.id];
      if (videoElement) {
        if (hoveredVideo === testimonial.id) {
          setTimeout(() => {
            if (videoElement && hoveredVideo === testimonial.id) {
              videoElement.play().catch(err => console.log('Video play error:', err));
            }
          }, 50);
        } else {
          videoElement.volume = 0;
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });

    return () => {
      testimonials.forEach(testimonial => {
        const videoElement = videoRefs.current[testimonial.id];
        if (videoElement) {
          videoElement.pause();
        }
      });
    };
  }, [hoveredVideo]);

  useEffect(() => {
    if (modalVideoRef.current) {
      if (activeVideo) {
        modalVideoRef.current.play().catch(err => console.log('Modal video play error:', err));
      } else {
        modalVideoRef.current.pause();
      }
    }
  }, [activeVideo]);

  const testimonials = [
    {
      id: 1,
      name: "Mark Mitchell",
      title: "CTO at CloudScale",
      quote: "Their SOC 2 readiness program was thorough and efficient. We achieved compliance in record time with their expert guidance.",
      videoUrl: "/IMG_0744.mp4"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "CEO at DataSecure",
      quote: "The cloud security audit identified critical vulnerabilities we didn't know existed. Their team's expertise gave us peace of mind.",
      videoUrl: "IMG_0745.mp4"
    },
    {
      id: 3,
      name: "Jason Rodriguez",
      title: "Dataflow LTD",
      quote: "Working with their vCISO service has been transformative. We now have enterprise-level security without the enterprise cost.",
      videoUrl: "IMG_0747.mp4"
    }
  ];

  const handleVideoClick = (testimonial) => {
    setActiveVideo(testimonial);
    testimonials.forEach(t => {
      if (videoRefs.current[t.id]) {
        videoRefs.current[t.id].pause();
      }
    });
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  return (
    <div className="w-full bg-black py-12 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight"
          >
            Trusted by Security-Conscious Teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            See how we've helped businesses achieve compliance and strengthen their security posture.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-out bg-[#1e4d4d] ${hoveredVideo === testimonial.id
                ? 'md:flex-grow md:w-[50%]'
                : hoveredVideo === null
                  ? 'md:flex-1'
                  : 'md:flex-shrink md:w-[25%]'
                } cursor-pointer group`}
              onMouseEnter={() => setHoveredVideo(testimonial.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              onClick={() => handleVideoClick(testimonial)}
              style={{
                transitionProperty: 'width, flex-grow, flex-shrink, transform',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                willChange: 'width, flex-grow, flex-shrink, transform, opacity'
              }}
            >
              <div className="relative h-52 md:h-64 w-full">
                <video
                  className="absolute inset-0 object-cover w-full h-full transition-all duration-700"
                  src={testimonial.videoUrl}
                  ref={el => videoRefs.current[testimonial.id] = el}
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transition-all duration-500">
                  <div className='flex items-center justify-start'>
                    <div className="flex items-center mb-3">
                      <div
                        className={`bg-[#0091a4] rounded-full p-2 mr-2 transform transition-all duration-300 ${hoveredVideo === testimonial.id ? 'scale-110' : 'scale-100'
                          }`}
                      >
                        <Play className="h-6 w-6" fill="black" />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <h3 className="text-lg md:text-xl font-semibold leading-[1.3]">{testimonial.name}</h3>
                      <p className="text-gray-300 text-sm leading-[1.4]">{testimonial.title}</p>
                    </div>
                  </div>

                  <div
                    className={`w-[80%] overflow-hidden transition-all duration-500 ease-out ${hoveredVideo === testimonial.id ? 'max-h-24' : 'max-h-0'
                      }`}
                  >
                    <p
                      className={`mt-3 text-sm leading-tight transition-all duration-500 ease-out transform ${hoveredVideo === testimonial.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                        }`}
                      style={{
                        transitionDelay: hoveredVideo === testimonial.id ? '150ms' : '0ms',
                      }}
                    >
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            className="w-full max-w-5xl rounded-3xl overflow-hidden relative animate-scaleIn"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white font-medium hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X className="h-8 w-8" fill="white" />
            </button>

            <div className="aspect-video w-full rounded-3xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                src={activeVideo.videoUrl}
                ref={modalVideoRef}
                controls
                autoPlay
                muted={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Video