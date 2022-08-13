import React from "react";
import { useSelector } from "react-redux";
import { ConfirmNotification } from "../../../shared/components/UI/ConfirmNotification";
import { Roles } from "../../../shared/roles/roles";
import { ChatBox } from "../ChatSection/ChatBox";
import { ChatBoxMobile } from "../ChatSection/ChatBoxMobile";
import StudentFooter from "../Footer/Footer";
import StudentNavbar from "../StudentNav/StudentNav";
export const StudentLayout = (props) => {
  const { isShowing } = useSelector((state) => state.ui.notification);
  const { account} = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col relative">
      <StudentNavbar />
      {props.children}
      {account.role_name === Roles.student && (
        <div className="hidden md:block">
          <ChatBox />
        </div>
      )}
      {account.role_name === Roles.student && <div className="block md:hidden">
        <ChatBoxMobile />
      </div>}
      <StudentFooter />
      {isShowing && <ConfirmNotification />}
    </div>
  );
};
