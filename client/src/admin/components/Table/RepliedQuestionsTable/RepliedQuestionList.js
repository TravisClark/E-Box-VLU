import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { uiActions } from "../../../../shared/store/ui-slice";

export const RepliedQuestionList = () => {
  // const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isLoading } = useHttpClient();
  const dispatch = useDispatch();
  
  const onOpenFormHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          url: Requests.replyQuestion,
          method: "PATCH",
          body: null,
          headers: { "Content-Type": "application/json" },
        },
        successMessage: 'Chỉnh sửa câu trả lời thành công!',
        type:'MODIFY_ANSWER_FORM'
      })
    );
  };
  
  const questions = currentItems.map((question, index) => {
    const date = new Date(question.createdAt);
    const dateTranslate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    const formatDate = `${dateTranslate.day}/${dateTranslate.month}/${dateTranslate.year}`;
    return (
      <tr key={question._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">
          <div className="truncate w-96">{question.question}</div>
        </td>
        <td className="py-2 px-4">{formatDate}</td>
        <td className="py-2 px-4">{question.username_reply}</td>
        <td className="py-2 px-4 underline"><button onClick={onOpenFormHandler.bind(null, question)}>Chỉnh sửa</button></td>
      </tr>
    );
  });
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : questions.length > 0 ? (
        questions
      ) : (
        <tr>
          <td>There is no question in this list</td>
        </tr>
      )}
    </tbody>
  );
};
