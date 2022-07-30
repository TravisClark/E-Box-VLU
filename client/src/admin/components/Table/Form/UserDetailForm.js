import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import RoleList from "../../RoleList/RoleList"
import StatusList from "../../StatusList/StatusList";
// import classes from "./Form.module.css";
export const UserDetailForm = (props) => {
  const { data } = useSelector((state) => state.ui.notification);
  const { selectedType, selectedTypeChanged } = useSelector((state) => state.item);
  const [newPassword, setNewPassword]= useState('')
  const [isShowWarning, setIsShowWarning] = useState(false)
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(false)
  const [status, setStatus] = useState(data.status)
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: data.username,
      password: newPassword,
      status_name: status,
      role_name: selectedTypeChanged ? selectedTypeChanged : selectedType,
    });
    props.onSubmitHandler(body);
  };

  const onRefreshPwHandler = ()=> {
    setNewPassword(`VLU${data.username.slice(-5)}`)
    onShowWarningHandler()
  }

  const onShowWarningHandler = ()=> {
    !isAbleToSubmit && setIsShowWarning(true)
  }

  const onCheckWarningHandler = ()=> {
    if(inputRef.current.value.trim() === 'XÁC NHẬN'){
      setIsShowWarning(false)
      setIsAbleToSubmit(true)
    }
    else{
      setIsShowWarning(true)
      setIsAbleToSubmit(false)
    }
  }

  const onChangeStatus = (input) => {
    setStatus(input.target.value)
    onShowWarningHandler()
  }
  
  return (
    <>
      <div className="flex flex-col space-y-8 items-center bg-white px-14 py-4 rounded-lg mx-auto z-10">
        <span className="text-2xl font-bold">Thông tin tài khoản</span>
        <div className="flex space-x-8 text-sm items-center">
          <span className="w-28">Tài khoản</span>
          <input
            type="text"
            className={`py-2 px-4 border rounded-lg outline-gray-300 w-80 text-gray-300`}
            disabled
            defaultValue={data.username}
          />
        </div>
        <div className="flex space-x-8 text-sm items-center">
          <span className="w-28">Mật khẩu</span>
          <div className="w-80 flex items-center space-x-2">
            <input
              type="text"
              className="py-2 px-4 border text-black rounded-lg outline-gray-300 w-11/12"
              disabled
              value={newPassword}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className={`cursor-pointer`}
              onClick={onRefreshPwHandler}
              disabled={!isShowWarning}
            >
              <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
            </svg>
          </div>
        </div>
        <div className="flex space-x-8 text-sm items-center">
          <span className="w-28">Trạng thái</span>
          {/* <input
            type="text"
            className="py-2 px-4 border rounded-lg outline-gray-300 w-80 text-gray-300"
            value={data.status}
            disabled
          /> */}
          <StatusList status={status} onChangeStatus={onChangeStatus}/>
        </div>
        <div className="flex space-x-8 text-sm items-center">
          <span className="w-28">Vai trò</span>
          <RoleList className="w-80 border" onShowWarning={onShowWarningHandler} selected={data.role_name}/>
        </div>
        <div className="flex flex-col text-sm space-y-2 w-96">
          <input
            type="text"
            className={`py-2 px-4 border rounded-lg outline-red-300 w-full ${isShowWarning && 'border-red-400'}`}
            disabled={!isShowWarning && !isAbleToSubmit}
            onChange={onCheckWarningHandler}
            ref={inputRef}
          />
          {isShowWarning && <span className="text-red-400 font-medium w-full">Nhập 'XÁC NHẬN' nếu muốn thay đổi thông tin tài khoản</span>}
        </div>
        <div className="flex w-full space-x-8 justify-center mt-10">
          <button
            className={`py-2 px-3 rounded-lg bg-lightBlue text-white font-medium text-sm ${!isAbleToSubmit ? 'bg-gray-300' : 'bg-lightBlue'}`}
            onClick={onSubmitHandler}
            disabled={!isAbleToSubmit}
          >
            Xác nhận
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
