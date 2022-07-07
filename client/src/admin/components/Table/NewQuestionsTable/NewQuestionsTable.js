import React, { useEffect} from "react";
import NewQuestionList from "./NewQuestionList";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../../../shared/store/page-slice";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
const headItem = [
  "No",
  "Câu hỏi",
  "Thời gian tạo",
  "Danh mục",
  "Duyệt",
  "Từ chối",
];

function TableQuestionList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const questions = props.questions.filter(
      (question) => question.status === "Chưa được duyệt"
    );
    dispatch(
      pageActions.setCurrentItems({
        items: questions,
        itemsPerPage: 1,
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
              {headItem.map((item) => (
                <TableHeadItems item={item} key={item} />
              ))}
            </tr>
          </thead>
          {/* <div className="border min-w-full"></div> */}
          <NewQuestionList/>
        </table>
        <Pagination/>
      </div>
    </>
  );
}

const TableHeadItems = ({ item }) => <td className="py-2 px-4">{item}</td>;

export default TableQuestionList;
