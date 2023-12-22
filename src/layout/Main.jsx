import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"

function Main() {
  return (
    <div className='bg-white'>
        <Navbar />
        <Outlet />
        <footer>Footer here</footer>
    </div>
  )
}

export default Main