import React, { useRef, } from "react";
import { useSelector } from "react-redux";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";

export const ReplyForm = (props) => {
  const inputRef = useRef();
  const { account } = useSelector((state) => state.auth);
  const {selectedType} = useSelector((state) => state.question)

  const date = new Date(props.data.createdAt);
  const dateTranslate = {
    min: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
  const formatDate = `${dateTranslate.day}/${dateTranslate.month}/${dateTranslate.year}, ${dateTranslate.hour}:${dateTranslate.min}`;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      answer: inputRef.current.value,
      type_name: selectedType,
      id_question: props.data.id_question,
      username: account.username,
    });
    props.onSubmitHandler(body);
  };

  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10 ">
        <span className="text-2xl font-bold">Xác nhận duyệt</span>
        <form onSubmit={onSubmitHandler} className="table-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex w-full py-2 px-10 space-x-10 bg-gray-200 rounded-md">
              <span className="text-xl font-semibold w-32">Tên</span>
              <span className="text-xl font-semibold w-72">Câu hỏi</span>
              <span className="text-xl font-semibold w-52">Gửi vào lúc</span>
            </div>
            <div className="flex w-full py-2 px-10 space-x-10 ">
              <span className="text-xl font-semibold w-32">
                {props.data.username_question}
              </span>
              <span className="text-xl font-semibold w-72 break-all">
                {props.data.question}
              </span>
              <span className="text-xl font-semibold w-52">
                {formatDate}
              </span>
            </div>
            <QuestionType selected={props.data.type_name}/>
            <textarea
              className="w-full border px-4 py-2 rounded-lg h-28 outline-none"
              ref={inputRef}
            />
          </div>
          <div className="flex w-full space-x-8 justify-center mt-10">
            <button
              className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm"
              // onClick={props.onSubmitHandler}
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
        </form>
      </div>
    </>
  );
};
