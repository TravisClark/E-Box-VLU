import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../shared/store/auth-slice";
import Container from "../UI/Container";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";

function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [IsUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [account, setAccount] = useState();
  const { sendRequest, error } = useHttpClient();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username) {
      setUsernameEmpty(true);
      password && setPasswordEmpty(false);
      return;
    } else if (!password) {
      setPasswordEmpty(true);
      username && setUsernameEmpty(false);
      return;
    }
    setUsernameEmpty(false);
    setPasswordEmpty(false);
    const fetchData = async () => {
      try {
        const requestData = await sendRequest(
          Requests.loginRequest,
          "POST",
          JSON.stringify({ username, password }),
          { "Content-Type": "application/json" }
        );
        setAccount(requestData);
      } catch (error) {
      }
    };
    await fetchData();
  };

  useEffect(() => {
    if (account) {
      const storeData = async () => {
        await dispatch(authActions.loginHandler(account));
        await history.push("/E-boxVLU/Home");
      };
      storeData();
    }
  }, [account, dispatch, history]);
  return (
    <form onSubmit={onSubmitHandler}>
      <Container className="absolute min-w-full min-h-full p-0 top-0 flex items-center justify-center">
        <div
          className={`absolute w-full h-full flex items-center justify-center lg:w-fit lg:h-fit`}
        >
          <div className="absolute top-0 bg-black w-full h-full opacity-70 lg:rounded"></div>
          <div className="flex flex-col space-y-8 w-2/3 z-10 lg:w-96 lg:px-10 lg:py-10">
            <h1 className="text-2xl text-white font-bold z-10">????ng Nh???p</h1>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nh???p t??i kho???n"
                ref={usernameRef}
              />
              {IsUsernameEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui l??ng nh???p t??i kho???n!
                </h3>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                className="p-4 bg-gray-700 rounded-md text-white outline-none"
                placeholder="Nh???p m???t kh???u"
                ref={passwordRef}
              />
              {isPasswordEmpty && (
                <h3 className="text-red-500 text-sm">
                  Vui l??ng nh???p m???t kh???u!
                </h3>
              )}
              {error && <h3 className="text-red-500 text-sm">{error}</h3>}
            </div>
            <Button className={` text-white bg-heavyBlue`}>????ng Nh???p</Button>
            <span className="text-gray-500 italic">
              *L??u ??: Ch??? sinh vi??n khoa CNTT ???????c ????ng nh???p v??o h??? th???ng!
            </span>
          </div>
        </div>
      </Container>
    </form>
  );
}

export default LoginForm;
