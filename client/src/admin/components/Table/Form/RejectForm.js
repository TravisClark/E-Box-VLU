import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";

export const RejectForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const { account } = useSelector((state) => state.auth);
  const inputRef = useRef();
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      message: inputRef.current.value,
      id_question: data.id_question,
      username: account.username,
    });
    props.onSubmitHandler(body);
  };
  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10">
        <span className="text-2xl font-bold">Từ chối câu hỏi</span>
        <h1 className="text-black break-all">{data.question}</h1>
        <textarea
              className="border border-slate-300 px-4 py-2 rounded-lg h-28 outline-none w-96"
              ref={inputRef}
            />
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm w-24"
            onClick={onSubmitHandler}
          >
            Xác nhận
          </button>
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm w-24"
            onClick={props.onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </>
  );
};
