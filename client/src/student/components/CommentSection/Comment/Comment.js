import React, { useState } from "react";

export const Comment = ({ comment }) => {
  const [replyIsOpen, setReplyIsOpen] = useState(false);

  const toggleReply = () => {
    setReplyIsOpen((prevState) => !prevState);
  };

  const onSubmitHandler = () => {};
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex space-x-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
        </svg>
        <span className="font-medium">{comment.username}</span>
      </div>
      <div className="rounded-md bg-white p-4 h-28 break-words shadow-md">
        {comment.comment}
      </div>
      <button className="self-end font-medium" onClick={toggleReply}>
        Trả lời
      </button>
      {replyIsOpen && <form onSubmit={onSubmitHandler}>
        <div
          className="flex justify-self-end justify-between  space-x-4 items-end py-4"
          style={{ border: "1px solid #f1f2f6", borderRight: "2px" }}
        >
          <input
            className="border p-4 h-20 rounded-md w-full outline-none text-sm"
            placeholder="Input Message"
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn-primary">Gửi</button>
        </div>
      </form>}
    </div>
  );
};
