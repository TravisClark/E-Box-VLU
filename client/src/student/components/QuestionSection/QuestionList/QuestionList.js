import React from "react";

const DUMMY_QLIST = [
  { id: "q1", description: "Hoc Phi" },
  { id: "q2", description: "Hoc Phi" },
  { id: "q3", description: "Hoc Phi" },
  { id: "q4", description: "Hoc Phi" },
];

function QuestionList() {
    const qlist = DUMMY_QLIST.map(q => <li className={`border bg-white px-6 py-4`} key={q.id}>{q.description}</li>)
  return (
    <div className="absolute top-0 flex flex-col  translate-y-1/2 translate-x-1/2 space-y-6">
      <h1 className="text-white font-semibold uppercase rounded-sm">Danh Mục</h1>
      <ul className="flex flex-col">
        {qlist}
      </ul>
    </div>
  );
}

export default QuestionList;
