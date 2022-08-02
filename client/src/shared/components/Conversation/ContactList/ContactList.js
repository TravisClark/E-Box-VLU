import React, { useEffect, useState } from "react";
import Requests from "../../../api/Requests";
import useHttpClient from "../../../hooks/http-hook";

export const ContactList = ({ onSelectUser, selectedUser }) => {
  const { sendRequest } = useHttpClient();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(Requests.fetchUsersContact);
      setUsers(response);
      onSelectUser(response[0]);
    };
    request();
  }, [sendRequest, onSelectUser]);

  const userList = users.map((user) => (
    <li
      className={`p-4 rounded-md  flex cursor-pointer transition group ${
        selectedUser.members[1] === user.members[1]
          ? "bg-blue-600 text-white "
          : "text-black hover:bg-slate-100 hover:text-black"
      }`}
      key={user._id}
      onClick={onSelectUser.bind(null, user)}
    >
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
      {user.members[1]}
    </li>
  ));
  
  return (
    <div className="shrink h-full w-1/3 bg-white rounded-md">
      <ul
        className="flex flex-col space-y-2 p-4"
        style={{ maxHeight: "555px", minHeight: "555px" }}
      >
        {userList}
      </ul>
    </div>
  );
};
