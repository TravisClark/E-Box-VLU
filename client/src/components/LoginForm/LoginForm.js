import React, {useRef} from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  return (
    <form>
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
              required
              ref={usernameRef}
            />
            <input
              type="password"
              className="p-4 bg-gray-700 rounded-md text-white outline-none"
              placeholder="Nhập mật khẩu"
              required
              ref={passwordRef}
            />
            <Button title='Đăng Nhập' className="bg-heavyBlue text-white"/>
            <span className="text-gray-400 italic">*Lưu ý: Chỉ sinh viên khoa CNTT được đăng nhập vào hệ thống!</span>
          </div>
        </div>
      </Container>
    </form>
  );
}

export default LoginForm;
