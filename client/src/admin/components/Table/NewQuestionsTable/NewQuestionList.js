import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import { uiActions } from "../../../../shared/store/ui-slice";

function NewQuestionList() {
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);

  const onApproveHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          url: Requests.approveQuestion,
          method: "PATCH",
          body: JSON.stringify({
            username: account.username,
            id_question: value.id_question,
            type_name: value.type_name,
          }),
          headers: { "Content-Type": "application/json" },
        },
        successMessage: "Duyệt thành công!",
        type: "Approve form",
      })
    );
  };

  const onRejectHandler = async (value) => {
    // const {id_question} = value;
    // await sendRequest(
    //   Requests.approveQuestion,
    //   "PATCH",
    //   JSON.stringify({ username: account.username, id_question }),
    //   { "Content-Type": "application/json"}
    // );
    // console.log('pass')
  };

  const questions = currentItems.map((question, index) => {
    const date = new Date(question.createdAt);
    const dateTranslate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    const formatDate = `${dateTranslate.day}/${dateTranslate.month}/${dateTranslate.year}`;
    return (<tr key={question._id}>
      <td className="py-2 px-4">{++index}</td>
      <td className="py-2 px-4">
        <div className="truncate w-96">{question.question}</div>
      </td>
      <td className="py-2 px-4">{formatDate}</td>
      <td className="py-2 px-4">{question.type_name}</td>
      <td className="py-2 px-4">
        <button onClick={onApproveHandler.bind(null, question)}>Duyệt</button>
      </td>
      <td className="py-2 px-4">
        <button onClick={() => onRejectHandler(question)}>Từ chối</button>
      </td>
    </tr>);
  });
  return (
    <tbody>
      {questions.length > 0 ? (
        questions
      ) : (
        <tr>
          <td>There is no question in this list</td>
        </tr>
      )}
    </tbody>
  );
}

export default NewQuestionList;
