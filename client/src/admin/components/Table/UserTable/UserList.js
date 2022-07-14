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
        successMessage: "Chỉnh sửa câu trả lời thành công!",
        type: "MODIFY_ANSWER_FORM",
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
        <td className="py-2 px-4">{user.role_name}</td>
        <td className="py-2 px-4 underline">
          <button onClick={onOpenFormHandler.bind(null, "")}>Xem</button>
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
