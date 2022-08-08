import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Requests from "../../shared/api/Requests";
import useHttpClient from "../../shared/hooks/http-hook";
import { CommentList } from "../components/CommentSection/CommentList/CommentList";
import { Stars } from "../components/Stars/Stars";
import CircleIcon from "../components/UI/CircleIcon";
import Container from "../components/UI/Container";
import SquareIcon from "../components/UI/SquareIcon";
import TriangleIcon from "../components/UI/TriangleIcon";

export const QuestionDetail = () => {
  const params = useParams();
  const [question, setQuestion] = useState({});
  const [dates, setDates] = useState([]);
  const [stars, setStars] = useState([]);
  const { sendRequest } = useHttpClient();
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `${Requests.fetchQuestionDetail}${params.questionId}`
      );
      setQuestion(response);
      setStars(response.members_star);
      const { createdAt, approvedAt, responsedAt } = response;
      setDates({
        createDate: new Date(createdAt).toDateString(),
        approveDate: new Date(approvedAt).toDateString(),
        responseDate: new Date(responsedAt).toDateString(),
      });
    };
    fetchData();
  }, [params.questionId, sendRequest, refresh]);

  return (
    <Container
      className="min-w-full relative flex flex-col items-center pb-28 min-h-screen"
      style={{ background: "#eaeaea" }}
    >
      <div className="absolute w-full justify-center overflow-hidden z-0 flex">
        <CircleIcon className="hidden md:block" />
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

      {/* Form */}
      <div className="flex relative rounded-lg space-y-8 flex-col w-full py-6 text-sm px-8 translate-y-20 bg-white drop-shadow-md sm:w-10/12 md:m-auto md:border md:h-fit md:max-w-xl lg:max-w-3xl">
        <div className="flex flex-col p-3 space-y-6 border-black rounded-lg md:border md:px-6">
          <div className="flex flex-col space-y-4 ">
            <div className="flex justify-between">
              <div className="flex flex-col space-y-4 md:space-y-0">
                <span className="text-xl break-words">{question.question}</span>
                <span className="text-md break-words text-gray-500">
                  Đã hỏi vào {dates.createDate}
                </span>
              </div>
              <Stars stars={stars} id_question={params.questionId} refreshHandler={() => setRefresh(prevState => !prevState)}/>
            </div>
            <div className="h-full">
              <span className="text-blue-500 p-2 bg-blue-200 w-fit rounded-lg">
                {question.username_questioner}
              </span>
            </div>
          </div>
          <div className="border"></div>
          <div className="bg-gray-200 p-4 text-black rounded-sm break-words">
            {question.answer}
          </div>
          <div className="flex flex-col items-end space-y-4 text-sm md:flex-row md:space-x-4 md:space-y-0 md:justify-end">
            <div className="flex flex-col text-left p-2 rounded">
              <span className="text-blue-500">
                {question.username_approver}
              </span>
              <span>Duyệt, {dates.approveDate}</span>
            </div>
            <div className="flex flex-col text-left p-2 rounded bg-blue-200">
              <span className="text-blue-500">
                {question.username_respondent}
              </span>
              <span>Trả lời, {dates.responseDate}</span>
            </div>
          </div>
        </div>

        <CommentList id_question={params.questionId} />
      </div>
    </Container>
  );
};
