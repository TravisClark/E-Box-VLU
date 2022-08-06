import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const useHttpClient = () => {
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
      // const httpAbortCtrl = new AbortController();
      // activeHttpRequests.current.push(httpAbortCtrl);
      dispatch(uiActions.setSpinnerState({ type: "LOADING" }));
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
          dispatch(uiActions.setSpinnerState({ type: "DONE" }));
          throw new Error(responseData.message);
        }
        dispatch(uiActions.setSpinnerState({ type: "DONE" }));
        return responseData;
      } catch (error) {
        const err = error.toString().replace("Error:", "");
        dispatch(uiActions.catchError({ message: err }));
        throw error;
      }
    },
    [dispatch, token]
  );


  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
  //   };
  // }, []);

  return { sendRequest };
};

export default useHttpClient;
