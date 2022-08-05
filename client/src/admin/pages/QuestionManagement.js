import React, { useState } from "react";
import Container from "../../student/components/UI/Container";
import TableOptions from "../components/Table/TableOptions";
import NewQuestionsTable from "../components/Table/NewQuestionsTable/NewQuestionsTable";
import { DisapprovedQuestionsTable } from "../components/Table/DisapprovedQuestionsTable/DisapprovedQuestionsTable";
import { ApprovedQuestionsTable } from "../components/Table/ApprovedQuestionsTable/ApprovedQuestionsTable";
import { RepliedQuestionsTable } from "../components/Table/RepliedQuestionsTable/RepliedQuestionsTable";
import { useEffect } from "react";
import Requests from "../../shared/api/Requests";
import useHttpClient from "../../shared/hooks/http-hook";
import { Notification } from "../../shared/components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../shared/store/item-slice";
import { Error } from "../../shared/components/Error/Error";
import { LoadingDot } from "../../shared/components/LoadingDot/LoadingDot";

const tableOptions = [
  "New Question List",
  "Approved Question List",
  "Disapproved Question List",
  "Replied Question List",
];

function QuestionManagement() {
  const { account } = useSelector((state) => state.auth);
  const { sendRequest } = useHttpClient();
  const { successNotification } = useSelector((state) => state.ui);
  const { newSortType } = useSelector((state) => state.item);
  const { isSortingItems } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const { isShowing } = useSelector((state) => state.ui.error);
  const { isSpinnerLoading } = useSelector((state) => state.ui);
  const [selectedTable, setSelectedTable] = useState();

  useEffect(() => {
    try {
      const fetchQuestionList = async () => {
        const response = await sendRequest(Requests.fetchQuestionList);
        let questions = response;
        newSortType &&
          (questions = response.filter((res) => res.type_name === newSortType));
        dispatch(
          itemActions.fetchItems({
            items: newSortType === "Tất cả" ? response : questions,
          })
        );
      };
      fetchQuestionList();
    } catch (error) {}
  }, [
    sendRequest,
    successNotification.refresh,
    dispatch,
    isSortingItems,
    newSortType,
  ]);

  useEffect(() => {
    setSelectedTable(
      account.role_name !== "Ban Chủ Nhiệm Khoa"
        ? tableOptions[0]
        : tableOptions[1]
    );
  }, [account.role_name]);

  const onChangeSelectedTable = (selected) => {
    setSelectedTable(selected);
  };

  let table;
  switch (selectedTable) {
    case tableOptions[0]: {
      table = <NewQuestionsTable />;
      break;
    }
    case tableOptions[1]: {
      table = <DisapprovedQuestionsTable />;
      break;
    }
    case tableOptions[2]: {
      table = <ApprovedQuestionsTable />;
      break;
    }
    default: {
      table = <RepliedQuestionsTable />;
    }
  }

  return (
    <Container className="m-auto w-11/12 h-full py-14 px-20 space-y-6 relative">
      <h1 className="text-2xl font-semibold">Question Management</h1>
      <div className="flex flex-col bg-white py-6 pl-5 pr-28 rounded-md items-center space-y-5 relative xl:px-10">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-semibold self-center text-gray-500">
            {selectedTable}
          </h1>
          <TableOptions
            onChangeSelectedTable={onChangeSelectedTable}
            selectedTable={selectedTable}
            tableOptions={tableOptions}
          />
        </div>
        <div className="border w-full"></div>

        {isShowing && <Error />}
        {isSpinnerLoading && <LoadingDot />}
        {table && table}
        {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default QuestionManagement;
