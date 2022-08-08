import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApproveForm } from "../../../admin/components/Table/Form/ApproveForm";
import { DeactivateForm } from "../../../admin/components/Table/Form/DeactivateForm";
import { ModifyAnswerForm } from "../../../admin/components/Table/Form/ModifyAnswerForm";
import { RejectForm } from "../../../admin/components/Table/Form/RejectForm";
import { ReplyForm } from "../../../admin/components/Table/Form/ReplyForm";
import { RestoreQuestionForm } from "../../../admin/components/Table/Form/RestoreQuestionForm";
import { UserDetailForm } from "../../../admin/components/Table/Form/UserDetailForm";
import QuestionForm from "../../../student/components/QuestionSection/QuestionForm";
import useHttpClient from "../../hooks/http-hook";
import { pageActions } from "../../store/page-slice";
import { uiActions } from "../../store/ui-slice";

export const ConfirmNotification = (props) => {
  const { request, successMessage, type } = useSelector(
    (state) => state.ui.notification
  );
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  const onCloseNotificationHandler = () => {
    dispatch(uiActions.closeNotification());
  };

  const onSubmitHandler = async (input) => {
    try {
      await sendRequest(
        request.url,
        request.method,
        request.body ? request.body : input,
        request.headers
      );
      dispatch(uiActions.closeNotification());
      dispatch(uiActions.showSuccessNotification(successMessage));
      dispatch(pageActions.setCurrentPage(1))
    } catch (error) {
      // dispatch(uiActions.catchError(error.toString().replace('Error:', '')));
    }
    
  };

  let form;
  if (type === "REPLY_FORM") {
    form = (
      <ReplyForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
      />
    );
  } else if (type === "APPROVE_FORM") {
    form = (
      <ApproveForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
      />
    );
  } else if (type === "MODIFY_ANSWER_FORM") {
    form = (
      <ModifyAnswerForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
        
      />
    );
  }
  else if (type === "USER_DETAIL_FORM") {
    form = (
      <UserDetailForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
        
      />
    );
  }
  else if(type === "REJECT_FORM"){
    form = (
      <RejectForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
        
      />
    );
  }
  else if(type === "DEACTIVATE_FORM"){
    form = (
      <DeactivateForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
      />
    );
  }
  else if(type === "RESTORE_QUESTION_FORM"){
    form = (
      <RestoreQuestionForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
      />
    );
  }
  else if(type === "PUBLISH_QUESTION_FORM"){
    form = (
      <QuestionForm
        onClose={onCloseNotificationHandler}
        onSubmitHandler={onSubmitHandler}
      />
    );
  }

  return (
    <div className={`w-full min-h-full absolute top-0 flex items-center z-50`}>
      <div className="absolute bg-black opacity-80 w-full min-h-full top-0 left-0 z-0"></div>
      {form}
    </div>
  );
};
