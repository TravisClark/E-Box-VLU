import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import Requests from "../../../../shared/api/Requests";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { uiActions } from "../../../../shared/store/ui-slice";

export const ApprovedQuestionList = (props) => {
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);

  const onRepliedHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          loadingType: LoadingList.replyQuestion,
          url: Requests.replyQuestion,
          method: "PATCH",
          body: null,
        },
        successMessage: "Trả lời thành công!",
        type: "REPLY_FORM",
      })
    );
  };
  const questions = currentItems.map((question, index) => {
    const date = new Date(question.approvedAt);
    const formatDate = date.toUTCString().replace('GMT','');
    return (
      <tr key={question._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">
          <div className="w-96 truncate">{question.question}</div>
        </td>
        <td className="py-2 px-4">{formatDate}</td>
        <td className="py-2 px-10">{question.type_name}</td>
        <td className="py-2 px-4">
          <button onClick={onRepliedHandler.bind(null, question)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-blue-600 scale-75 translate-x-1/2"
            >
              <path d="M10 11h6v7h2v-8a1 1 0 0 0-1-1h-7V6l-5 4 5 4v-3z"></path>
            </svg>
          </button>
        </td>
      </tr>
    );
  });
  return (
    <tbody>
      {loadingType === LoadingList.fetchQuestionList && (
        <tr className="translate-x-1/2 h-44 translate-y-1/2">
          <LoadingDot className="pt-20" />
        </tr>
      )}
      {questions.length === 0 && !isSpinnerLoading && (
        <div className="relative h-10">
          <div className="h-20 absolute whitespace-nowrap top-4">
            There is no questions in this list
          </div>
        </div>
      )}
      {loadingType !== LoadingList.fetchQuestionList && questions}
    </tbody>
  );
};
