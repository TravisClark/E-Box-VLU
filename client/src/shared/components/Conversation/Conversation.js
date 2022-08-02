import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { MessageReceiver } from "./MessageReceiver/MessageReceiver";
import { MessageSender } from "./MessageSender/MessageSender";

export const Conversation = ({ selectedUser }) => {
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        `${Requests.fetchConversation}${selectedUser.id_conversation}`
      );
      setConversations(response);
    };
    request();
  }, [selectedUser, sendRequest]);

  const { account } = useSelector((state) => state.auth);
  return (
    <div className="h-fit w-full bg-white rounded-md flex flex-col">
      <div
        className="p-4 flex space-x-2"
        style={{ borderBottom: "1px solid #dfe6e9" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
        </svg>
        <span className="font-semibold">
          {selectedUser.members && selectedUser.members[1]}
        </span>
      </div>
      <div
        className="flex flex-col space-y-2 min-w-full overflow-hidden hover:overflow-auto"
        style={{ maxHeight: "428px", minHeight: "428px" }}
      >
        {conversations.map(function (conversation) {
          if (conversation.username_sender === account.username) {
            return <MessageSender key={conversation._id} chat={conversation} />;
          } else {
            return (
              <MessageReceiver key={conversation._id} chat={conversation} />
            );
          }
        })}
      </div>
      <div
        className="flex justify-self-end justify-between px-4 space-x-4 items-end py-4"
        style={{ border: "1px solid #f1f2f6", borderRight: "2px" }}
      >
        <input
          className="border px-2 py-2 rounded-md w-full outline-none text-sm"
          placeholder="Input Message"
        />
        <button className="rounded-md text-white px-3 py-2 font-medium h-fit text-sm bg-lightBlue w-fit">
          Submit
        </button>
      </div>
    </div>
  );
};
