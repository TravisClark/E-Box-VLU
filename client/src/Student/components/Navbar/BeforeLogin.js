import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
function BeforeLogin({ changeBgColor, openNavHandler, navbarIsOpen }) {
  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:flex space-x-6">
        <a
          className={`font-medium  transition duration-500 ${
            changeBgColor
              ? "text-black hover:font-bold hover:text-black"
              : "text-gray-400 hover:text-white"
          }`}
          href="#services"
        >
          Dịch Vụ
        </a>
        <a
          className={`font-medium  transition duration-500 ${
            changeBgColor
              ? "text-black hover:font-bold hover:text-black"
              : "text-gray-400 hover:text-white"
          }`}
          href="#footer"
        >
          Liên Lạc
        </a>
        <Link
          className={`font-medium  transition duration-500 ${
            changeBgColor
              ? "text-black hover:font-bold hover:text-black"
              : "text-gray-400 hover:text-white"
          }`}
          to={"E-boxVlu/login"}
        >
          Đăng Nhập
        </Link>
      </div>
      {/* Mobile nav */}
      <div
        className={`${
          navbarIsOpen ? classes.mobileNavOpen : classes.mobileNavClose
        } z-10 absolute left-0 top-0 text-white font-semibold flex-col space-y-6 bg-black w-full h-screen items-center justify-center`}
      >
        <a onClick={openNavHandler} href="#footer">
          Liên Lạc
        </a>
        <a onClick={openNavHandler} href="#services">
          Dịch Vụ
        </a>
        <Link onClick={openNavHandler} to={"E-boxVlu/login"}>
          Đăng Nhập
        </Link>
      </div>
    </>
  );
}

export default BeforeLogin;