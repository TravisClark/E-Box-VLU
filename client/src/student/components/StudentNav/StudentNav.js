import React, { useState } from "react";

import classes from "./NavStyles.module.css";
import Container from "../UI/Container";
import { useSelector } from "react-redux";
import BeforeLogin from "./BeforeLogin";
import AfterLoggedIn from "./AfterLoggedIn";
import logo from "../../../assets/education.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [changeBgColor, setChangeBgColor] = useState();
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.auth);
  const [profileBoxStyle, setProfileBoxStyle] = useState()

  const changeNavbarColor = () => {
    if (window.scrollY > 50) {
      setChangeBgColor("bg-white");
      setProfileBoxStyle('translate-y-6')
    } else {
      setChangeBgColor();
      setProfileBoxStyle()
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  let hamBtnClass = `${classes.hamburger} block z-20 ${!navbarIsOpen && 'md:hidden'}`;
  if (navbarIsOpen) {
    hamBtnClass = `${classes.open} ${classes.hamburger} block z-20 `;
  }
  const openNavHandler = () => {
    setNavbarIsOpen((prevState) => !prevState);
  };

  return (
    <nav  >
      <Container
        className={`fixed flex z-30 w-screen justify-around p-4 items-center transition duration-500 drop-shadow-md sm:px-20 ${
          changeBgColor && "bg-white"
        }  md:px-0 sm:min-w-full`}
      >
        <div className="flex space-x-4 items-center z-50">
          <img src={logo} alt=''/>
          <Link
            className={`font-bold text-2xl transition duration-500 whitespace-nowrap ${
              changeBgColor && !navbarIsOpen ? "text-black" : "text-white"
            }`}
            to={"/E-boxVLU"}
          >
            E-Box VLU
          </Link>
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
            profileBoxStyle={profileBoxStyle}
          />
        )}

        {/* Mobile hamburger */}
        <button className={hamBtnClass} onClick={openNavHandler}>
          <span
            className={`${classes["hamburger-top"]} ${
              changeBgColor && !navbarIsOpen ? "bg-black" : "bg-white"
            } ${navbarIsOpen && "bg-white"}`}
          ></span>
          <span
            className={`${classes["hamburger-middle"]} ${
              changeBgColor && !navbarIsOpen ? "bg-black" : "bg-white"
            } ${navbarIsOpen && "bg-white"}`}
          ></span>
          <span
            className={`${classes["hamburger-bottom"]} ${
              changeBgColor && !navbarIsOpen ? "bg-black" : "bg-white"
            } ${navbarIsOpen && "bg-white"}`}
          ></span>
        </button>
      </Container>
    </nav>
  );
}

export default Navbar;
