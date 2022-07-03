import React from "react";

export const DisapprovedQuestionList = (props) => {
  const questions = props.questions.map((question, index) => (
    <tr key={question._id}>
      <td className="py-2 px-4">{++index}</td>
      <td className="py-2 px-4">{question.question}</td>
      <td className="py-2 px-4">{question.user_name_answer}</td>
      <td className="py-2 px-4 underline">Khôi phục</td>
    </tr>
  ));
  return <tbody>{questions}</tbody>;
};
