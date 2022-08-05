import React from "react";
import { useSelector } from "react-redux";

export const DeactivateForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: data.username,
    });
    props.onSubmitHandler(body);
  };
  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10">
        <span className="text-2xl font-bold">Vô hiệu hóa tài khoản</span>
        <h1 className="max-w-lg break-words">
          Xác nhận vô hiệu hóa tài khoản <span className="font-bold">{data.username} </span>
           đang có quyền <span className="font-bold">{data.role_name}</span> ?
        </h1>
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className="py-2 px-3 rounded-lg bg-red-500 text-white font-medium text-sm"
            onClick={onSubmitHandler}
          >
            Xác nhận
          </button>
          <button
            className="py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm w-16"
            onClick={props.onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </>
  );
};
