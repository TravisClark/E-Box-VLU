import React, { useState } from "react";
const tableOptions = [
  "Câu hỏi chưa được duyệt",
  "Câu hỏi bị từ chối",
  "Câu hỏi đã được duyệt",
  "Câu hỏi đã được trả lời",
];
export const ListCellInfo = ({ questions, colors, questionTypes }) => {
  const items = questions.map((question, index) => (
    <li className="border-b-2 border-slate-100 py-3">
      {console.log(question)}
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <span className="font-semibold">{question.name}</span>
          <span className="opacity-70">Tổng: {question.value} (?)</span>
        </div>
        <div
          className={`w-8 h-8 rounded-md`}
          style={{ backgroundColor: `${colors[index]}` }}
        ></div>
      </div>
    </li>
  ));
  return <ul className="flex flex-col space-y-2">{items}</ul>;
};
