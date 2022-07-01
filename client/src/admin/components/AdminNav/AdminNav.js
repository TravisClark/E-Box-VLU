import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";
import { uiActions } from "../../../shared/store/ui-slice";
import Container from "../../../student/components/UI/Container";
import SideNav from "./SideNav/SideNav";
function AdminNav() {
  const { account } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
    history.replace("/E-boxVLU");
  };
  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const runUserModeHandler = () => {
    dispatch(uiActions.runAdminMode());
    history.push("/E-boxVLU/Home");
  };
  return (
    <nav>
      <Container className="fixed min-w-full flex justify-end p-8 bg-transparent z-10">
        <div
          className={`flex space-x-2 cursor-pointer`}
          onClick={toggleMenuHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            className="fill-black"
          >
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
          </svg>
          <span className={`font-medium text-black`}>{account.username}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-black"
          >
            <path d="m11.998 17 7-8h-14z"></path>
          </svg>
        </div>
        <div
          className={`flex-col space-y-3 bg-white items-start py-4 absolute mt-8 rounded-xl w-52 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="flex min-w-full space-x-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="w-1/4 fill-gray-400"
            >
              <path d="M2 7v1l11 4 9-4V7L11 4z"></path>
              <path d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734 4-.126 6.586-1.972 7-3.467.024-.089.037-.178.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12l-3-1z"></path>
            </svg>
            <button
              className={`transition duration-500 text-gray-500 w-2/3 hover:font-medium hover:text-black`}
              onClick={runUserModeHandler}
            >
              Student Mode
            </button>
          </div>
          <div className="flex min-w-full space-x-2 px-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              className="w-1/4 fill-gray-400 "
            >
              <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
            </svg>
            <Link
              onClick={() => dispatch(uiActions.runAdminMode())}
              className={`transition duration-500 hover:text-black text-gray-500 w-2/3 hover:font-medium `}
              to="/E-boxVLU/change-password"
            >
              Đổi mật khẩu
            </Link>
          </div>
          <div className="flex min-w-full space-x-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="w-1/4 fill-gray-400"
            >
              <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
              <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
            </svg>
            <button
              className={`transition duration-500 cursor-pointer text-gray-500 hover:font-medium hover:text-black`}
              onClick={logoutHandler}
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default AdminNav;
