import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApproveForm } from "../../../admin/components/Table/Form/ApproveForm";
import { ReplyForm } from "../../../admin/components/Table/Form/ReplyForm";
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
  const dataFromField = useRef();

  const onCloseNotificationHandler = () => {
    dispatch(uiActions.closeNotification());
  };

  const onSubmitHandler = async (input) => {
    await sendRequest(
      request.url,
      request.method,
      request.body ? request.body : input,
      request.headers
    );
    dispatch(uiActions.closeNotification());
    dispatch(uiActions.showSuccessNotification(successMessage));
    setTimeout(() => {
      dispatch(uiActions.closeSuccessNotification());
    }, 3000);
    // console.log(notification.data)
  };

  let form;
  if (type === "Reply form") {
    form = (
      <ReplyForm
        data={data}
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
      />
    );
  } else if (type === "Approve form") {
    form = (
      <ApproveForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
        message={message}
      />
    );
  }

  return (
    <div className={` w-full h-full absolute flex items-center z-50`}>
      <div className="absolute bg-black opacity-60 w-full h-full top-0 left-0 z-0"></div>
      {form}
    </div>
  );
};
