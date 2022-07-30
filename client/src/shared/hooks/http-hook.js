import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token && token}`,
      }
    ) => {
      // setIsLoading(true);
      // console.log(isLoading)
      // const httpAbortCtrl = new AbortController();
      // activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          // signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();
        // activeHttpRequests.current = activeHttpRequests.current.filter(
        //   (reqCtrl) => reqCtrl !== httpAbortCtrl
        // );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        // setIsLoading(false);
        return responseData;
      } catch (error) {
        const err = error.toString().replace("Error:", "");
        // setError(err);
        dispatch(uiActions.catchError({ message: err }));
        throw error;
      }
    },
    [dispatch, token]
  );

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
