import React from 'react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Main from '@/components/Services/Main/Main'
import Whyus from '@/components/Services/WhyUs/Whyus'
import CTA from '@/components/Home/CTA/CTA'
import Footer from '@/components/Home/Footer/Footer'

const services = () => {
  return (
    <div className='grid-background min-h-screen'>
      <div className='w-full'>
        <Navbar />
      </div>
      <Main />
      <Whyus />
      <CTA />
      <Footer />
    </div>
  )
}

export default services