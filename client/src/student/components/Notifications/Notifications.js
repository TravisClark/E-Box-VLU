import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Requests from "../../../shared/api/Requests";
import useHttpClient from "../../../shared/hooks/http-hook";
import classes from "../../../shared/styles/Styles.module.css";

export const Notifications = ({ changeBgColor }) => {
  const [isShowingNotifications, setIsShowNotifications] = useState(false);
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const { sendRequest } = useHttpClient();
  const onToggleNotificationsHandler = () => {
    setIsShowNotifications((prevState) => !prevState);
  };

  const onOpenQuestionDetails = useCallback(
    (selectedItem) => {
      onToggleNotificationsHandler();
      history.push(`/E-boxVLU/Home/question/${selectedItem.id_question}`);
    },
    [history]
  );

  useEffect(() => {
    const response = async () => {
      const response = await sendRequest(Requests.fetchNotifications);

      setNotifications(
        response.map((res) => (
          <li
            key={res.id_question}
            onClick={
              res.status_notification === "Đã được trả lời" &&
              onOpenQuestionDetails.bind(null, res)
            }
            className="flex justify-between items-center px-4 hover:bg-slate-100"
            style={{ borderBottom: "1px solid rgb(234, 234, 234)" }}
          >
            <div className="flex flex-col space-y-1 py-2">
              <span className="font-medium w-64">{res.question}</span>
              <span className="opacity-70 text-sm">
                {res.status_notification}
              </span>
            </div>
            <span className="text-slate-400 text-sm">{res.time}</span>
          </li>
        ))
      );
    };
    response();
  }, [sendRequest, onOpenQuestionDetails]);

  return (
    <div className={`relative `} onClick={onToggleNotificationsHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className={`scale-75 cursor-pointer transition duration-500 relative ${
          changeBgColor ? "fill-black" : "fill-white"
        }`}
        
      >
        <path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path>
      </svg>
      <div className="absolute -top-2 left-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="scale-75  fill-red-600"
        >
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path>
        </svg>
        <span
          className="text-white absolute top-0.5 left-2.5 text-xs font-medium"
          style={{ fontSize: "9px" }}
        >
          {notifications.length}
        </span>
      </div>
      {isShowingNotifications && (
        <div
          className={`w-96 h-30 bg-white absolute -right-28 mt-10 rounded-md flex flex-col ${classes.item}`}
        >
          <span className="font-medium p-4">Notifications</span>
          <ul
            className={`max-h-44 mb-10 overflow-hidden ${
              notifications.length > 0 && "hover:overflow-y-scroll"
            }`}
          >
            {notifications.length > 0 ? (
              notifications
            ) : (
              <li className="text-black w-full text-center">
                You don't have any notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};