import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import SideNav from "../AdminNav/SideNav/SideNav";
import Background from "../Background/Background";
import AdminFooter from "../AdminFooter/AdminFooter";
import { ConfirmNotification } from "../../../shared/components/UI/ConfirmNotification";
import { useSelector } from "react-redux";

export const AdminLayout = (props) => {
  const { isShowing } = useSelector((state) => state.ui.notification);
  return (
    <div className="flex flex-col relative">
      <AdminNav />
      <div className="flex w-full h-fit">
        <SideNav />
        <Background>{props.children}</Background>
      </div>
      <AdminFooter />
      {isShowing &&<ConfirmNotification />}
    </div>
  );
};
