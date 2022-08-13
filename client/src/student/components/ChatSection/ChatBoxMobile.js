import React, { useCallback, useState } from "react";
import { ContactList } from "../../../shared/components/Conversation/ContactList/ContactList";
import { Conversation } from "../../../shared/components/Conversation/Conversation";
import { ChatButton } from "./ChatButton";
export const ChatBoxMobile = () => {
  const [isOpenChatBox, setIsOpenChatBox] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpenConversation, setIsOpenConversation] = useState(true);

  const onSelectUser = useCallback((selected) => {
    setSelectedUser(selected);
    toggleConversation()
  }, []);

  const toggleChatBox = () => {
    setIsOpenChatBox((prevState) => !prevState);
  };
  const toggleConversation = () => {
    setIsOpenConversation((prevState) => !prevState);
  };
  
  console.log(isOpenConversation)
  return (
    <>
      {!isOpenChatBox && <ChatButton onClick={toggleChatBox} />}
      {isOpenChatBox && (
        <div
          className={`fixed bg-white w-screen min-h-screen py-4 right-0 bottom-4 z-40 `}
        >
          <ContactList
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
            minWidth={"270px"}
            className="h-screen bg-white absolute z-40 w-screen p-10 flex flex-col space-y-2"
          />
          {isOpenConversation && (
            <div className="relative w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="absolute top-4 left-4 z-50"
                onClick={toggleConversation}
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
              <Conversation
                onSelectUser={onSelectUser}
                selectedUser={selectedUser}
                minHeight="250px"
                maxHeight="280px"
                minWidth="300px"
                className="h-screen bg-white absolute z-40 w-screen pt-10  flex flex-col"
              />
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="absolute top-6 cursor-pointer z-40 right-2"
            onClick={toggleChatBox}
          >
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
        </div>
      )}
    </>
  );
};
