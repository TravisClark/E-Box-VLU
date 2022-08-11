import React, {  useRef } from "react";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";
import Container from "../UI/Container";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";
import { uiActions } from "../../../shared/store/ui-slice";
import { Error } from "../../../shared/components/Error/Error";
import { LoadingDot } from "../../../shared/components/LoadingDot/LoadingDot";
import { LoadingList } from "../../../shared/api/LoadingList";

function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const {isShowing} = useSelector((state) => state.ui.error)
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);
  const { sendRequest } = useHttpClient();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username) {
      dispatch(uiActions.catchError({message: 'Vui lòng nhập tài khoản!'}))
      return;
    } else if (!password) {
      dispatch(uiActions.catchError({message: 'Vui lòng nhập mật khẩu!'}))
      return;
    }
    const fetchData = async () => {
      try {
        const requestData = await sendRequest(
          LoadingList.login,
          Requests.loginRequest,
          "POST",
          JSON.stringify({ username, password }),
        );
        dispatch(authActions.loginHandler({token: requestData}));
        dispatch(uiActions.setSpinnerState({ type: "DONE" }));
        history.push("/E-boxVLU/Home");
      } catch (error) {
      }
    };
    await fetchData();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Container className="absolute min-w-full min-h-full p-0 top-0 flex items-center justify-center">
        <div
          className={`absolute w-full h-full flex items-center justify-center lg:w-fit lg:h-fit`}
        >
          <div className="absolute top-0 bg-black w-full h-full opacity-70 lg:rounded"></div>
          <div className="flex flex-col space-y-8 w-2/3 z-10 lg:w-96 lg:px-10 lg:py-10">
            <h1 className="text-2xl text-white font-bold z-10">Đăng Nhập</h1>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập tài khoản"
                ref={usernameRef}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nhập mật khẩu"
                ref={passwordRef}
              />
              {isShowing && <Error/>}
            </div>
            {isSpinnerLoading && loadingType === LoadingList.login && (
          <div className="flex justify-center items-center">
            <LoadingDot className="m-auto" />
          </div>
        )}
            <Button className={` btn-primary bg-lightBlue`}>Đăng Nhập</Button>
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
