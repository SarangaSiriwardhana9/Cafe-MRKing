import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footer from '../components/Footer'

function Main() {
  return (
    <div className='bg-white'>
        <Navbar />
        <div className='min-h-screen'>
        <Outlet />
        </div>
        <Footer />
        
    </div>
  )
}

export default Main