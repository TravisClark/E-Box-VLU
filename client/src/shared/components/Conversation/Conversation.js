import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { MessageReceiver } from "./MessageReceiver/MessageReceiver";
import { MessageSender } from "./MessageSender/MessageSender";
import { io } from "socket.io-client";

export const Conversation = ({ selectedUser, minHeight }) => {
  const { account } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
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

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        username_sender: data.username_sender,
        message: data.message,
        createdAt: Date.now()
      });
      console.log(data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setConversations((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", account.username);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [account.username]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const message = {
      username_sender: account.username,
      message: newMessage,
      id_conversation: selectedUser.id_conversation,
    };
    const socketItem = {
      username_sender: account.username,
      username_receiver: selectedUser.members[1],
      message: newMessage,
    };
    socket.current.emit("sendMessage", socketItem);

    try {
      const res = await sendRequest(
        Requests.sendMessage,
        "POST",
        JSON.stringify(message)
      );
      setConversations([...conversations, res]);
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <div className=" w-full bg-white rounded-md flex flex-col" style={{maxHeight: '500px', minHeight: '400px'}}>
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
        className="flex flex-col space-y-2 w-96 min-w-full h-3/4 overflow-hidden hover:overflow-auto"
        // style={{ maxHeight: "428px", minHeight: minHeight }}
      >
        {conversations.map(function (conversation) {
          if (conversation.username_sender === account.username) {
            return (
              <div ref={scrollRef}>
                <MessageSender key={conversation._id} chat={conversation} />
              </div>
            );
          } else {
            return (
              <div ref={scrollRef}>
                <MessageReceiver key={conversation._id} chat={conversation} />
              </div>
            );
          }
        })}
      </div>
      <form onSubmit={onSubmitHandler}>
        <div
          className="flex justify-self-end justify-between px-4 space-x-4 items-end py-4"
          style={{ border: "1px solid #f1f2f6", borderRight: "2px" }}
        >
          <input
            className="border px-2 py-2 rounded-md w-full outline-none text-sm"
            placeholder="Input Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="rounded-md text-white px-3 py-2 font-medium h-fit text-sm bg-lightBlue w-fit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
