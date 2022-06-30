import React from "react";
import Container from "../../student/components/UI/Container";
import SideNav from "../components/AdminNav/SideNav/SideNav";
import Background from "../components/Background/Background";

function AddUser() {
  return (
    <>
      <Background>
        <SideNav />
        <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6">
          <h1 className="text-2xl font-semibold ">Add User</h1>
          <div className="flex flex-col bg-white py-10 rounded-md items-center space-y-10">
            <h1 className="text-2xl font-bold">Add User</h1>
            <form className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="">Username</span>
                <input type="text" className="px-4 py-2 outline-none border rounded-md border-gray-300" placeholder="Enter username"/>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="">Role</span>
                <input type="text" className="px-4 py-2 outline-none border rounded-md border-gray-300" placeholder="Select role"/>
              </div>
            </form>
          </div>
        </Container>
      </Background>
    </>
  );
}

export default AddUser;
