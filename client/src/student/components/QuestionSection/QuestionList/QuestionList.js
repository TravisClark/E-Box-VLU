import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Requests from "../../../../shared/api/Requests";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { pageActions } from "../../../../shared/store/page-slice";
import classes from "./QuestionList.module.css";
function QuestionList() {
  // const [typeList, setTypeList] = useState()
  const { account } = useSelector((state) => state.auth);
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const history = useHistory();
  const { selectedType, isSearching, itemSearching, newSortType } = useSelector(
    (state) => state.item
  );

  useEffect(() => {
    try {
      const request = async () => {
        const response = await sendRequest(Requests.fetchQuestionListUser);
        // const repliedQuestions = response.filter(
        //   (res) => res.status === "Đã được trả lời"
        // );
        const sortedQuestions = response.filter(
          (question) =>
            question.question
              .toLowerCase()
              .includes(itemSearching.toLowerCase()) &&
            question.type_name.includes(newSortType)
        );
        dispatch(
          pageActions.setCurrentItems({
            items: newSortType === "Tất cả" ? response : sortedQuestions,
            itemsPerPage: 10,
            currentPage: 1,
          })
        );
      };
      request();
    } catch (error) {}
  }, [
    sendRequest,
    dispatch,
    selectedType,
    isSearching,
    itemSearching,
    newSortType,
    account.token,
  ]);

  const onStoreSelectedItem = (selectedItem) => {
    dispatch(pageActions.storeItemSelected(selectedItem));
    history.push(`/E-boxVLU/Home/question/${selectedItem.id_question}`);
  };

  const typeList = currentItems.map((item, index) => (
    <li
      className={`bg-lightBlue px-6 py-3 text-white truncate`}
      value={item.question}
      key={item.id_question}
      onClick={onStoreSelectedItem.bind(null, item)}
    >
      {`${index + 1}. ${item.question}`}
    </li>
  ));

  return (
    <section id="questions">
      <div className="flex flex-col space-y-6 items-center">
        <h1 className=" font-semibold uppercase text-white">
          Câu Hỏi Theo Danh Mục
        </h1>
        <div className={``}>
          <ul className={`flex flex-col space-y-0.5 ${classes.item}`}>
            {typeList.length > 0 ? (
              typeList
            ) : (
              <div className="w-full bg-white p-4 rounded-md drop-shadow-lg">
                <h1>Không tìm thấy câu hỏi!</h1>
              </div>
            )}
          </ul>
        </div>

        {typeList.length > 0 && (
          <Pagination
            prevBtn="Previous"
            nextBtn="Next"
            activeBtnStyle="bg-lightBlue text-white rounded"
            containerStyle="bg-white py-2 px-6 rounded text-gray-400 drop-shadow-lg lg:w-fit"
            disabledBtnStyle="opacity-50"
          />
        )}
      </div>
    </section>
  );
}

export default QuestionList;
