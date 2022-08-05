import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { Comment } from "../Comment/Comment";
import { io } from "socket.io-client";

export const CommentList = ({ id_question }) => {
  const [comments, setComments] = useState([]);
  const { sendRequest } = useHttpClient();
  const socket = useRef();
  const { account } = useSelector((state) => state.auth);

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        `${Requests.fetchComments}${id_question}`
      );
      setComments(response.map((res) => <Comment comment={res} />));
    };
    request();
  }, [sendRequest, id_question]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser_question", {
      username: account.username,
      id_question,
    });
    socket.current.on("getUsers_question", (users) => {
      console.log(users);
    });
  }, [account.username, id_question]);

  return (
    <>
      {comments.length > 0 && <div className="w-full flex flex-col space-y-5 p-4 bg-slate-100 rounded-sm">
        {comments}
      </div>}
    </>
  );
};
