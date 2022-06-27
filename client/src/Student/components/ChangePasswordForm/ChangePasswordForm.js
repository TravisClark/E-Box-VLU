import React, { useRef } from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";

function ChangePasswordForm() {
  const oldPwRef = useRef();
  const newPwRef = useRef();
  const confirmNewPwRef = useRef();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector((state) => state.auth.account);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const oldPw = oldPwRef.current.value.trim();
    const newPw = newPwRef.current.value.trim();
    const confirmNewPw = confirmNewPwRef.current.value.trim();
    
    try {
      if (oldPw === "" || newPw === "" || confirmNewPw === "") {
        throw new Error("Please enter information");
      }
      await sendRequest(
        Requests.changePwRequest,
        "PATCH",
        JSON.stringify({
          password: oldPw,
          new_password: newPw,
          re_new_password: confirmNewPw,

        }),
        { "Content-Type": "application/json",
          Authentication: 'Bearer ' + account.token }
      );
      console.log('passed!')
      await dispatch(
        authActions.changePasswordHandler({ username: account.username, password: newPw })
      );
      history.push("/E-boxVLU/Home");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <Container className="absolute min-w-full min-h-full p-0 top-0 flex items-center justify-center">
        <div
          className={`absolute w-full h-full flex items-center justify-center lg:w-fit lg:h-fit`}
        >
          <div className="absolute top-0 bg-black w-full h-full opacity-70 lg:rounded"></div>
          <div className="flex flex-col space-y-8 w-2/3 z-10 lg:w-96 lg:px-10 lg:py-10">
            <h1 className="text-2xl text-white font-bold z-10">Đổi mật khẩu</h1>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập mật khẩu cũ"
                ref={oldPwRef}
              />
              {/* {IsUsernameEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui lòng nhập tài khoản!
                </h3>
              )} */}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập mật khẩu"
                ref={newPwRef}
              />
              {/* {isPasswordEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui lòng nhập mật khẩu!
                </h3>
              )} */}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập lại mật khẩu"
                ref={confirmNewPwRef}
              />
              {/* {isPasswordEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui lòng nhập mật khẩu!
                </h3>
              )} */}
            </div>
            <Button title="Submit" className={` text-white bg-heavyBlue`} />
            <span className="text-gray-500 italic">
              *Lưu ý: Chỉ sinh viên khoa CNTT được đăng nhập vào hệ thống!
            </span>
          </div>
        </div>
      </Container>
    </form>
  );
}

export default ChangePasswordForm;
