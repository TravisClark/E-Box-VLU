import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

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