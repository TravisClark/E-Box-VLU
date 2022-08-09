import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import { Error } from "../../../../shared/components/Error/Error";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { itemActions } from "../../../../shared/store/item-slice";

export const ReplyForm = (props) => {
  const inputRef = useRef();
  const { account } = useSelector((state) => state.auth);
  const { selectedType, selectedTypeChanged } = useSelector(
    (state) => state.item
  );
  const { isShowing } = useSelector((state) => state.ui.error);
  const { data } = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const { loadingType } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(itemActions.getSelected({ type: data.type_name }));
  }, [dispatch, data]);

  const date = new Date(data.createdAt);
  const formatDate = date.toUTCString();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      answer: inputRef.current.value,
      type_name: selectedTypeChanged ? selectedTypeChanged : selectedType,
      id_question: data.id_question,
      username: account.username,
    });
    props.onSubmitHandler(body);
  };
  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10 ">
        <span className="text-2xl font-bold">Trả lời câu hỏi</span>
        <form onSubmit={onSubmitHandler} className="table-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex w-full py-2 px-10 space-x-10 bg-gray-200 rounded-md">
              <span className="text-xl font-semibold w-56">Người đặt</span>
              <span className="text-xl font-semibold w-96">Câu hỏi</span>
              <span className="text-xl font-semibold w-52">Gửi vào lúc</span>
            </div>
            <div className="flex w-full py-2 px-10 space-x-10 border items-center">
              <span className="text-xl font-semibold w-56 m-auto break-words">
                {data.username_questioner}
              </span>
              <span className="text-xl font-semibold w-96 break-words">
                {data.question}
              </span>
              <span className="text-xl font-semibold w-52 m-auto">
                {formatDate}
              </span>
            </div>
            <QuestionType selected={data.type_name} className="border" />
            <div className="flex flex-col w-full">
              <textarea
                className="w-full border px-4 py-2 rounded-lg h-28 outline-none"
                ref={inputRef}
                placeholder="Nhập câu trả lời..."
              />
              {isShowing && <Error className="mt-2" />}
            </div>
          </div>
          {loadingType === LoadingList.replyQuestion && (
            <div className="w-full mt-10 flex justify-center">
              <LoadingDot />
            </div>
          )}
          <div className="flex w-full space-x-8 justify-center mt-10">
            <button className="btn-primary">Trả lời</button>
            <button className="btn-primary" onClick={props.onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
