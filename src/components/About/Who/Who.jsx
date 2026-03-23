'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Award, Shield, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Team members data
const teamMembers = [
  {
    name: 'Sam Josefi',
    role: 'CEO',
    image: '/team/sam.jpg',
    isCEO: true,
    socialMedia: {
      facebook: 'https://www.facebook.com/Cypentra',
      twitter: 'https://x.com/cypentra?s=11',
      instagram: 'https://www.instagram.com/cypentra/',
      linkedin: 'https://www.linkedin.com/in/sam-josefi-615b9537a',
    },
  },
  {
    name: 'Konstantin S.',
    role: 'Cybersecurity Engineer',
    image: '/team/victor.jpg',
    certifications: [
      {
        name: 'CompTIA Network Vulnerability Assessment Professional (CNVP)',
        shortName: 'CNVP',
        logo: '/certifications/Konstantin_C.png',
        link: 'https://www.credly.com/badges/8c78128b-4653-4b75-a24b-e2b8c7325e6e',
      },
      {
        name: 'CompTIA Security+ ce Certification',
        shortName: 'Security+',
        logo: '/certifications/Konstantin_S.png',
        link: 'https://www.credly.com/badges/b015d5bd-3f0d-4a25-9904-2b4bf650330b',
      },
    ],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  },
  {
    name: 'Ian H.',
    role: 'Cybersecurity & Compliance Consultant',
    image: '/team/eric.jpg',
    certifications: [
      {
        name: 'Certified Information Systems Security Professional',
        shortName: 'CISSP',
        logo: '/certifications/Ian_CI.png',
        link: 'https://www.credly.com/badges/aee79f8f-0ad7-4780-ba23-b777551f3588',
      },
      {
        name: 'Certified Cloud Security Professional',
        shortName: 'CCSP',
        logo: '/certifications/Ian_CC.png',
        link: 'https://www.credly.com/badges/c0fd36b2-9388-4be1-9ecf-914029ea4510',
      },
    ],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  },
  {
    name: 'Dennis Sauer',
    role: 'Cybersecurity Sales Engineer/CISSP',
    image: '/team/Dennis.png',
    certifications: [
      {
        name: 'Certified Information Systems Security Professional',
        shortName: 'CISSP',
        logo: '/certifications/Ian_CI.png',
        certificateImage: '/certifications/certification-Dennis Sauer ( CISSP ).jpg',
      },
    ],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  },
]

