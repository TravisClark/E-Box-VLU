import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { uiActions } from "../../../../shared/store/ui-slice";

export const DisapprovedQuestionList = (props) => {
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isLoading } = useHttpClient();
  const dispatch = useDispatch();
  const onRestoreHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          url: Requests.restoreQuestion,
          method: "PATCH",
          body: null,
          headers: { "Content-Type": "application/json" },
        },
        successMessage: "Khôi phục câu hỏi thành công!",
        type: "RESTORE_QUESTION_FORM",
      })
    );
  };
  
  const questions = currentItems.map((question, index) => {
    const date = new Date(question.createdAt);
    const formatDate = date.toUTCString().replace('GMT','');
    return (
      <tr key={question._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">
          <div className="break-words w-96">{question.question}</div>
        </td>
        <td className="py-2 px-4">{formatDate}</td>
        <td className="py-2 px-4">{question.username_approver}</td>
        <td className="py-2 px-10">{question.type_name}</td>
        <td className="py-2 px-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="cursor-pointer fill-green-500 scale-75 translate-x-1/2"
            onClick={onRestoreHandler.bind(null, question)}
          >
            <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
          </svg>
        </td>
      </tr>
    );
  });
  return (
    <tbody>
      {isLoading && (
        <tr>
          <td>Loading...</td>
        </tr>
      )}
      {questions.length > 0 ? (
        questions
      ) : (
        <tr>
          <td className="py-2 px-4">There is no question in this list</td>
        </tr>
      )}
    </tbody>
  );
};
