import React from "react";
import { useSelector } from "react-redux";
import Requests from "../../../shared/api/Requests";
import { LoadingDot } from "../../../shared/components/LoadingDot/LoadingDot";
import useHttpClient from "../../../shared/hooks/http-hook";

const checkedStyles = `fill-orange-400 group-hover:fill-white group-hover:stroke-orange-400`;
const unCheckedStyles = `stroke-orange-400 fill-white group-hover:fill-orange-400`;

export const Stars = ({ stars, id_question, refreshHandler }) => {
  const { account } = useSelector((state) => state.auth);
  const { sendRequest } = useHttpClient();
  const { isSpinnerLoading } = useSelector((state) => state.ui);
  // console.log(stars)
  const checkUsername = stars.filter(
    (star) => star.username === account.username
  );
  const onCheckHandler = async () => {
    try {
      await sendRequest(
        Requests.likeQuestion,
        "PUT",
        JSON.stringify({ id_question, username: account.username })
      );
      refreshHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="rating flex space-x-2 border border-slate-300 h-fit py-1 px-2 justify-center rounded-md cursor-pointer group"
      onClick={onCheckHandler}
    >
      {!isSpinnerLoading && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={`scale-75 ${
              checkUsername.length === 0 ? unCheckedStyles : checkedStyles
            }`}
          >
            <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
          </svg>
          <span className="h-full font-medium text-md mt-0.5">
            {stars.length}
          </span>
        </>
      )}
      {isSpinnerLoading && (
        <LoadingDot className="m-auto py-3 px-4" size='10px'/>
      )}
    </div>
  );
};
