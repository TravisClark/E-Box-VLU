import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../shared/api/Requests";
import { QuestionType } from "../../../shared/components/QuestionType/QuestionType";
import useHttpClient from "../../../shared/hooks/http-hook";
import { uiActions } from "../../../shared/store/ui-slice";
import Container from "../UI/Container";

function QuestionForm(props) {
  const { sendRequest, error } = useHttpClient();
  const questionInputRef = useRef();
  const { account } = useSelector((state) => state.auth);
  const {selectedTypeChanged} = useSelector((state) => state.item)
  const dispatch = useDispatch();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const question = questionInputRef.current.value;
    try {
      await sendRequest(
        Requests.publishQuestion,
        "POST",
        JSON.stringify({ username: account.username, question, type_name: selectedTypeChanged   }),
        { "Content-Type": "application/json" }
      );
      props.onClose();
      dispatch(uiActions.showSuccessNotification("Đặt câu hỏi thành công"));
    } catch (error) {}
  };

  return (
    <Container className="min-w-full h-full flex absolute justify-center items-center top-0 left-0 z-30">
      <form
        className="min-w-full flex justify-center"
        onSubmit={onSubmitHandler}
      >
        <div className=" bg-white relative rounded-lg items-center z-20 p-4 space-y-4 flex flex-col w-full md:w-2/3 lg:w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="self-end cursor-pointer"
            onClick={props.onClose}
          >
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
          <label className="font-bold text-xl text-black">Đặt câu hỏi</label>
          <div className="flex flex-col space-y-3 w-full">
            <label className="text-sm text-black italic">
              *Lưu ý: sau khi đặt câu hỏi vui lòng đợi duyệt
            </label>
            <QuestionType className="border"/>
            <textarea
              type="text"
              className="p-4 text-sm border text-start rounded-md border-gray-300 h-32 outline-none"
              placeholder="Nhập câu hỏi"
              ref={questionInputRef}
            />
            {error && <h3 className="text-red-500 text-sm">{error}</h3>}
          </div>
          <button className="bg-lightBlue text-white px-6 py-2 font-semibold rounded">
            Submit
          </button>
        </div>
      </form>
      <div className="w-full h-full absolute bg-black opacity-70 z-0"></div>
    </Container>
  );
}

export default QuestionForm;
