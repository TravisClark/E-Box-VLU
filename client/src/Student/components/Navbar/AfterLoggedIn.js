import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";
import classes from "./Navbar.module.css";
function AfterLoggedIn({
  changeBgColor,
  openNavHandler,
  navbarIsOpen,
  username,
}) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
  };
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
          Câu Hỏi
        </a>
        <span
          className={`font-medium  transition duration-500 ${
            changeBgColor
              ? "text-black hover:font-bold hover:text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {username}
        </span>
        <span
          className={`font-medium  transition duration-500 ${
            changeBgColor
              ? "text-black hover:font-bold hover:text-black"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={logoutHandler}
        >
          Đăng Xuất
        </span>
      </div>
      {/* Mobile nav */}
      <div
        className={`${
          navbarIsOpen ? classes.mobileNavOpen : classes.mobileNavClose
        } z-10 absolute left-0 top-0 text-white font-semibold flex-col space-y-6 bg-black w-full h-screen items-center justify-center`}
      >
        <span onClick={openNavHandler} to={"E-boxVlu/login"}>
          {username}
        </span>
        <a onClick={openNavHandler} href="#footer">
          Câu Hỏi
        </a>
        <button onClick={logoutHandler}>Đăng Xuất</button>
      </div>
    </>
  );
}

export default AfterLoggedIn;
