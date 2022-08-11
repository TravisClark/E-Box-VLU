import React, { useCallback, useState } from "react";
import { ContactList } from "../../../shared/components/Conversation/ContactList/ContactList";
import { Conversation } from "../../../shared/components/Conversation/Conversation";
import { ChatButton } from "./ChatButton";
export const ChatBox = () => {
  const [isOpenChatBox, setIsOpenChatBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const onSelectUser = useCallback((selected) => {
    setSelectedUser(selected);
  }, []);

  const toggleChatBox = () => {
    setIsOpenChatBox((prevState) => !prevState);
  };
  return (
    <>
      {!isOpenChatBox && <ChatButton onClick={toggleChatBox} />}
      {isOpenChatBox && (
        <div className="fixed bg-white max-h-96 right-4 bottom-4 z-40 rounded-md shadow-md flex">
          <ContactList
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
            minWidth={'270px'}
          />
          <Conversation
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
            minHeight='250px'
            maxHeight='280px'
            minWidth='300px'
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="absolute top-2 cursor-pointer right-2"
            onClick={toggleChatBox}
          >
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
        </div>
      )}
    </>
  );
};
