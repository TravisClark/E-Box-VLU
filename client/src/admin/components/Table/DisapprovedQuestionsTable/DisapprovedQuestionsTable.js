import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Pagination } from '../../../../shared/components/Pagination/Pagination';
import { pageActions } from '../../../../shared/store/page-slice';
import { DisapprovedQuestionList } from './DisapprovedQuestionsList';

const headItem = ["No", "Câu hỏi", "Người từ chối", 'Thao tác'];

export const DisapprovedQuestionsTable = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const questions = props.questions.filter(
      (question) => question.status === "Đã bị từ chối"
    );
    dispatch(
      pageActions.setCurrentItems({
        items: questions,
        itemsPerPage: 1,
        currentPage: 1,
      })
    );
  }, [dispatch, props.questions]);

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
          <DisapprovedQuestionList/>
        </table>
        <Pagination/>
      </div>
    </>
  );
}
export const TableHeadItems = ({ item }) => <td className="py-2 px-4">{item}</td>;


