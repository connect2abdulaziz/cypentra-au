import React from 'react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Main from '@/components/Contact/Main/Main'
import Footer from '@/components/Home/Footer/Footer'

const page = () => {
  return (
    <div className=''>
      <div className='grid-background w-full'>
        <Navbar />
      </div>
      <Main />
      <Footer />
    </div>
  )
}

export default page