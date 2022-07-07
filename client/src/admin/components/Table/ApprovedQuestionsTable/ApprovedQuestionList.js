import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import { uiActions } from "../../../../shared/store/ui-slice";

export const ApprovedQuestionList = (props) => {
  const dispatch = useDispatch();
  const {currentItems} = useSelector((state) => state.page.pagination)
  
  const onRepliedHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        message: value.question,
        data: value,
        request: {
          url: Requests.replyQuestion,
          method: "PATCH",
          body: null,
          headers: { "Content-Type": "application/json" },
        },
        successMessage: 'Trả lời thành công!',
        type:'Reply form'
      })
    );
  };
  const questions = currentItems.map((question, index) => (
    <tr key={question._id}>
      <td className="py-2 px-4">{++index}</td>
      <td className="py-2 px-4"><div className="truncate w-96">{question.question}</div></td>
      <td className="py-2 px-4">{question.createdAt}</td>
      <td className="py-2 px-4">{question.type_name}</td>
      <td className="py-2 px-4"><button onClick={onRepliedHandler.bind(null, question)}>Trả lời</button></td>
    </tr>
  ));
  return <tbody>
  {questions.length > 0 ? (
    questions
  ) : (
    <tr>
      <td>There is no question in this list</td>
    </tr>
  )}
</tbody>;
};
