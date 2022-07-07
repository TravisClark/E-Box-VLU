import React from "react";
import { useSelector } from "react-redux";
import { Backdrop } from "../../../shared/components/UI/Backdrop";
import { ConfirmNotification } from "../../../shared/components/UI/ConfirmNotification";

function Background(props) {
  const { isShowing } = useSelector((state) => state.ui.notification);
  return (
    <div className="w-full h-screen bg-slate-200 flex">
      {props.children}
      {isShowing && (
        <div className="w-full h-screen absolute top-0 left-0">
          <ConfirmNotification />
          <Backdrop />
        </div>
      )}
    </div>
  );
}

export default Background;
