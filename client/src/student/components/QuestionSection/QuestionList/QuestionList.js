import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { pageActions } from "../../../../shared/store/page-slice";

function QuestionList() {
  // const [typeList, setTypeList] = useState()
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { selectedType, isSearching, itemSearching } = useSelector(
    (state) => state.question
  );
  console.log("1");
  useEffect(() => {
    try {
      const request = async () => {
        const response = await sendRequest(Requests.fetchQuestionList);
        const questions = response.filter(
          (question) =>
            question.question
              .toLowerCase()
              .includes(itemSearching.toLowerCase()) &&
            question.type_name === selectedType
        );
        dispatch(
          pageActions.setCurrentItems({
            items: questions,
            itemsPerPage: 5,
            currentPage: 1,
          })
        );
      };
      request();
    } catch (error) {}
  }, [sendRequest, dispatch, selectedType, isSearching, itemSearching]);

  const typeList = currentItems.map((item, index) => (
    <li
      className={`bg-lightBlue px-6 py-3 text-white truncate break-all max-w-xs sm:max-w-md md:max-w-lg`}
      value={item.question}
      key={item.id_question}
    >
      {`${index + 1}. ${item.question}`}
    </li>
  ));

  return (
    <section id="questions">
      <div className="flex flex-col space-y-6 items-center">
        <h1 className="text-white font-semibold uppercase rounded-sm">
          Câu Hỏi Theo Danh Mục
        </h1>
        <ul className="flex flex-col space-y-0.5 w-full">{typeList}</ul>
        <Pagination prevBtn="" nextBtn="" />
      </div>
    </section>
  );
}

export default QuestionList;
