import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../api/LoadingList";
import Requests from "../../../api/Requests";
import useHttpClient from "../../../hooks/http-hook";
import { Roles } from "../../../roles/roles";
import { uiActions } from "../../../store/ui-slice";
import { SearchItem } from "../../SearchItem/SearchItem";

export const ContactList = ({ onSelectUser, selectedUser, maxHeight, minWidth, className, toggleConversation }) => {
  const { sendRequest } = useHttpClient();
  const { account } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [usersDisplay, setUsersDisplay] = useState([]);
  const { itemSearching } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const defaultStyles = `h-auto min-w-1/3 bg-white rounded-md border flex flex-col space-y-4 p-6 items-center w-96`

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        LoadingList.fetchUsersContact,
        Requests.fetchUsersContact
      );
      dispatch(uiActions.setSpinnerState({ type: "DONE" }));
      if (response[0].members[1] === account.username) {
        for (let index = 0; index < response.length; index++) {
          let temp = response[index].members[0];
          response[index].members.shift();
          response[index].members.push(temp);
        }
      }
      setUsers(response);
      onSelectUser(response[0]);
    };
    request();
  }, [sendRequest, onSelectUser, account.username, dispatch]);

  useEffect(() => {
    const searchUser = users.filter((user) =>
      user.members[1].toLowerCase().includes(itemSearching.toLowerCase())
    );
    setUsersDisplay(
      account.role_name === Roles.admin || account.role_name === Roles.assistant
        ? searchUser
        : users
    );
  }, [users, itemSearching, account.role_name]);

  const userList = usersDisplay.map((user) => (
    <li
      className={`py-2 px-4 rounded-md w-full flex cursor-pointer transition group break-words space-x-2 ${
        selectedUser.members[1] === user.members[1]
          ? "bg-blue-600 text-white "
          : "text-black hover:bg-slate-100 hover:text-black"
      }`}
      key={user._id}
      onClick={onSelectUser.bind(null, user)}
    >
      <div className="w-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className={`mr-2 ${
            selectedUser.members[1] === user.members[1]
              ? "fill-white"
              : "group-hover:fill-black"
          }`}
        >
          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
        </svg>
      </div>
      <span className="">{user.members[1]}</span>
    </li>
  ));

  return (
    <>
      {users.length !== 0 && (
        <div className={className ? className : defaultStyles} style={{minWidth}}>
          <div className="flex flex-col space-y-2 bg-gray-200 rounded-md justify-center items-center p-6 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className={``}
            >
              <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
            </svg>
            <span className="font-semibold">{account.username}</span>
          </div>
          {account.role_name !== Roles.student && (
            <div className="flex border rounded-lg px-4 py-2 space-x-2 h-10 w-full">
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
                placeholder="Tìm kiếm"
              />
            </div>
          )}
          <ul
            className="flex flex-col space-y-2 min-w-full h-full overflow-hidden hover:overflow-auto"
            style={{ maxHeight }}
          >
            {userList}
          </ul>
        </div>
      )}
    </>
  );
};
