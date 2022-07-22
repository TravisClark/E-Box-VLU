import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Requests from "../../shared/api/Requests";
import { Notification } from "../../shared/components/UI/Notification";
import useHttpClient from "../../shared/hooks/http-hook";
import Container from "../../student/components/UI/Container";
import { SearchItem } from "../components/SearchItem/SearchItem";
import { UserTable } from "../components/Table/UserTable/UserTable";

function Users() {
  const { successNotification } = useSelector((state) => state.ui);
  const { itemSearching } = useSelector((state) => state.item);
  const [users, setUsers] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    try {
      const fetchUserList = async () => {
        const response = await sendRequest(Requests.fetchUsersList);
        setUsers(
          response.filter((user) => user.username.includes(itemSearching))
        );
      };
      fetchUserList();
    } catch (error) {}
  }, [sendRequest, successNotification.refresh, itemSearching]);

  return (
    <Container className="m-auto w-11/12 h-full py-14 px-20 space-y-6 relative">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Users Management</h1>
      </div>
      <div className="flex flex-col bg-white py-6 px-10 rounded-md items-center space-y-5 relative">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-semibold self-center text-gray-500">
            User list
          </h1>
          <div className="flex space-x-6 items-center">
            <SearchItem/>
            <Link to="/E-boxVLU/admin/users/add">
              <button className="bg-lightBlue px-4 py-2 rounded-xl font-medium text-white text-sm">
                Add User
              </button>
            </Link>
          </div>
        </div>
        <div className="border w-full" />
        <UserTable users={users} />
        {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default Users;
