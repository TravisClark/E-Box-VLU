import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../../shared/api/LoadingList";
import Requests from "../../../../shared/api/Requests";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { uiActions } from "../../../../shared/store/ui-slice";
export const UserList = () => {
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const activeStyle = `bg-green-100 text-green-500`;
  const deactivateStyle = `bg-red-100 text-red-500`;

  const onOpenUserDetailHandler = (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          loadingType: LoadingList.changeUserInfo,
          url: Requests.changeUserInfo,
          method: "PATCH",
          body: null,
        },
        successMessage: "Chỉnh sửa thông tin tài khoản thành công!",
        type: "USER_DETAIL_FORM",
      })
    );
  };

  const users = currentItems.map((user, index) => {
    return (
      <tr key={user._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">{user.username}</td>
        <td className="py-2 px-4">{user.role_name}</td>
        <td className={`py-2 px-4 `}>
          <div
            className={` rounded-lg text-center w-28 text-xs py-1 font-medium ${
              user.status_account === "Đang hoạt động"
                ? activeStyle
                : deactivateStyle
            }`}
          >
            {user.status_account}
          </div>
        </td>
        <td className="py-2 px-10 ">
          <button onClick={onOpenUserDetailHandler.bind(null, user)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="fill-blue-600 scale-75"
            >
              <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
            </svg>
          </button>
        </td>
      </tr>
    );
  });
  return (
    <tbody>
      {loadingType === LoadingList.fetchUsersList && (
        <tr className="translate-x-1/2 h-44 translate-y-1/2">
          <LoadingDot className="pt-20" />
        </tr>
      )}
      {loadingType !== LoadingList.fetchUsersList && users}
      {users.length <= 0 && !isSpinnerLoading && (
        <tr>
          <td>There is no users in this list</td>
        </tr>
      )}
    </tbody>
  );
};
