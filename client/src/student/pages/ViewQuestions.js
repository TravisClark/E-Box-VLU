import React, { useEffect } from "react";
import { useState } from "react";
import { Notification } from "../../shared/components/UI/Notification";
import IntroductionBanner from "../components/IntroductionBanner/IntroductionBanner";
import QuestionForm from "../components/QuestionSection/QuestionForm";
import QuestionList from "../components/QuestionSection/QuestionList/QuestionList";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";

function ViewQuestions() {
  const [isQFormOpen, setIsQFormOpen] = useState(false);
  const [isShowingNotification, setIsShowingNotification] = useState(false);

  const onToggleFormHandler = () => {
    setIsQFormOpen((prevState) => !prevState);
  };

  const onShowNotificationHandler = () => {
    setIsShowingNotification(true);
  };

  useEffect(() => {
    if (isShowingNotification) {
      setTimeout(() => {
        setIsShowingNotification(false);
      }, 3000);
    }
  }, [isShowingNotification]);

  return (
    <>
      <IntroductionBanner>
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
              <Button className="bg-black text-white mx-auto px-8 w-fit whitespace-nowrap hover:bg-white hover:text-black transition md:rounded-none md:-translate-x-2">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </form>
      </IntroductionBanner>
      <section id="question">
        <Container className="min-w-full relative flex flex-col">
          {/* <div className={`${classes.spacer} ${classes.layer1}`}></div> */}
          <svg
            id="visual"
            // viewBox="0 0 100% 540"
            width="100%"
            height="540"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <rect x="0" y="0" width="100%" height="540" fill="#0060FF"></rect>
            <path
              d="M0 385L47.2 392.7C94.3 400.3 188.7 415.7 283 420C377.3 424.3 471.7 417.7 566 409.8C660.3 402 754.7 393 848.8 401.7C943 410.3 1037 436.7 1131.2 446.3C1225.3 456 1319.7 449 1414 440.2C1508.3 431.3 1602.7 420.7 1697 413.2C1791.3 405.7 1885.7 401.3 1932.8 399.2L1980 397L1980 541L1932.8 541C1885.7 541 1791.3 541 1697 541C1602.7 541 1508.3 541 1414 541C1319.7 541 1225.3 541 1131.2 541C1037 541 943 541 848.8 541C754.7 541 660.3 541 566 541C471.7 541 377.3 541 283 541C188.7 541 94.3 541 47.2 541L0 541Z"
              fill="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </svg>
          <QuestionList />
          <button
            className="bg-black text-white px-4 mb-10 mx-auto  py-3 font-semibold rounded"
            onClick={onToggleFormHandler}
          >
            Đặt câu hỏi
          </button>
          {isQFormOpen && <QuestionForm onCloseForm={onToggleFormHandler} onShowNotification={onShowNotificationHandler} />}
          {isShowingNotification && (
            <Notification
              message="Đặt câu hỏi thành công"
              className="w-full h-full"
            />
          )}
        </Container>
      </section>
    </>
  );
}

export default ViewQuestions;
