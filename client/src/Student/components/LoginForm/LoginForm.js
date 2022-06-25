import React, { useRef } from "react";
import { useState } from "react";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";
import Container from "../UI/Container";
import useHttpClient from "../../../shared/hooks/http-hook";
function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [IsUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const { isLoading, error, sendRequest } = useHttpClient();
  // const [errorSubmitted, setErrorSubmitted] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username) {
      setUsernameEmpty(true);
      return;
    } else if (!password) {
      setPasswordEmpty(true);
      return;
    }
    const API_KEY = "http://localhost:5000/user/api/login";
    try {
      await sendRequest(
        API_KEY,
        "POST",
        JSON.stringify({ username, password }),
        { "Content-Type": "application/json" }
      );
      await dispatch(authActions.loginHandler({ username, password }));
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
            <h1 className="text-2xl text-white font-bold z-10 ">Đăng Nhập</h1>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập tài khoản"
                ref={usernameRef}
              />
              {IsUsernameEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui lòng nhập mật khẩu!
                </h3>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập mật khẩu"
                ref={passwordRef}
              />
              {isPasswordEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui lòng nhập tài khoản!
                </h3>
              )}
            </div>
            <Button title="Đăng Nhập" className={` text-white bg-heavyBlue`} />
            <span className="text-gray-500 italic">
              *Lưu ý: Chỉ sinh viên khoa CNTT được đăng nhập vào hệ thống!
            </span>
          </div>
        </div>
      </Container>
    </form>
  );
}

export default LoginForm;
