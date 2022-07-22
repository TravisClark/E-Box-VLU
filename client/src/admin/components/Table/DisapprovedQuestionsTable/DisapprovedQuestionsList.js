import React from "react";
import { useSelector } from "react-redux";
import useHttpClient from "../../../../shared/hooks/http-hook";

export const DisapprovedQuestionList = (props) => {
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { isLoading } = useHttpClient();
  const questions = currentItems.map((question, index) => {
    const date = new Date(question.createdAt);
    const dateTranslate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    const formatDate = `${dateTranslate.day}/${dateTranslate.month}/${dateTranslate.year}`;
    return (
      <tr key={question._id}>
        <td className="py-2 px-4">{++index}</td>
        <td className="py-2 px-4">
          <div className="break-words w-96">{question.question}</div>
        </td>
        <td className="py-2 px-4">{formatDate}</td>
        <td className="py-2 px-4">{question.username_approver}</td>
        <td className="py-2 px-4">{question.type_name}</td>
        <td className="py-2 px-4 underline">Khôi phục</td>
      </tr>
    );
  });
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : questions.length > 0 ? (
        questions
      ) : (
        <tr>
          <td className="py-2 px-4">There is no question in this list</td>
        </tr>
      )}
    </tbody>
  );
};
