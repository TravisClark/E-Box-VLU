import React from "react";
import { useSelector } from "react-redux";
import { Backdrop } from "../../../shared/components/UI/Backdrop";
import { ConfirmNotification } from "../../../shared/components/UI/ConfirmNotification";

function Background(props) {
  const { isShowing } = useSelector((state) => state.ui.notification);
  return (
    <div className="w-full bg-slate-200 flex" style={{ minHeight: '800px'}}>
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
