import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";
import { uiActions } from "../../../shared/store/ui-slice";
import classes from "./NavStyles.module.css";
function AfterLoggedIn({
  changeBgColor,
  openNavHandler,
  navbarIsOpen,
  username,
}) {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {account} = useSelector((state) => state.auth);
  const history = useHistory();
  const logoutHandler = () => {
    navbarIsOpen && openNavHandler();
    dispatch(authActions.logoutHandler());
    history.replace('/E-boxVLU')
  };

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const runAdminModeHandler = () => {
    dispatch(uiActions.runAdminMode())
    history.push('/E-boxVLU/admin/dashboard')
  }
  
  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:flex md:flex-col md:items-center md:w-52">
        <div
          className={`flex space-x-2 cursor-pointer`}
          onClick={toggleMenuHandler}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className={`transition duration-300 ${changeBgColor ? 'fill-black' : 'fill-white'}`}>
            <path
              
              d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"
            ></path>
          </svg>
          <span
            className={`font-medium  transition duration-500 ${
              changeBgColor
                ? "text-black hover:font-bold hover:text-black"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {username}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`transition duration-300 ${changeBgColor ? 'fill-black' : 'fill-white'}`}>
            <path  d="m11.998 17 7-8h-14z"></path>
          </svg>
        </div>
        <div
          className={`flex-col space-y-6 bg-transparent items-center p-4 absolute mt-8 rounded-sm w-52 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          {account.role_name === 'Quản Trị Viên' && <button
            className={`font-medium  transition duration-500 text-gray-300 hover:font-bold hover:text-white `}
            onClick={runAdminModeHandler}
          >
            Chế độ admin
          </button>}
          <Link
            className={`font-medium  transition duration-500 text-gray-300 hover:font-bold hover:text-white `}
            to='/E-boxVLU/change-password'
          >
            Đổi mật khẩu
          </Link>
          <button
            className={`font-medium  transition duration-500 cursor-pointer text-gray-300 hover:font-bold hover:text-white `}
            onClick={logoutHandler}
          >
            Đăng Xuất
          </button>
        </div>
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
        <Link
          to="/E-boxVLU/change-password"
          onClick={openNavHandler}
          href="#footer"
        >
          Đổi mật khẩu
        </Link>
        <button onClick={logoutHandler}>Đăng Xuất</button>
      </div>
    </>
  );
}

export default AfterLoggedIn;
