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
  const { newSortType } = useSelector((state) => state.item);
  const { isSortingItems } = useSelector((state) => state.page);
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);

  useEffect(() => {
    try {
      const fetchQuestionList = async () => {
        const response = await sendRequest(
          LoadingList.fetchQuestionList,
          Requests.fetchQuestionList
        );
        setQuestions(response);
        setFirstLoading(true);
        // let questions = response;
        // newSortType &&
        //   (questions = response.filter((res) => res.type_name === newSortType));
        // dispatch(
        //   itemActions.fetchItems({
        //     items: newSortType === "Tất cả" ? response : questions,
        //   })
        // );
      };
      fetchQuestionList();
    } catch (error) {}
  }, [
    sendRequest,
    successNotification.refresh,
    dispatch,
  ]);

  useEffect(() => {
    let sortedQuestions = questions;
    newSortType &&
      (sortedQuestions = questions.filter(
        (res) => res.type_name === newSortType
      ));
    setQuestionsDisplay(newSortType === "Tất cả" ? questions : sortedQuestions);
  }, [questions, newSortType]);

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
          <tr className="translate-x-1/2 h-44 translate-y-1/2">
            <LoadingDot className="pt-20" />
          </tr>
        )}
        {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default QuestionManagement;
