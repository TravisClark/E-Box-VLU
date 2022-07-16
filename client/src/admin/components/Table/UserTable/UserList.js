import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { uiActions } from "../../../../shared/store/ui-slice";

export const UserList = () => {
  // const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isLoading } = useHttpClient();
  const dispatch = useDispatch();

  const onOpenFormHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          url: Requests.replyQuestion,
          method: "PATCH",
          body: null,
          headers: { "Content-Type": "application/json" },
        },
        successMessage: "Chỉnh sửa thông tin tài khoản thành công!",
        type: "USER_DETAIL_FORM",
      })
    );
  };

  const questions = currentItems.map((user, index) => {
    return (
      <tr key={user._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">{user.username}</td>
        <td className="py-2 px-4">{user.role_name}</td>
        <td className="py-2 px-4">{user.role_name}</td>
        <td className="py-2 px-4 underline">
          <div className="flex space-x-4">
          <button onClick={onOpenFormHandler.bind(null, "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-orange-600 scale-75"
            >
              <path d="M18.649 16H5.352l-1.06 3H2v2h20v-2h-2.292zM6.057 14h11.886l-1.412-4H7.469zM13 2h-2a1 1 0 0 0-.943.667L8.175 8h7.65l-1.882-5.333A1 1 0 0 0 13 2z"></path>
            </svg>
          </button>
          <button onClick={onOpenFormHandler.bind(null, "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-blue-600 scale-75"
            >
              <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
            </svg>
          </button>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : questions.length > 0 ? (
        questions
      ) : (
        <tr>
          <td>There is no question in this list</td>
        </tr>
      )}
    </tbody>
  );
};
