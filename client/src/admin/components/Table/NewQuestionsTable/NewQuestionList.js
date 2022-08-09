import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import Requests from "../../../../shared/api/Requests";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { uiActions } from "../../../../shared/store/ui-slice";

function NewQuestionList() {
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);
  
  const onApproveHandler = (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          loadingType: LoadingList.approveQuestion,
          url: Requests.approveQuestion,
          method: "PATCH",
          body: null,
        },
        successMessage: "Duyệt thành công!",
        type: "APPROVE_FORM",
      })
    );
  };

  const onOpenRejectFormHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          loadingType: LoadingList.refuseQuestion,
          url: Requests.refuseQuestion,
          method: "PATCH",
          body: null,
        },
        successMessage: "Từ chối thành công!",
        type: "REJECT_FORM",
      })
    );
  };

  const questions = currentItems.map((question, index) => {
    const date = new Date(question.createdAt);
    const formatDate = date.toUTCString().replace("GMT", "");
    return (
      <tr key={question._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">
          <div className="w-40 xl:w-96 break-words">{question.question}</div>
        </td>
        <td className="py-2 px-4">{formatDate}</td>
        <td className="py-2 px-10">{question.type_name}</td>
        <td className="py-2 px-4">
          <button onClick={onApproveHandler.bind(null, question, 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-blue-500 scale-75 translate-x-1/2"
            >
              <path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path>
            </svg>
          </button>
        </td>
        <td className="py-2 px-4 ">
          <button onClick={() => onOpenRejectFormHandler(question)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-orange-600 scale-75 translate-x-1/2"
            >
              <path d="M8.586 18 12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586zM5 4h14v12h-4.414L12 18.586 9.414 16H5V4z"></path>
              <path d="M9.707 13.707 12 11.414l2.293 2.293 1.414-1.414L13.414 10l2.293-2.293-1.414-1.414L12 8.586 9.707 6.293 8.293 7.707 10.586 10l-2.293 2.293z"></path>
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
        <tr className="relative h-10">
          <td className="h-20 absolute whitespace-nowrap top-4">
            There is no questions in this list
          </td>
        </tr>
      )}
      {loadingType !== LoadingList.fetchQuestionList && questions}
    </tbody>
  );
}

export default NewQuestionList;
