import React from "react";

export const ListQuestions = ({ listQuestions }) => {

  return (
    <ul
      className={`flex flex-col space-y-2 overflow-hidden hover:overflow-auto`}
      style={{ maxHeight: "500px" }}
    >
      {listQuestions.map((question) => (
        <li className="break-all border-b-2 border-b-slate-100 p-3" key={question._id}>
          <div className="flex justify-between items-center">
            <span className='w-10/12'>{question.question}</span>
            <div className="rating flex space-x-2  bg-slate-100 h-fit py-1 px-2 justify-center rounded-md cursor-pointer group">
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="scale-75 fill-orange-400"
                >
                  <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                </svg>
                <span className="h-full font-medium text-md mt-0.5">
                  {question.members_star.length}
                </span>
              </>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
