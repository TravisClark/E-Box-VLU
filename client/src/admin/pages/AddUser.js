import React, { useRef } from "react";
import Requests from "../../shared/api/Requests";
import useHttpClient from "../../shared/hooks/http-hook";
import Container from "../../student/components/UI/Container";
import RoleList from "../components/RoleList/RoleList";
import { useHistory } from "react-router-dom";
import { uiActions } from "../../shared/store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "../../shared/components/Error/Error";

function AddUser() {
  const { sendRequest } = useHttpClient();
  const history = useHistory();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const {isShowing} = useSelector(state => state.ui.error);
  const {selectedType, selectedTypeChanged} = useSelector((state) => state.item)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const username = inputRef.current.value;
    try {
      await sendRequest(
        Requests.addUserRequest,
        "POST",
        JSON.stringify({ username, role_name: selectedTypeChanged ? selectedTypeChanged : selectedType}),
      );
      dispatch(uiActions.showSuccessNotification("Thêm tài khoản thành công!"));
      history.push("/E-boxVLU/admin/users");
      setTimeout(() => {
        dispatch(uiActions.closeSuccessNotification());
      }, 2000);
    } catch (error) {}
  };

  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6">
      <h1 className="text-2xl font-semibold ">Add User</h1>
      <div className="flex flex-col bg-white py-10 rounded-md items-center space-y-10">
        <h1 className="text-2xl font-bold">Add User</h1>
        <form className="flex flex-col space-y-4 " onSubmit={onSubmitHandler}>
          <div className="flex flex-col space-y-2">
            <span className="">Username</span>
            <input
              type="text"
              className="px-4 py-2 outline-none border rounded-md border-gray-300 w-72"
              placeholder="Enter username"
              ref={inputRef}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span>Role</span>
            <RoleList className="border w-full" selected='Sinh Viên'/>
            {isShowing && <Error/>}
          </div>
          <button className="btn-primary w-fit mx-auto">
            Add User
          </button>
        </form>
      </div>
    </Container>
  );
}

export default AddUser;
