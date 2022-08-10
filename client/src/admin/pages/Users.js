import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingList } from "../../shared/api/LoadingList";
import Requests from "../../shared/api/Requests";
import { SearchItem } from "../../shared/components/SearchItem/SearchItem";
import { Notification } from "../../shared/components/UI/Notification";
import useHttpClient from "../../shared/hooks/http-hook";
import { uiActions } from "../../shared/store/ui-slice";
import Container from "../../student/components/UI/Container";
import { UserTable } from "../components/Table/UserTable/UserTable";

function Users() {
  const { successNotification } = useSelector((state) => state.ui);
  const { itemSearching } = useSelector((state) => state.item);
  const [users, setUsers] = useState([]);
  const [usersDisplay, setUsersDisplay] = useState([]);
  const { sendRequest } = useHttpClient();
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchUserList = async () => {
        const response = await sendRequest(
          LoadingList.fetchUsersList,
          Requests.fetchUsersList
        );
        setUsers(response);
        dispatch(uiActions.setSpinnerState({ type: "DONE" }));
      };
      fetchUserList();
    } catch (error) {}
  }, [sendRequest, successNotification.refresh, dispatch]);

  useEffect(() => {
    setUsersDisplay(
      users.filter((user) => user.username.includes(itemSearching))
    );
  }, [itemSearching, users]);

  return (
    <Container className="m-auto w-11/12 h-full py-14 px-20 space-y-6 relative">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Quản lý tài khoản</h1>
      </div>
      <div className="flex flex-col bg-white py-6 px-10 rounded-md items-center space-y-5 relative">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-semibold self-center text-gray-500">
            Danh sách tài khoản
          </h1>
          <div className="flex space-x-6 items-center">
            {/* <SearchItem/> */}
            <div className="flex border rounded-lg px-2 py-2 space-x-2 h-10 w-96">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="fill-gray-500"
              >
                <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
              </svg>
              <SearchItem
                className="outline-none text-sm w-full"
                placeholder="Search"
              />
            </div>
            {!(account.role_name === "Ban Chủ Nhiệm Khoa") && (
              <Link to="/E-boxVLU/admin/users/add">
                <button className="btn-primary text-sm">Thêm tài khoản</button>
              </Link>
            )}
          </div>
        </div>
        <div className="border w-full" />
        <UserTable users={usersDisplay} />
        {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default Users;
