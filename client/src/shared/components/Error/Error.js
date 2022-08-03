import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export const Error = (props) => {
    const dispatch = useDispatch();
    const {message} = useSelector((state) => state.ui.error)

    useEffect(() => {
        return ()=> {
            clearTimeout(dispatch(uiActions.clearError()))
        }
    }, [dispatch]);

  return <h3 className={`text-red-500 text-sm ${props.className}`}>{message}</h3>;
};
