import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Requests from "../../../shared/api/Requests";
import useHttpClient from "../../../shared/hooks/http-hook";
import { authActions } from "../../../shared/store/auth-slice";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoggedIn } = useSelector((state) => state.auth);
  // const {token, setToken} = useState(false)
  // const { token } = useSelector((state) => state.auth.token || "");
  const { sendRequest } = useHttpClient();

  // const login = useCallback(() => {

  // },[])
  //   const fetchData = useCallback(async () => {
  //     const token = localStorage.getItem('token');
  //     console.log(token)
  //   try {
  //     // const responseData = await fetch(Requests.fetchAccount, {

  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //     authorization: `Bearer ` + token,
  //     //   },
  //     // });
  //     // if (!responseData.ok) {
  //     //   throw responseData.err;
  //     // }
  //     dispatch(authActions.saveUserHandler(responseData.json()));
  //   } catch (error) {
  //     alert(error);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    // dispatch(authActions.autoLoginHandler());
    !isLoggedIn && history.push("/");
  }, [dispatch, isLoggedIn, history]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      const fetchData = async () => {
        try {
          const response = await sendRequest(
            Requests.fetchAccount,
            "GET",
            null,
            {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            }
          );
          console.log(response.json());
        } catch (error) {
          alert(error)
        }
      };
      fetchData()
    }
  }, [dispatch, isLoggedIn, sendRequest]);

  // useEffect(() => {

  // }, [isLoggedIn, history]);
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
