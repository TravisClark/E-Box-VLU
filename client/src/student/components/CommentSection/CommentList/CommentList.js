import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { Comment } from "../Comment/Comment";
import { io } from "socket.io-client";

export const CommentList = ({ id_question }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')
  const [inputComment, setInputComment] = useState("");
  const { sendRequest } = useHttpClient();
  const socket = useRef();
  const { account } = useSelector((state) => state.auth);

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        `${Requests.fetchComments}${id_question}`
      );
      setComments(response);
    };
    request();
  }, [sendRequest, id_question]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getComment", (data) => {
      setNewComment({
        username: data.username,
        comment: data.comment
      });
      console.log(data)
    });
  }, []);

  useEffect(() => {
    newComment &&
      setComments((prevState) => [...prevState, newComment]);
  }, [newComment]);

  useEffect(() => {
    socket.current.emit("addUser_question", {
      username: account.username,
      id_question,
    });
    socket.current.on("getUsers_question", (users) => {
      console.log(users);
    });
  }, [account.username, id_question]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const socketItem = {
      username: account.username,
      id_question,
      comment: inputComment,
    };
    socket.current.emit("sendComment", socketItem);
    
    const response = await sendRequest(
      Requests.sendComment,
      "POST",
      JSON.stringify({
        comment: inputComment,
        id_question,
      })
    );
    setComments([...comments, response])
    setInputComment("");
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col items-end space-y-4">
          <textarea
            className="border p-4 rounded-md h-24 w-full outline-gray-300"
            placeholder="Nhập bình luận..."
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
          />
          <button className="btn-primary">Bình luận</button>
        </div>
      </form>
      {comments.length > 0 && (
        <div className="w-full flex flex-col space-y-5 p-4 bg-slate-100 rounded-sm">
          {comments.map((comment) => <Comment comment={comment} />)}
        </div>
      )}
    </>
  );
};
