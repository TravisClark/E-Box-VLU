import React, { useState } from "react";
import Container from "../../student/components/UI/Container";
import TableOptions from "../components/Table/TableOptions";
import { DisapprovedQuestionsTable } from "../components/Table/DisapprovedQuestionsTable/DisapprovedQuestionsTable";
import { ApprovedQuestionsTable } from "../components/Table/ApprovedQuestionsTable/ApprovedQuestionsTable";
import { RepliedQuestionsTable } from "../components/Table/RepliedQuestionsTable/RepliedQuestionsTable";
import { NewQuestionsTable } from "../components/Table/NewQuestionsTable/NewQuestionsTable";
import { useEffect } from "react";
import Requests from "../../shared/api/Requests";
import useHttpClient from "../../shared/hooks/http-hook";
import { Notification } from "../../shared/components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../shared/store/item-slice";
import { LoadingList } from "../../shared/api/LoadingList";
import { LoadingDot } from "../../shared/components/LoadingDot/LoadingDot";
import { uiActions } from "../../shared/store/ui-slice";

const tableOptions = [
  "Câu hỏi chưa được duyệt",
  "Câu hỏi bị từ chối",
  "Câu hỏi đã được duyệt",
  "Câu hỏi đã được trả lời",
];

function QuestionManagement() {
  const dispatch = useDispatch();
  const [table, setTable] = useState(null);
  const [selectedTable, setSelectedTable] = useState();
  const [questions, setQuestions] = useState([]);
  const [questionsDisplay, setQuestionsDisplay] = useState([]);
  const { sendRequest } = useHttpClient();
  const { account } = useSelector((state) => state.auth);
  const { successNotification } = useSelector((state) => state.ui);
  const [firstLoading, setFirstLoading] = useState(false);
  const { newSortType, itemSearching } = useSelector((state) => state.item);
  const { isSpinnerLoading } = useSelector((state) => state.ui);

  useEffect(() => {
    try {
      const fetchQuestionList = async () => {
        const response = await sendRequest(
          LoadingList.fetchQuestionList,
          Requests.fetchQuestionList
        );
        setQuestions(response);
        dispatch(uiActions.setSpinnerState({ type: "DONE" }));
        setFirstLoading(true);
      };
      fetchQuestionList();
    } catch (error) {}
  }, [sendRequest, successNotification.refresh, dispatch]);

  useEffect(() => {
    const sortedQuestions = questions.filter((question) =>
      question.question.toLowerCase().includes(itemSearching.toLowerCase())
    );
    setQuestionsDisplay(
      newSortType === "Tất cả"
        ? sortedQuestions
        : sortedQuestions.filter((question) =>
            question.type_name.includes(newSortType)
          )
    );
  }, [questions, newSortType, itemSearching]);

  useEffect(() => {
    dispatch(
      itemActions.fetchItems({
        items: questionsDisplay,
      })
    );
  }, [questionsDisplay, dispatch]);

  useEffect(() => {
    setSelectedTable(
      account.role_name !== "Ban Chủ Nhiệm Khoa"
        ? tableOptions[0]
        : tableOptions[2]
    );
  }, [account.role_name]);

  const onChangeSelectedTable = (selected) => {
    setSelectedTable(selected);
  };

  useEffect(() => {
    switch (selectedTable) {
      case tableOptions[0]: {
        setTable(<NewQuestionsTable />);
        break;
      }
      case tableOptions[1]: {
        setTable(<DisapprovedQuestionsTable />);
        break;
      }
      case tableOptions[2]: {
        setTable(<ApprovedQuestionsTable />);
        break;
      }
      default: {
        setTable(<RepliedQuestionsTable />);
      }
    }
  }, [selectedTable]);

  return (
    <Container className="m-auto w-11/12 h-full py-14 px-20 space-y-6 relative">
      <h1 className="text-2xl font-semibold">Quản lý câu hỏi</h1>
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
        {table}
        {isSpinnerLoading && !firstLoading && (
          <div className="flex justify-center h-20 items-center">
            <LoadingDot />
          </div>
        )}
        {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default QuestionManagement;