const Team = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  return (
    <section className='w-full py-8 sm:py-12 md:py-16 lg:py-20 grid-background relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#0091a4]/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#0091a4]/5 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-8 sm:mb-12 md:mb-16 lg:mb-20'
        >
          <div className='relative'>
            <div>
              <div className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-[#0091a4] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6'>
                Our Team
              </div>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4'>
                Meet Our
                <span className='block text-[#0091a4]'>Dedicated Experts</span>
              </h2>
              <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed'>
                Highly skilled and passionate cybersecurity professionals ready to protect your business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12'>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className='group relative'
            >
              {/* Glow effect */}
              <div className='absolute -inset-0.5 bg-gradient-to-r from-[#0091a4] via-white to-[#0091a4] opacity-0 group-hover:opacity-30 rounded-3xl blur-xl transition duration-500'></div>

              <div className={`relative bg-gradient-to-br ${member.isCEO ? 'from-[#0091a4] to-[#007a8a]' : 'from-white to-gray-50'} rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-2 ${member.isCEO ? 'border-[#0091a4]' : 'border-gray-200 group-hover:border-[#0091a4]'} transition-all duration-300 shadow-xl group-hover:shadow-2xl`}>
                {/* CEO Badge */}
                {member.isCEO && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className='absolute top-4 sm:top-6 right-4 sm:right-6 z-20'
                  >
                    <div className='bg-black text-[#0091a4] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl flex items-center gap-1.5 sm:gap-2 border-2 border-[#0091a4]'>
                      <Award className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                      <span className='text-xs font-bold'>CEO</span>
                    </div>
                  </motion.div>
                )}

                {/* Image Section with Creative Design */}
                <div className={`relative ${member.isCEO ? 'h-64 sm:h-72 md:h-80' : 'h-56 sm:h-64 md:h-72'} overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${member.isCEO ? 'from-[#0091a4]/20 to-transparent' : 'from-white/50 to-transparent'} z-10`}></div>

                  {/* Decorative shapes */}
                  <div className='absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#0091a4]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2'></div>
                  <div className='absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-[#0091a4]/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2'></div>

                  {/* Image Container */}
                  <div className={`relative h-full flex items-center justify-center p-4 sm:p-6 md:p-8 ${member.name === 'Dennis Sauer' ? 'items-end pb-6 sm:pb-8 md:pb-10' : ''}`}>
                    <div className={`relative ${member.isCEO ? 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56' : 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48'} rounded-full overflow-hidden border-4 ${member.isCEO ? 'border-black shadow-2xl' : 'border-white shadow-xl group-hover:border-[#0091a4]'} transition-all duration-500 group-hover:scale-110`}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className='object-cover'
                        style={member.name === 'Dennis Sauer' ? { objectPosition: 'center 25%' } : {}}
                        sizes='(max-width: 640px) 160px, (max-width: 768px) 200px, 250px'
                      />
                      {/* Shine effect */}
                      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`p-4 sm:p-6 md:p-8 ${member.isCEO ? 'bg-gradient-to-br from-[#0091a4] to-[#007a8a]' : 'bg-white'}`}>
                  {/* Name and Role */}
                  <div className='text-center mb-4 sm:mb-5 md:mb-6'>
                    <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 ${member.isCEO ? 'text-black' : 'text-black'}`}>
                      {member.name}
                    </h3>
                    <p className={`text-xs sm:text-sm md:text-base font-semibold ${member.isCEO ? 'text-black/80' : 'text-[#0091a4]'}`}>
                      {member.role}
                    </p>
                  </div>

                  {/* Certifications */}
                  {member.certifications && member.certifications.length > 0 && (
                    <div className='mb-4 sm:mb-5 md:mb-6'>
                      <div className='flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3'>
                        <Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${member.isCEO ? 'text-black/60' : 'text-[#0091a4]'}`} />
                        <p className={`text-xs font-bold uppercase tracking-wider ${member.isCEO ? 'text-black/60' : 'text-gray-500'}`}>
                          Certifications
                        </p>
                      </div>
                      <div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
                        {member.certifications.map((cert, certIndex) => (
                          cert.certificateImage ? (
                            <motion.button
                              key={certIndex}
                              onClick={() => setSelectedCertificate(cert.certificateImage)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`group/cert flex items-center gap-1.5 sm:gap-2 ${member.isCEO ? 'bg-black/20 hover:bg-black/30 border border-black/30' : 'bg-gray-50 hover:bg-[#0091a4]/10 border border-gray-200 hover:border-[#0091a4]'} rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer`}
                            >
                              {cert.logo && (
                                <div className='relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'>
                                  <Image
                                    src={cert.logo}
                                    alt={cert.shortName}
                                    fill
                                    className='object-contain'
                                  />
                                </div>
                              )}
                              <span className={`text-xs sm:text-sm font-semibold ${member.isCEO ? 'text-black group-hover/cert:text-black' : 'text-gray-700 group-hover/cert:text-[#0091a4]'}`}>
                                {cert.shortName}
                              </span>
                            </motion.button>
                          ) : (
                            <motion.a
                              key={certIndex}
                              href={cert.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`group/cert flex items-center gap-1.5 sm:gap-2 ${member.isCEO ? 'bg-black/20 hover:bg-black/30 border border-black/30' : 'bg-gray-50 hover:bg-[#0091a4]/10 border border-gray-200 hover:border-[#0091a4]'} rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all duration-300 shadow-sm hover:shadow-md`}
                            >
                              {cert.logo && (
                                <div className='relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'>
                                  <Image
                                    src={cert.logo}
                                    alt={cert.shortName}
                                    fill
                                    className='object-contain'
                                  />
                                </div>
                              )}
                              <span className={`text-xs sm:text-sm font-semibold ${member.isCEO ? 'text-black group-hover/cert:text-black' : 'text-gray-700 group-hover/cert:text-[#0091a4]'}`}>
                                {cert.shortName}
                              </span>
                            </motion.a>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Media Icons */}
                  {member.socialMedia && (
                    <div className='flex items-center justify-center gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t border-white/10'>
                      {member.socialMedia.facebook && (
                        <motion.a
                          href={member.socialMedia.facebook}
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl ${member.isCEO ? 'bg-black/20 hover:bg-black/30' : 'bg-gray-100 hover:bg-[#0091a4]'} flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg`}
                        >
                          <Facebook className={`w-4 h-4 sm:w-5 sm:h-5 ${member.isCEO ? 'text-black' : 'text-gray-600 group-hover:text-white'} transition-colors`} />
                        </motion.a>
                      )}
                      {member.socialMedia.twitter && (
                        <motion.a
                          href={member.socialMedia.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl ${member.isCEO ? 'bg-black/20 hover:bg-black/30' : 'bg-gray-100 hover:bg-[#0091a4]'} flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg`}
                        >
                          <Twitter className={`w-4 h-4 sm:w-5 sm:h-5 ${member.isCEO ? 'text-black' : 'text-gray-600 group-hover:text-white'} transition-colors`} />
                        </motion.a>
                      )}
                      {member.socialMedia.instagram && (
                        <motion.a
                          href={member.socialMedia.instagram}
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl ${member.isCEO ? 'bg-black/20 hover:bg-black/30' : 'bg-gray-100 hover:bg-[#0091a4]'} flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg`}
                        >
                          <Instagram className={`w-4 h-4 sm:w-5 sm:h-5 ${member.isCEO ? 'text-black' : 'text-gray-600 group-hover:text-white'} transition-colors`} />
                        </motion.a>
                      )}
                      {member.socialMedia.linkedin && (
                        <motion.a
                          href={member.socialMedia.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl ${member.isCEO ? 'bg-black/20 hover:bg-black/30' : 'bg-gray-100 hover:bg-[#0091a4]'} flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg`}
                        >
                          <Linkedin className={`w-4 h-4 sm:w-5 sm:h-5 ${member.isCEO ? 'text-black' : 'text-gray-600 group-hover:text-white'} transition-colors`} />
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Image Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className='relative max-w-4xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden border-2 border-[#0091a4]/30'
              >
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className='absolute top-4 right-4 z-10 w-10 h-10 bg-[#0091a4] hover:bg-white text-black rounded-full flex items-center justify-center transition-all shadow-lg'
                >
                  <X className='w-5 h-5' />
                </button>
                <div className='relative w-full h-full max-h-[90vh] overflow-auto'>
                  <Image
                    src={selectedCertificate}
                    alt='CISSP Certification'
                    width={1200}
                    height={800}
                    className='w-full h-auto object-contain'
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Team
