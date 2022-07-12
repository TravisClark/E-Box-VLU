import React from "react";
import { useSelector } from "react-redux";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";

export const ApproveForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const { selectedType } = useSelector((state) => state.question);
  const { account } = useSelector((state) => state.auth);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      type_name: selectedType,
      id_question: data.id_question,
      username: account.username,
    });
    props.onSubmitHandler(body);
  };
  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10">
        <span className="text-2xl font-bold">Xác nhận duyệt</span>
        <h1 className="max-w-lg break-all">{props.message}</h1>
        <QuestionType
          className="self-start border"
          selected={props.data.type_name}
        />
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm"
            onClick={onSubmitHandler}
          >
            Submit
          </button>
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
