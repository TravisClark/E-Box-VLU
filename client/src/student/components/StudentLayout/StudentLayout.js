import React from "react";
import { useSelector } from "react-redux";
import { ConfirmNotification } from "../../../shared/components/UI/ConfirmNotification";
import StudentFooter from '../Footer/Footer'
import StudentNavbar from '../StudentNav/StudentNav'
export const StudentLayout = (props) => {
  const { isShowing } = useSelector((state) => state.ui.notification);
  return (
    <div className="flex flex-col relative">
      <StudentNavbar />
      {props.children}
      <StudentFooter />
      {isShowing &&<ConfirmNotification />}
    </div>
  );
};
