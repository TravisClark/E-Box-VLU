import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { uiActions } from "../../shared/store/ui-slice";

function QuestionManagement() {
  const [selectedTable, setSelectedTable] = useState("New Question List");
  const { sendRequest, isLoading, error } = useHttpClient();
  const [questions, setQuestions] = useState([]);
  const { successNotification } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  console.count();
  useEffect(() => {
    try {
      const fetchQuestionList = async () => {
        const response = await sendRequest(Requests.fetchQuestionList);
        setQuestions(response);
      };
      fetchQuestionList();
    } catch (error) {}
  }, [sendRequest,successNotification.refresh]);

  const onChangeSelectedTable = (selected) => {
    setSelectedTable(selected);
  };

  useEffect(() => {
    if (successNotification.isShowing) {
      setTimeout(() => {
        dispatch(uiActions.closeSuccessNotification());
      }, 3000);
    }
  }, [successNotification.isShowing, dispatch]);

  let table;
  if (selectedTable === "New Question List") {
    table = (
      <NewQuestionsTable
        questions={questions}
      />
    );
  } else if (selectedTable === "Disapproved Question List") {
    table = <DisapprovedQuestionsTable questions={questions} />;
  } else if (selectedTable === "Approved Question List") {
    table = <ApprovedQuestionsTable questions={questions} />;
  } else {
    table = <RepliedQuestionsTable questions={questions} />;
  }

  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6 relative">
      <h1 className="text-2xl font-semibold">Question Management</h1>
      <div className="flex flex-col bg-white py-6 px-10 rounded-md items-center space-y-5 relative">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-semibold self-center text-gray-500">
            {selectedTable}
          </h1>
          <TableOptions
            onChangeSelectedTable={onChangeSelectedTable}
            selectedTable={selectedTable}
          />
        </div>
        <div className="border w-full"></div>
        {isLoading && <h3>Loading...</h3>}
        {error && <h3 className="text-red-500 text-sm">{error}</h3>}
        {table && table}
        {successNotification.isShowing && (
          <Notification className="w-full h-full" />
        )}
      </div>
    </Container>
  );
}

export default QuestionManagement;
