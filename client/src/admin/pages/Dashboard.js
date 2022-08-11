import React, { useEffect, useState } from "react";
import Container from "../../student/components/UI/Container";
import { Chart } from "../components/Chart/PieChart";
import { BarCharts } from "../components/Chart/BarCharts";
import useHttpClient from "../../shared/hooks/http-hook";
import { LoadingList } from "../../shared/api/LoadingList";
import Requests from "../../shared/api/Requests";
import { ListQuestions } from "../components/Chart/ListQuestions";
import { LoadingDot } from "../../shared/components/LoadingDot/LoadingDot";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../shared/store/ui-slice";

const questionTypes = {
  unchecked: "unchecked",
  refused: "refused",
  approved: "approved",
  answered: "answered",
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Dashboard() {
  const { sendRequest } = useHttpClient();
  const [questions, setQuestions] = useState({
    unchecked: "",
    refused: "",
    answered: "",
    approved: "",
  });
  const [listQuestions, setListQuestions] = useState([]);
  const [valuesOfChart, setValuesOfChart] = useState([]);
  const { loadingType } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        LoadingList.fetchStatistics,
        Requests.fetchStatistics
      );
      const { unchecked, refused, answered, approved, charts } = response;
      console.log(response);
      // console.log(unchecked + refused + answered + approved)
      const array = [
        { name: questionTypes.unchecked, value: unchecked },
        { name: questionTypes.refused, value: refused },
        { name: questionTypes.approved, value: approved },
        { name: questionTypes.answered, value: answered },
      ];
      setValuesOfChart(array);
      setQuestions({ unchecked, refused, answered, approved });
      setListQuestions(charts);
      dispatch(uiActions.setSpinnerState({ type: "DONE" }));
    };
    request();
  }, [sendRequest, dispatch]);

  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 bg-transparent space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Thống kê</h1>
      </div>
      {loadingType === LoadingList.fetchStatistics && (
        <div className="h-96 bg-white flex justify-center items-center">
          <LoadingDot />
        </div>
      )}
      {!loadingType && (
        <div className="flex space-x-20">
          <div className="flex flex-col w-96 rounded-md bg-white p-6">
            <span className="font-bold text-xl text-center">Câu hỏi</span>
            <Chart valuesOfChart={valuesOfChart} colors={COLORS} />
            <ul className="flex flex-col space-y-2">
              <li className="border-b-2 border-slate-100 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold">
                      Câu hỏi chưa được duyệt
                    </span>
                    <span className="opacity-70">
                      Tổng: {questions.unchecked} (?)
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-md`}
                    style={{ backgroundColor: `${COLORS[0]}` }}
                  ></div>
                </div>
              </li>
              <li className="border-b-2 border-slate-100 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold">Câu hỏi đã được duyệt</span>
                    <span className="opacity-70">
                      Tổng: {questions.approved} (?)
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-md`}
                    style={{ backgroundColor: `${COLORS[2]}` }}
                  ></div>
                </div>
              </li>
              <li className="border-b-2 border-slate-100 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold">Câu hỏi đã bị từ chối</span>
                    <span className="opacity-70">
                      Tổng: {questions.refused} (?)
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-md`}
                    style={{ backgroundColor: `${COLORS[1]}` }}
                  ></div>
                </div>
              </li>
              <li className="border-b-2 border-slate-100 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold">Câu hỏi đã trả lời</span>
                    <span className="opacity-70">
                      Tổng: {questions.answered} (?)
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-md`}
                    style={{ backgroundColor: `${COLORS[3]}` }}
                  ></div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col rounded-md bg-white p-6 h-auto space-y-3 w-full">
            <span className="font-bold text-xl text-center">Câu hỏi</span>
            <ListQuestions listQuestions={listQuestions} />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Dashboard;
