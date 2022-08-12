import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingList } from "../../../../shared/api/LoadingList";
import Requests from "../../../../shared/api/Requests";
import { LoadingDot } from "../../../../shared/components/LoadingDot/LoadingDot";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { pageActions } from "../../../../shared/store/page-slice";
import { uiActions } from "../../../../shared/store/ui-slice";
import classes from "./QuestionList.module.css";
function QuestionList() {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionsDisplay, setQuestionsDisplay] = useState([]);
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isSpinnerLoading, loadingType } = useSelector((state) => state.ui);
  const history = useHistory();
  const { itemSearching, newSortType } = useSelector((state) => state.item);

  useEffect(() => {
    try {
      const request = async () => {
        const response = await sendRequest(
          LoadingList.fetchQuestionListUser,
          Requests.fetchQuestionListUser
        );
        setQuestions(response);
        dispatch(uiActions.setSpinnerState({ type: "DONE" }));
      };
      request();
    } catch (error) {}
  }, [sendRequest, dispatch]);

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
  }, [newSortType, itemSearching, questions]);

  useEffect(() => {
    dispatch(
      pageActions.setCurrentItems({
        items: questionsDisplay,
        itemsPerPage: 10,
        currentPage: 1,
      })
    );
  }, [questionsDisplay, dispatch]);

  const onStoreSelectedItem = useCallback(
    (selectedItem) => {
      dispatch(pageActions.storeItemSelected(selectedItem));
      history.push(`/E-boxVLU/Home/question/${selectedItem.id_question}`);
    },
    [dispatch, history]
  );

  useEffect(() => {
    let arr = [];
    if (currentItems.length > 0) {
      for (let i = 0; i < currentItems.length; i++) {
        let item = (
          <li
            className={`bg-lightBlue px-6 py-3 text-white truncate cursor-pointer hover:bg-blue-700`}
            value={currentItems[i]?.question}
            key={currentItems[i]?.id_question}
            onClick={onStoreSelectedItem.bind(null, currentItems[i])}
          >
            {`${i + 1}. ${currentItems[i]?.question}`}
          </li>
        );
        arr.push(item);
      }
      if (currentItems.length > 5) {
        setFirstList(arr.slice(0, 5));
        setSecondList(arr.slice(5, currentItems.length));
      } else {
        setFirstList(arr);
        setSecondList([]);
      }
      arr = [];
    }
  }, [currentItems, onStoreSelectedItem]);

  return (
    <section id="questions">
      <div className="flex flex-col space-y-6 items-center w-screen">
        <h1 className=" font-semibold uppercase text-white">
          Câu Hỏi Theo Danh Mục
        </h1>
        <div
          className={`flex flex-col space-y-0.5 xl:flex-row xl:space-x-10 xl:justify-center xl:space-y-0`}
        >
          {currentItems.length !== 0 && (
            <ul className={`flex flex-col space-y-0.5 ${classes.item}`}>
              {firstList}
            </ul>
          )}
          {currentItems.length > 5 && (
            <ul className={`flex flex-col space-y-0.5 ${classes.item}`}>
              {secondList}
            </ul>
          )}
          {currentItems.length === 0 && !isSpinnerLoading && (
            <div className="w-96 bg-white p-4 rounded-md drop-shadow-lg">
              <h1>Không tìm thấy câu hỏi!</h1>
            </div>
          )}
          {isSpinnerLoading &&
            loadingType === LoadingList.fetchQuestionListUser && (
              <div className="h-28 flex justify-center items-center">
                <LoadingDot className="m-auto" color="#fff" />
              </div>
            )}
        </div>

        {currentItems.length > 0 && (
          <Pagination
            activeBtnStyle="bg-lightBlue text-white rounded"
            containerStyle="bg-white py-2 px-6 rounded text-gray-400 drop-shadow-lg xl:max-w-fit"
            disabledBtnStyle="opacity-50"
          />
        )}
      </div>
    </section>
  );
}

export default QuestionList;
