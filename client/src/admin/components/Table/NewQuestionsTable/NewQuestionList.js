import React from "react";
import { useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";

function NewQuestionList(props) {
  const { account } = useSelector(state => state.auth);
  const { sendRequest } = useHttpClient();

  const onApproveHandler = async (value) => {
    const {id_question} = value;
    await sendRequest(
      Requests.approveQuestion,
      "PATCH",
      JSON.stringify({ username: account.username, id_question }),
      { "Content-Type": "application/json"}
    );
  };

  const onRejectHandler = async(value)=>{
    // const {id_question} = value;
    // await sendRequest(
    //   Requests.approveQuestion,
    //   "PATCH",
    //   JSON.stringify({ username: account.username, id_question }),
    //   { "Content-Type": "application/json"}
    // );
    // console.log('pass')
  }
  
  const questions = props.questions.map((question, index) => (
    <tr key={question._id}>
      <td className="py-2 px-4">{++index}</td>
      <td className="py-2 px-4">{question.question}</td>
      <td className="py-2 px-4">
        <button onClick={() => onApproveHandler(question)}>Duyệt</button>
      </td>
      <td className="py-2 px-4">
        <button onClick={() => onRejectHandler(question)}>Từ chối</button>
      </td>
    </tr>
  ));
  return <tbody>{questions}</tbody>;
}

export default NewQuestionList;
