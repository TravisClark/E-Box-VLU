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
        successMessage: "Chỉnh sửa câu trả lời thành công!",
        type: "MODIFY_ANSWER_FORM",
      })
    );
  };

  const questions = currentItems.map((question, index) => {
    const date = new Date(question.responsedAt);
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
        <td className="py-2 px-4">{question.username_respondent}</td>
        <td className="py-2 px-4 underline flex justify-center">
          <button onClick={onOpenFormHandler.bind(null, question)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-blue-400 scale-75"
            >
              <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
              <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
            </svg>
          </button>
        </td>
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
