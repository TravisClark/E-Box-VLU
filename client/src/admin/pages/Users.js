import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Notification } from "../../shared/components/UI/Notification";
import Container from "../../student/components/UI/Container";

function Users() {
  const { successNotification } = useSelector((state) => state.ui);
  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6 relative ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Users Management</h1>
        <Link
          to="/E-boxVLU/admin/users/add"
          className="bg-lightBlue px-4 py-2 rounded-xl font-medium text-white"
        >
          Add User
        </Link>
      </div>
      <div className="flex flex-col bg-white py-6 px-10 rounded-md items-center space-y-5 relative">
      {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default Users;
