import React, { useEffect} from "react";
import NewQuestionList from "./NewQuestionList";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../../../shared/store/page-slice";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { UpArrow } from "../../../../shared/components/UpArrow/UpArrow";
import { DownArrow } from "../../../../shared/components/DownArrow/DownArrow";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
const headItem = [
  "No",
  "Câu hỏi",
  "Ngày tạo",
  "Danh mục",
  "Duyệt",
  "Từ chối",
];

function TableQuestionList(props) {
  const dispatch = useDispatch();
  const {currentItems} = useSelector((state) => state.page.pagination)
  useEffect(() => {
    const questions = props.questions.filter(
      (question) => question.status === "Chưa được duyệt"
    );
    dispatch(
      pageActions.setCurrentItems({
        items: questions,
        itemsPerPage: 10,
        currentPage: 1,
      })
    );
  }, [dispatch, props.questions])

  return (
    <>
      <div className="flex flex-col w-full table-auto">
        <table className="table-auto">
          <thead>
            <tr className="font-bold bg-gray-100">
            <td className="py-2 px-4">{headItem[0]}</td>
              <td className="py-2 px-4">{headItem[1]}</td>
              <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
                {headItem[2]}
                <div className="flex flex-col ">
                  <UpArrow />
                  <DownArrow />
                </div>
              </td>
              <td className="py-2 px-4">
                <QuestionType />
              </td>
              <td className="py-2 px-4">{headItem[4]}</td>
              <td className="py-2 px-4">{headItem[5]}</td>
            </tr>
          </thead>
          {/* <div className="border min-w-full"></div> */}

          <NewQuestionList/>
        </table>
        {currentItems.length > 0 && <Pagination/>}
      </div>
    </>
  );
}


export default TableQuestionList;
