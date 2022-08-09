import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { itemActions } from "../../../../shared/store/item-slice";

export const RestoreQuestionForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { loadingType } = useSelector((state) => state.ui);

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
        {loadingType === LoadingList.restoreQuestion && (
            <div className="w-full mt-10 flex justify-center">
              <LoadingDot />
            </div>
          )}
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className="btn-primary"
            onClick={onSubmitHandler}
          >
            Khôi phục
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
