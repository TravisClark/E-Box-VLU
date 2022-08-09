import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const useHttpClient = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const sendRequest = useCallback(
    async (
      loadingType = "loading",
      url,
      method = "GET",
      body = null,
      headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token && token}`,
      }
    ) => {
      dispatch(uiActions.setSpinnerState({ type: "LOADING", loadingType }));
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const responseData = await response.json();

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

  return { sendRequest };
};

export default useHttpClient;
