import React from 'react'
import Navbar from '../../Student/Navbar/Navbar'

function Header(props) {
  return (
    <Navbar>{props.children}</Navbar>
  )
}

export default Header