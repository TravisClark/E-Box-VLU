import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RepliedQuestionForm } from "../../../admin/components/Table/RepliedQuestionsTable/RepliedQuestionForm";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { uiActions } from "../../store/ui-slice";
export const ConfirmNotification = (props) => {
  const { request, data, message, successMessage, type } = useSelector(
    (state) => state.ui.notification
  );
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);

  const onCloseNotificationHandler = () => {
    dispatch(uiActions.closeNotification());
  };

  const onSubmitHandler = async () => {
    await sendRequest(
      request.url,
      request.method,
      request.body,
      request.headers
    );
    dispatch(uiActions.closeNotification());
    dispatch(uiActions.showSuccessNotification(successMessage));
    setTimeout(() => {
      dispatch(uiActions.closeSuccessNotification());
    }, 3000);
    // console.log(notification.data)
  };

  return (
    <div
      className={`${props.className} w-full h-full absolute flex items-center z-50`}
    >
      <div className="absolute bg-black opacity-60 w-full h-full top-0 left-0 z-0"></div>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10 ">
        <span className="text-2xl font-bold">Xác nhận duyệt</span>
        {type === "Reply form" ? (
          <RepliedQuestionForm data={data} />
        ) : (
          type === "Approve form" && <h1>{message}</h1>
        )}
        <div className="flex w-full space-x-8 justify-center">
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm"
            onClick={onSubmitHandler}
          >
            Submit
          </button>
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm"
            onClick={onCloseNotificationHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
