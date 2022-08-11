import React, { useCallback, useState } from "react";
import { ContactList } from "../../shared/components/Conversation/ContactList/ContactList";
import { Conversation } from "../../shared/components/Conversation/Conversation";
import Container from "../../student/components/UI/Container";

export const Chat = () => {
  const [selectedUser, setSelectedUser] = useState({});

  const onSelectUser = useCallback((selected) => {
    setSelectedUser(selected);
  }, []);

  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6">
      <h1 className="text-2xl font-semibold">Chat</h1>
      <div className="flex rounded-md space-x-10 relative" >
        <ContactList
          onSelectUser={onSelectUser}
          selectedUser={selectedUser}
          maxHeight="305px"
        />
        <Conversation
          onSelectUser={onSelectUser}
          selectedUser={selectedUser}
          maxHeight="400px"
          minHeight="400px"
        />
      </div>
    </Container>
  );
};
