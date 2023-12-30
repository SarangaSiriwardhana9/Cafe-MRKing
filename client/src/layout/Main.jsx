import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footer from '../components/Footer'
import  { AuthContext } from '../contexts/AuthProvider'
import Loading from '../components/Loading'


const Main = () => {
  const {loading}= useContext(AuthContext)

  return (
    <div className='bg-white h-full'>
      {
        loading ?<Loading/>:
          <div>
            <Navbar />
            <div className='min-h-screen'>
              <Outlet />
            </div>
            <Footer />
          </div>
    
      }
    </div >
  )
}



export default Main