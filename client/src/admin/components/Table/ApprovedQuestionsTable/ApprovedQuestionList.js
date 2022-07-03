import React from "react";

export const ApprovedQuestionList = (props) => {
  const questions = props.questions.map((question, index) => (
    <tr key={question._id}>
      <td className="py-2 px-4">{++index}</td>
      <td className="py-2 px-4">{question.question}</td>
      <td className="py-2 px-4">Trả Lời</td>
    </tr>
  ));
  return <tbody>{questions}</tbody>;
};
