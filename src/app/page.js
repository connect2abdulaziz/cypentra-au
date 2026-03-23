import Hero from '@/components/Home/Hero/Hero'
import Navbar from '@/components/Home/NavBar/Navbar'
import ThreatMap from '@/components/Home/ThreatMap/ThreatMap'
import Whychooseus from '@/components/Home/Why Choose Us/Whychooseus'
import Testimonial from '@/components/Home/Testimonials/Testimonial'
import Pricing from '@/components/Home/Pricing/Pricing'
import FAQ from '@/components/Home/FAQ/FAQ'
import CTA from '@/components/Home/CTA/CTA'
import Footer from '@/components/Home/Footer/Footer'
import Reviews from '@/components/Home/Reviews/Reviews'
import React from 'react'
// import Packages from '@/app/packages/page'
import Video from '@/components/Home/Video/Video'
import CypentraArchitecture from '@/components/Home/Animation'
import FloatingCheckout from '@/components/Cart/FloatingCheckout'
const page = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="grid-background w-full">
        <Navbar />
        <Hero />
      </div>
      <ThreatMap />
      <Whychooseus />
      <CypentraArchitecture />
      <Pricing />
      {/* <Packages /> */}
      {/* <Testimonial /> */}
      {/* <Reviews /> */}
      <Video />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingCheckout />
    </div>
  )
}

export default page