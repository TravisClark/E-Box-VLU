import React from "react";
import notificationIcon from "../../../assets/check (1).png";
import classes from './Notification.module.css'
export const Notification = (props) => {
  return (
    <div
      className={`${props.className} absolute flex  items-center ${classes.notification}`}
    >
      <div className="flex space-x-4 bg-white p-6 rounded-lg mx-auto">
        <img src={notificationIcon} alt="a" className="w-6" />
        <h1>{props.message}</h1>
      </div>
    </div>
  );
};
