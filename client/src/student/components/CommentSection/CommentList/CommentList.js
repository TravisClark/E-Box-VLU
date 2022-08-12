import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { Comment } from "../Comment/Comment";
import { io } from "socket.io-client";
import { LoadingList } from "../../../../shared/api/LoadingList";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { uiActions } from "../../../../shared/store/ui-slice";

export const CommentList = ({ id_question }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [inputComment, setInputComment] = useState("");
  const { sendRequest } = useHttpClient();
  const socket = useRef();
  const { account } = useSelector((state) => state.auth);
  const { loadingType } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        LoadingList.fetchComments,
        `${Requests.fetchComments}${id_question}`
      );
      setComments(response);
      console.log(response)
      dispatch(uiActions.setSpinnerState({ type: "DONE" }));
    };
    request();
  }, [sendRequest, id_question, dispatch]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getComment", (data) => {
      setNewComment({
        username: data.username,
        comment: data.comment,
        createdAt: new Date()
      });
      // console.log(data)
    });
  }, []);

  useEffect(() => {
    console.log(newComment)
    newComment && setComments((prevState) => [...prevState, newComment]);
  }, [newComment]);

  useEffect(() => {
    socket.current.emit("addUser_question", {
      username: account.username,
      id_question,
    });
    socket.current.on("getUsers_question", (users) => {
      // console.log(users);
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
      LoadingList.sendComment,
      Requests.sendComment,
      "POST",
      JSON.stringify({
        comment: inputComment,
        id_question,
      })
    );
    setComments([...comments, response]);
    dispatch(uiActions.setSpinnerState({ type: "DONE" }));
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
          <div className="w-full flex justify-end space-x-4 items-center">
            {loadingType === LoadingList.sendComment && (
              <div className=" flex justify-center items-center">
                <LoadingDot className="m-auto" />
              </div>
            )}
            <button className="btn-primary">Bình luận</button>
          </div>
        </div>
      </form>
      {comments.length > 0 && (
        <div className="w-full flex flex-col space-y-5 p-4 bg-slate-200 rounded-sm">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
      )}
    </>
  );
};
