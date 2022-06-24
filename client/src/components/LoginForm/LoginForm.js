import React, { useRef } from "react";
import { useState } from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom"; 
import { loginRequest } from "../../store/auth-action";
function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorSubmited, setErrorSubmited] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if(!username || !password) {
      setErrorSubmited(true);
      return;
    }
    await dispatch(loginRequest({username, password}));
     history.push('/E-boxVLU/Home')
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
            <input
              type="text"
              className="p-4 bg-gray-700 rounded-md text-white outline-none"
              placeholder="Nhập tài khoản"
              ref={usernameRef}
            />
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập mật khẩu"
                ref={passwordRef}
              />
              {errorSubmited && <h3 className="text-red-500 text-sm">
                Vui lòng nhập đầy đủ tài khoản, mật khẩu!
              </h3>}
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
