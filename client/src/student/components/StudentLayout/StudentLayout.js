import React from "react";
import { useSelector } from "react-redux";
import { ConfirmNotification } from "../../../shared/components/UI/ConfirmNotification";
import { ChatBox } from "../ChatSection/ChatBox";
import StudentFooter from '../Footer/Footer'
import StudentNavbar from '../StudentNav/StudentNav'
export const StudentLayout = (props) => {
  const { isShowing } = useSelector((state) => state.ui.notification);
  const {isLoggedIn} = useSelector((state) => state.auth)
  
  return (
    <div className="flex flex-col relative">
      <StudentNavbar />
      {props.children}
      {isLoggedIn && <ChatBox/>}
      <StudentFooter />
      {isShowing && <ConfirmNotification />}
    </div>
  );
};
