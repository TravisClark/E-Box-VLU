import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import SideNav from "../AdminNav/SideNav/SideNav";
import Background from "../Background/Background";
import AdminFooter from "../AdminFooter/AdminFooter";

export const AdminLayout = (props) => {
  return (
    <div className="flex flex-col min-w-full h-screen">
      <AdminNav />
      <div className="flex w-full h-full">
        <SideNav />
        <Background>{props.children}</Background>
      </div>
      <AdminFooter />
    </div>
  );
};
