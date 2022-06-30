import React from "react";
import SideNav from "../components/AdminNav/SideNav/SideNav";
import Background from "../components/Background/Background";
import AdminFooter from "../components/AdminFooter/AdminFooter"
function Home() {
  return (
    <>
      <Background>
        <SideNav />
        <AdminFooter/>
      </Background>
    </>
  );
}

export default Home;
