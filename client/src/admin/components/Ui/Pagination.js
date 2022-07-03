import React from "react";

export const Pagination = ({ questionsPerPage, totalQuestions, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="w-full flex justify-center mb-8 mt-12 space-x-2">
        {pageNumbers.map((number) => (
          <li key={number} className="w-fit">
            <div onClick={() => paginate(number)} className='w-8 h-8 text-center pt-1 rounded-full transition duration-300 cursor-pointer hover:bg-slate-200 focus:bg-black'>{number}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
