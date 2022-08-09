import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingList } from "../../../api/LoadingList";
import Requests from "../../../api/Requests";
import useHttpClient from "../../../hooks/http-hook";

export const ContactList = ({ onSelectUser, selectedUser }) => {
  const { sendRequest } = useHttpClient();
  const { account } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        LoadingList.fetchUsersContact,
        Requests.fetchUsersContact
      );
      if (response[0].members[1] === account.username) {
        for (let index = 0; index < response.length; index++) {
          let temp = response[index].members[0];
          response[index].members.shift();
          response[index].members.push(temp);
        }
      }
      setUsers(response);
      onSelectUser(response[0]);
      console.log(response);
    };
    request();
  }, [sendRequest, onSelectUser, account.username]);

  const userList = users.map((user) => (
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
      {userList.length !==0 && (
        <div className="h-auto min-w-1/3 bg-white rounded-md border ">
          <ul className="flex flex-col space-y-2 p-4 min-w-full h-full overflow-hidden hover:overflow-auto">
            {userList}
          </ul>
        </div>
      )}
    </>
  );
};
