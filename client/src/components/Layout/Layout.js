import React from 'react'
import Footer from '../Student/Footer/Footer'
import Navbar from '../Student/Navbar/Navbar'

function Layout(props) {
  return (
    <>
    <Navbar/>
    {props.children}
    <Footer/>
    </>
  )
}

export default Layout