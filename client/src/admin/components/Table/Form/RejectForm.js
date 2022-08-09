import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import { Error } from "../../../../shared/components/Error/Error";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import classes from "./Form.module.css";

export const RejectForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const { account } = useSelector((state) => state.auth);
  const inputRef = useRef();
  const { isShowing } = useSelector((state) => state.ui.error);
  const { loadingType } = useSelector((state) => state.ui);

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
      <div
        className={`flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10 max-w-2xl  ${classes["min-width"]}`}
      >
        <span className="text-2xl font-bold">Từ chối câu hỏi</span>
        <h1 className="text-black break-all">{data.question}</h1>
        <div className="flex flex-col w-full">
          <textarea
            className="border border-slate-300 px-4 py-2 rounded-lg h-28 outline-none "
            ref={inputRef}
            placeholder='Nhập lý do từ chối...'
          />
          {isShowing && <Error className="mt-2" />}
        </div>
        {loadingType === LoadingList.refuseQuestion && (
          <div className="w-full flex justify-center">
            <LoadingDot/>
          </div>
        )}
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className="btn-primary"
            onClick={onSubmitHandler}
          >
            Xác nhận
          </button>
          <button
            className="btn-primary"
            onClick={props.onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </>
  );
};
