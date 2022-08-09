import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchItem } from "../../shared/components/SearchItem/SearchItem";
import { Notification } from "../../shared/components/UI/Notification";
import { Roles } from "../../shared/roles/roles";
import { uiActions } from "../../shared/store/ui-slice";
import MenuType from "../components/QuestionSection/MenuType/MenuType";
import QuestionForm from "../components/QuestionSection/QuestionForm";
import QuestionList from "../components/QuestionSection/QuestionList/QuestionList";
import { SearchingBackground } from "../components/SearchingBackground/SearchingBackground";
import CircleIcon from "../components/UI/CircleIcon";
import Container from "../components/UI/Container";
import SquareIcon from "../components/UI/SquareIcon";
import TriangleIcon from "../components/UI/TriangleIcon";

function ViewQuestions() {
  const dispatch = useDispatch();
  const [isQFormOpen, setIsQFormOpen] = useState(false);
  const { successNotification } = useSelector((state) => state.ui);
  const { account } = useSelector((state) => state.auth);
  const { currentItems } = useSelector((state) => state.page.pagination);

  const onToggleFormHandler = () => {
    setIsQFormOpen((prevState) => !prevState);
  };

  const onOpenFormHandler = async (value) => {
    dispatch(
      uiActions.showNotification({
        type: "PUBLISH_QUESTION_FORM",
      })
    );
  };

  return (
    <>
      <SearchingBackground>
        <div className="absolute flex flex-col min-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center -space-y-6 md:max-w-4xl sm:max-w-xl">
          <h1 className="text-white font-bold text-2xl mt-10 md:text-4xl">
            Danh sách câu hỏi
          </h1>
          <div className="flex flex-col space-y-8 w-full max-w-3xl p-14 md:flex-row md:space-y-0 md:w-full">
            <SearchItem className="bg-transparent text-white outline-none rounded-md p-4 w-full border border-gray-300 md:rounded-none" />
            <button className="bg-slate-800 text-white mx-auto py-4 px-8 w-fit whitespace-nowrap hover:bg-white hover:text-black transition md:rounded-none md:-translate-x-2">
              <a href="#scroll" >Tìm kiếm</a>
            </button>
          </div>
        </div>
      </SearchingBackground>
      <section id="question">
        <Container
          className="min-w-full relative flex flex-col items-center"
          style={{ background: "#eaeaea", minHeight: "500px" }}
        >
          <div className="absolute w-full flex justify-center overflow-hidden z-0 ">
            <CircleIcon className="hidden md:block" />
            <svg
              id="visual"
              width="100%"
              height="540"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className=""
            >
              <rect x="0" y="0" width="100%" height="540" fill="#0060FF"></rect>
              <path
                d="M0 385L47.2 392.7C94.3 400.3 188.7 415.7 283 420C377.3 424.3 471.7 417.7 566 409.8C660.3 402 754.7 393 848.8 401.7C943 410.3 1037 436.7 1131.2 446.3C1225.3 456 1319.7 449 1414 440.2C1508.3 431.3 1602.7 420.7 1697 413.2C1791.3 405.7 1885.7 401.3 1932.8 399.2L1980 397L1980 541L1932.8 541C1885.7 541 1791.3 541 1697 541C1602.7 541 1508.3 541 1414 541C1319.7 541 1225.3 541 1131.2 541C1037 541 943 541 848.8 541C754.7 541 660.3 541 566 541C471.7 541 377.3 541 283 541C188.7 541 94.3 541 47.2 541L0 541Z"
                fill="#eaeaea"
                strokeLinecap="round"
                strokeLinejoin="miter"
              ></path>
            </svg>
            <div className=" absolute top-0 left-0 justify-between min-w-full min-h-full hidden md:flex">
              <TriangleIcon />
              <SquareIcon />
            </div>
          </div>

          <div
            className={`flex flex-col min-w-full space-y-6 items-center z-10 py-10 ${
              currentItems.length < 5 &&
              "md:space-x-20 md:flex-row md:space-y-0 md:w-1/2 md:justify-center md:items-start"
            }`}
          >
            <div id='scroll'>
              <MenuType />
            </div>
            <QuestionList />
          </div>
          {!(
            account.role_name === Roles.admin ||
            account.role_name === Roles.supervisor ||
            account.role_name === Roles.assistant
          ) && (
            <button
              className="bg-black text-white px-4 mb-10 mx-auto py-3 z-10 font-semibold transition duration-300 rounded hover:bg-blue-800"
              onClick={onOpenFormHandler}
            >
              Đặt câu hỏi
            </button>
          )}
          {isQFormOpen && <QuestionForm onCloseForm={onToggleFormHandler} />}
          {successNotification.isShowing && (
            <Notification className="w-full h-full z-30" />
          )}
        </Container>
      </section>
    </>
  );
}

export default ViewQuestions;
