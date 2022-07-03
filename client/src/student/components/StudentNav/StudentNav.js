import React, { useState } from "react";

import classes from "./NavStyles.module.css";
import Container from "../UI/Container";
import { useSelector } from "react-redux";
import BeforeLogin from "./BeforeLogin";
import AfterLoggedIn from "./AfterLoggedIn";

function Navbar() {
  const [changeBgColor, setChangeBgColor] = useState();
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.auth);

  const changeNavbarColor = () => {
    if (window.scrollY > 50) {
      setChangeBgColor('bg-white');
    } else {
      setChangeBgColor();
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  let hamBtnClass = `${classes.hamburger} block z-20 md:hidden`;
  if (navbarIsOpen) {
    hamBtnClass = `${classes.open} ${classes.hamburger} block z-20 `;
  }
  const openNavHandler = () => {
    setNavbarIsOpen((prevState) => !prevState);
  };


  return (
    <nav>
      <Container
        className={`fixed flex z-20 justify-between px-20  min-w-full p-4 items-center transition duration-500 ${
          changeBgColor && "bg-white"
        } md:justify-around md:px-0`}
      >
        <div className="flex space-x-4 items-center z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={`transition duration-300 ${changeBgColor ? 'fill-black' : 'fill-white'}`}
          >
            <path
              d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"
            ></path>
          </svg>
          <h1
            className={`font-bold text-2xl transition duration-500 ${
              changeBgColor ? "text-black" : "text-white"
            }`}
          >
            E-Box VLU
          </h1>
        </div>
        {!isLoggedIn ? (
          <BeforeLogin
            navbarIsOpen={navbarIsOpen}
            openNavHandler={openNavHandler}
            changeBgColor={changeBgColor}
          />
        ) : (
          <AfterLoggedIn
            openNavHandler={openNavHandler}
            changeBgColor={changeBgColor}
            navbarIsOpen={navbarIsOpen}
            username={account.username}
          />
        )}

        {/* Mobile hamburger */}
        <button className={hamBtnClass} onClick={openNavHandler}>
          <span
            className={`${classes["hamburger-top"]} ${
              changeBgColor ? "bg-black" : "bg-white"
            } ${navbarIsOpen && "bg-white"}`}
          ></span>
          <span
            className={`${classes["hamburger-middle"]} ${
              changeBgColor ? "bg-black" : "bg-white"
            } ${navbarIsOpen && "bg-white"}`}
          ></span>
          <span
            className={`${classes["hamburger-bottom"]} ${
              changeBgColor ? "bg-black" : "bg-white"
            } ${navbarIsOpen && "bg-white"}`}
          ></span>
        </button>
      </Container>
    </nav>
  );
}

export default Navbar;
