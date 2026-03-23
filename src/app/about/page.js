import React from 'react'
import Navbar from '@/components/Home/NavBar/Navbar'
import Main from '@/components/About/Main/Main'
import Cards from '@/components/About/Cards/Cards'
import Who from '@/components/About/Who/Who'
import Footer from '@/components/Home/Footer/Footer'

const page = () => {
  return (
    <div className='min-h-screen relative'>
      <div className='grid-background w-full'>
        <Navbar />
      </div>
      <Main />
      <Cards />
      <Who />
      <Footer />
    </div>
  )
}

export default page