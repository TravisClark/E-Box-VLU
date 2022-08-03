import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../../../shared/store/item-slice";

export const RestoreQuestionForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itemActions.getSelected({type: data.type_name}))
  }, [dispatch, data]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      id_question: data.id_question,
      username: account.username,
    });
    props.onSubmitHandler(body);
  };
  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10">
        <span className="text-2xl font-bold">Khôi phục câu hỏi</span>
        <h1 className="max-w-lg break-all">{data.question}</h1>
        {/* <QuestionType
          className="self-start border"
          selected={data.type_name}
        /> */}
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm"
            onClick={onSubmitHandler}
          >
            Khôi phục
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
