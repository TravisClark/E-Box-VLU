import React from "react";
import { Controller, useForm } from "react-hook-form";
import Requests from "../../shared/api/Requests";
import useHttpClient from "../../shared/hooks/http-hook";
import Container from "../../student/components/UI/Container";
import Select from "../components/Ui/Select";

const defaultValues = {
  role: "",
  username: "",
};
function AddUser() {
  const { handleSubmit, control } = useForm({ defaultValues });
  const { sendRequest, error } = useHttpClient();
  const onSubmitHandler = async (inputData) => {
    try {
      await sendRequest(
        Requests.addUserRequest,
        "POST",
        JSON.stringify(inputData),
        { "Content-Type": "application/json" }
      );
    } catch (error) {}
  };
  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6">
      <h1 className="text-2xl font-semibold ">Add User</h1>
      <div className="flex flex-col bg-white py-10 rounded-md items-center space-y-10">
        <h1 className="text-2xl font-bold">Add User</h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-col space-y-2">
            <span className="">Username</span>
            <Controller
              render={({ field }) => (
                <input
                  type="text"
                  className="px-4 py-2 outline-none border rounded-md border-gray-300"
                  placeholder="Enter username"
                  {...field}
                />
              )}
              name="username" // name has to be the same as defaultValues properties
              control={control}
            />
          </div>
          <div className="flex flex-col space-y-2">
            {/* <span className="">Role</span> */}
            <Select control={control} name="role" />
            {error && <h3 className="text-red-500 text-sm">{error}</h3>}
          </div>
          <button className="bg-lightBlue px-4 py-2 rounded-xl font-medium text-white w-fit mx-auto">
            Add User
          </button>
        </form>
      </div>
    </Container>
  );
}

export default AddUser;
