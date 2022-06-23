import React from "react";
import Button from "../../UI/Button";

function SearchQuestionContent() {
  return (
    <form>
      <div className="absolute flex flex-col min-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center  md:max-w-4xl sm:max-w-xl">
        <h1 className="text-white font-bold text-2xl md:text-4xl">
          Danh sách câu hỏi
        </h1>
        <div className="flex flex-col space-y-8 w-full max-w-3xl p-14 md:flex-row md:space-y-0 md:w-full">
          <input
            type="text"
            className="bg-transparent text-white outline-none rounded-md p-4 w-full  border border-gray-300 md:rounded-none"
          />
          <Button
            title="Tìm kiếm"
            className="bg-black text-white mx-auto px-8 w-fit whitespace-nowrap hover:bg-white hover:text-black transition md:rounded-none md:-translate-x-2"
          />
        </div>
      </div>
    </form>
  );
}

export default SearchQuestionContent;
