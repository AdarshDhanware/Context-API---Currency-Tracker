import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      {/* <coinContextProvider> */}
        <Navbar />
      {/* </coinContextProvider> */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout