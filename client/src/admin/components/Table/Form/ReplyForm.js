import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const ReplyForm = (props) => {
  const inputRef = useRef();
  const [selected, setSelected] = useState("");
  const { account } = useSelector((state) => state.auth);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      answer: inputRef.current.value,
      type_name: selected,
      id_question: props.data.id_question,
      username: account.username,
    });
    props.onSubmitHandler(body)
  };
  // const onChange = (value) => {

  // }
  return (
    <>
      
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10 ">
        <span className="text-2xl font-bold">Xác nhận duyệt</span>
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col space-y-6">
            <div className="flex w-full py-2 px-10 space-x-20 bg-gray-200 rounded-md">
              <span className="text-xl font-semibold w-1/5">Tên</span>
              <span className="text-xl font-semibold w-4/5">Câu hỏi</span>
              <span className="text-xl font-semibold w-1/5">Gửi vào lúc</span>
            </div>
            <div className="flex w-full py-2 px-10 space-x-20">
              <span className="text-xl font-semibold w-1/5">
                {props.data.username_question}
              </span>
              <span className="text-xl font-semibold w-4/5">
                {props.data.question}
              </span>
              <span className="text-xl font-semibold w-1/5">
                {props.data.createdAt}
              </span>
            </div>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-fit px-4 py-2 rounded-md"
            >
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
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
