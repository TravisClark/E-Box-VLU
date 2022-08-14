import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { MessageReceiver } from "./MessageReceiver/MessageReceiver";
import { MessageSender } from "./MessageSender/MessageSender";
import { io } from "socket.io-client";
import { LoadingDot } from "../LoadingDot/LoadingDot";
import { LoadingList } from "../../api/LoadingList";
import { uiActions } from "../../store/ui-slice";

const URL = "https://e-box-vlu.herokuapp.com";
const defaultStyles = `w-full bg-white rounded-md flex flex-col`;

export const Conversation = ({
  selectedUser,
  minHeight,
  maxHeight,
  minWidth,
  className,
}) => {
  const { account } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);
  const socket = useRef();
  const scrollRef = useRef();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        LoadingList.fetchConversation,
        `${Requests.fetchConversation}${selectedUser.id_conversation}`
      );
      dispatch(uiActions.setSpinnerState({ type: "DONE" }));
      setConversations(response);
      setReceiver(
        selectedUser.members
          .filter((member) => member !== account.username)
          .toString()
      );
    };
    request();
  }, [selectedUser, sendRequest, account.username, dispatch]);

  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        username_sender: data.username_sender,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setConversations((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", {
      username: account.username,
      id_conversation: selectedUser.id_conversation,
    });
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [account.username, selectedUser]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const message = {
      username_sender: account.username,
      message: newMessage,
      id_conversation: selectedUser.id_conversation,
    };
    const socketItem = {
      username_sender: account.username,
      username_receiver: receiver,
      message: newMessage,
    };
    socket.current.emit("sendMessage", socketItem);
    try {
      const res = await sendRequest(
        "",
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
    <div className={className ? className : defaultStyles} style={{ minWidth }}>
      <>
        <div
          className="p-4 flex space-x-2"
          style={{ borderBottom: "1px solid #dfe6e9", minHeight: '50px', maxHeight: '100px' }}
          
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
          </svg>
          <span className="font-semibold">{receiver}</span>
        </div>

        {loadingType === LoadingList.fetchConversation && (
          <div className="h-56 flex justify-center items-center">
            <LoadingDot className="m-auto" />
          </div>
        )}
        {loadingType !== LoadingList.fetchConversation &&
          conversations.length > 0 && (
            <>
              <div
                className="flex flex-col space-y-2 w-32 min-w-full h-full overflow-hidden hover:overflow-auto"
                style={{minHeight }}
              >
                {conversations.map(function (conversation) {
                  if (conversation.username_sender === account.username) {
                    return (
                      <div ref={scrollRef} key={conversation._id}>
                        <MessageSender chat={conversation} />
                      </div>
                    );
                  } else {
                    return (
                      <div ref={scrollRef} key={conversation._id}>
                        <MessageReceiver chat={conversation} />
                      </div>
                    );
                  }
                })}
              </div>
              <form onSubmit={onSubmitHandler}>
                <div
                  className="flex justify-self-end justify-between px-4 space-x-4 items-end py-4"
                  style={{ border: "1px solid #f1f2f6", borderRight: "2px", height: "74px"}}
                >
                  <input
                    className="border px-2 py-2 rounded-md w-full outline-none text-sm"
                    placeholder="Input Message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button className="btn-primary">Gửi</button>
                </div>
              </form>
            </>
          )}
      </>

      {!isSpinnerLoading && conversations.length === 0 && (
        <div
          style={{ minHeight }}
          className="flex items-center justify-center font-bold p-4 text-center"
        >
          Không có cuộc hội thoại nào tồn tại!
        </div>
      )}
    </div>
  );
};
