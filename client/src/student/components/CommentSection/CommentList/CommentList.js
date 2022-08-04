import React, { useEffect, useState } from "react";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { Comment } from "../Comment/Comment";

export const CommentList = ({ id_question }) => {
  const [comments, setComments] = useState([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        `${Requests.fetchComments}${id_question}`
      );
      console.log(response);
      setComments(response.map((res) => <Comment comment={res} />));
    };
    request();
  }, [sendRequest, id_question]);

  return (
    <div className="w-full flex flex-col space-y-5 p-4 bg-slate-100 rounded-sm">
      {comments}
    </div>
  );
};
