import React from 'react'
import Container from '../../UI/Container';
import houseIcon from '../../../assets/house.png'

function Navbar() {
  return (
    <nav>
      <Container className="fixed flex z-20 justify-around bg-transparent min-w-full items-center">
        <div className="flex space-x-4 items-center">
          <img alt='' src={houseIcon} className="w-6"/>
          <h1 className="font-bold text-white text-2xl">E-Box VLU</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <a className="text-gray-400 font-medium hover:text-white transition duration-400" href='#sa'>Dịch Vụ</a>
          <a className="text-gray-400 font-medium hover:text-white transition duration-400" href='#sa'>Liên Lạc</a>
          <a className="text-gray-400 font-medium hover:text-white transition duration-400" href='#sa'>Đăng Nhập</a>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar;