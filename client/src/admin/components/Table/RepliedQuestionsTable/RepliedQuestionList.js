import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import Requests from "../../../../shared/api/Requests";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { uiActions } from "../../../../shared/store/ui-slice";

export const RepliedQuestionList = () => {
  const { currentItems } = useSelector((state) => state.page.pagination);
  const {isSpinnerLoading, loadingType} = useSelector((state) => state.ui)
  const dispatch = useDispatch();

  const onOpenFormHandler = async (value) => {
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
        successMessage: "Chỉnh sửa câu trả lời thành công!",
        type: "MODIFY_ANSWER_FORM",
      })
    );
  };

  const questions = currentItems.map((question, index) => {
    const date = new Date(question.responsedAt);
    const formatDate = date.toUTCString().replace('GMT','');
    return (
      <tr key={question._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">
          <div className="truncate w-96">{question.question}</div>
        </td>
        <td className="py-2 px-4">{formatDate}</td>
        <td className="py-2 px-4">{question.username_respondent}</td>
        <td className="py-2 px-10">{question.type_name}</td>
        <td className="py-2 px-4 ">
          <button onClick={onOpenFormHandler.bind(null, question)} className="flex justify-center items-center">
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
