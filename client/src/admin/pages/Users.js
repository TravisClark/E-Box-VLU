import React from "react";
import { Link } from "react-router-dom";
import Container from "../../student/components/UI/Container";

function Users() {
  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Users</h1>
        <Link
          to="/E-boxVLU/admin/users/add"
          className="bg-lightBlue px-4 py-2 rounded-xl font-medium text-white"
        >
          Add User
        </Link>
      </div>
    </Container>
  );
}

export default Users;
