import React, { useState } from "react";
import Container from "../../../../student/components/UI/Container";
import classes from "./SideNav.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { useSelector } from "react-redux";
function SideNav() {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const {account} = useSelector((state) => state.auth);

  let hamBtnClass = `${classes.hamburger}`;
  if (navbarIsOpen) {
    hamBtnClass = `${classes.open} ${classes.hamburger}`;
  }
  const openNavHandler = () => {
    setNavbarIsOpen((prevState) => !prevState);
  };
  // console.log(navbarIsOpen)
  return (
    <nav>
      <Container
        className={`flex flex-col relative w-fit px-4 items-center bg-white z-20 transition duration-1000 ${
          navbarIsOpen && "w-64"
        }`}
        style={{minHeight:'884px'}}
      >
        {/* Mobile hamburger */}
        <div
          className={`flex items-center p-4 border-gray-300 flex-wrap-reverse ${
            navbarIsOpen && "flex-row-reverse"
          }`}
        >
          <button className={`${hamBtnClass} my-auto`} onClick={openNavHandler}>
            <span className={`${classes["hamburger-top"]} bg-black `}></span>
            <span className={`${classes["hamburger-middle"]} bg-black`}></span>
            <span className={`${classes["hamburger-bottom"]} bg-black`}></span>
          </button>
          {navbarIsOpen && (
            <div className="flex">
              <div
                className="bg-cover bg-no-repeat bg-left-top w-9 h-10"
                style={{ backgroundImage: `url(${logo})` }}
              ></div>
              <h1
                className={`font-semibold mr-4 text-xl self-center text-black
              }`}
              >
                E-Box VLU
              </h1>
            </div>
          )}
        </div>
        <div className="w-4/5 border"></div>
        {account.role_name !== 'Trợ Lý' &&<NavLink
          to="/E-boxVLU/admin/dashboard"
          className={`flex space-x-4 py-2 rounded-lg mt-4 w-full cursor-pointer justify-center group transition duration-700 ${
            navbarIsOpen && "px-8 hover:translate-x-2"
          }`}
          activeClassName="bg-slate-200 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={`fill-gray-400 transition duration-700 group-hover:fill-black`}
          >
            <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
          </svg>
          {navbarIsOpen && (
            <h1 className="font-medium text-gray-400 w-2/3 transition duration-700 group-hover:text-black">
              Thống kê
            </h1>
          )}
        </NavLink>}
        <NavLink
          to="/E-boxVLU/admin/questions"
          className={`flex space-x-4 py-2 rounded-lg mt-4 w-full justify-around cursor-pointer group transition duration-700 ${
            navbarIsOpen && "px-8 hover:translate-x-2"
          }`}
          activeClassName="bg-slate-200 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={`fill-gray-400 transition duration-700 group-hover:fill-black`}
          >
            <path d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z"></path>
          </svg>
          {navbarIsOpen && (
            <h1 className="font-medium text-gray-400 w-2/3 transition duration-700 group-hover:text-black">
              Câu hỏi
            </h1>
          )}
        </NavLink>
        {account.role_name === 'Quản Trị Viên' && <NavLink
          to="/E-boxVLU/admin/users"
          className={`flex space-x-4 py-2 rounded-lg mt-4 w-full justify-around cursor-pointer group transition duration-700 ${
            navbarIsOpen && "px-8 hover:translate-x-2"
          }`}
          activeClassName="bg-slate-200 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={`fill-gray-400 transition duration-700 group-hover:fill-black`}
          >
            <path d="M12 10c1.151 0 2-.848 2-2s-.849-2-2-2c-1.15 0-2 .848-2 2s.85 2 2 2zm0 1c-2.209 0-4 1.612-4 3.6v.386h8V14.6c0-1.988-1.791-3.6-4-3.6z"></path>
            <path d="M19 2H5c-1.103 0-2 .897-2 2v13c0 1.103.897 2 2 2h4l3 3 3-3h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-5 15-2 2-2-2H5V4h14l.002 13H14z"></path>
          </svg>
          {navbarIsOpen && (
            <h1 className="font-medium text-gray-400 w-2/3 transition duration-700 group-hover:text-black">
              Tài khoản
            </h1>
          )}
        </NavLink>}
        {account.role_name !== 'Ban Chủ Nhiệm Khoa' && <NavLink
          to="/E-boxVLU/admin/chat"
          className={`flex space-x-4 py-2 rounded-lg mt-4 w-full justify-around cursor-pointer group transition duration-700 ${
            navbarIsOpen && "px-8 hover:translate-x-2"
          }`}
          activeClassName="bg-slate-200 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={`fill-gray-400 transition duration-700 group-hover:fill-black`}
          >
            <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
            <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
          </svg>
          {navbarIsOpen && (
            <h1 className="font-medium text-gray-400 w-2/3 transition duration-700 group-hover:text-black">
              Chat
            </h1>
          )}
        </NavLink>}
      </Container>
    </nav>
  );
}

export default SideNav;
