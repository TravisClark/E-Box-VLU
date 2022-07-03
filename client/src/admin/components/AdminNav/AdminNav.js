import React from "react";
import { useSelector } from "react-redux";
import Container from "../../../student/components/UI/Container";
import SideNav from "./SideNav/SideNav";
function AdminNav() {
  const { account } = useSelector((state) => state.auth);
  
  
  return (
    <nav>
      <Container className="fixed min-w-full flex justify-end p-8 bg-transparent z-10">
        
        <div
          className={`flex space-x-2 cursor-pointer`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
            <path
              fill="#D1D5DB"
              d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"
            ></path>
          </svg>
          <span
            className={`font-medium text-black`}
          >
            {account.username}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="#fff" d="m11.998 17 7-8h-14z"></path>
          </svg>
          
        </div>
      </Container>
    </nav>
  );
}

export default AdminNav;
