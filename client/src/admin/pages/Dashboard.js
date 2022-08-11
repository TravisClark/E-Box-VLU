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
import { ListCellInfo } from "../components/Chart/ListCellInfo";

const questionTypes = {
  unchecked: "unchecked",
  refused: "refused",
  approved: "approved",
  answered: "answered",
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const listColors = [
  "#0984e3",
  "#6c5ce7",
  "#ffb142",
  "#e84393",
  "#00cec9",
  "#706fd3",
];

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
  const [listQuestionType, setListQuestionType] = useState([]);
  const { loadingType } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const response = await sendRequest(
        LoadingList.fetchStatistics,
        Requests.fetchStatistics
      );
      const {
        unchecked,
        refused,
        answered,
        approved,
        charts,
        CTDT,
        CauHoiKhac,
        HocBong,
        HocPhan,
        HocPhi,
        HuongNghiep,
      } = response;
      console.log(response);
      // console.log(unchecked + refused + answered + approved)
      const chartValues = [
        { name: "Câu hỏi chưa được duyệt", value: unchecked },
        { name: "Câu hỏi bị từ chối", value: refused },
        { name: "Câu hỏi đã được duyệt", value: approved },
        { name: "Câu hỏi đã được trả lời", value: answered },
      ];
      const listTypeValues = [
        { name: "Chương trình đào tạo", value: CTDT },
        { name: "Câu hỏi khác", value: CauHoiKhac },
        { name: "Học bổng", value: HocBong },
        { name: "Học phần", value: HocPhan },
        { name: "Học phí", value: HocPhi },
        { name: "Hướng nghiệp", value: HuongNghiep },
      ];
      setValuesOfChart(chartValues);
      setQuestions({ unchecked, refused, answered, approved });
      setListQuestions(charts);
      setListQuestionType(listTypeValues);
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
        <div className="flex flex-col space-y-4 items-center bg-slate-100">
          <div className="flex justify-evenly w-full bg-white">
            <div
              className="flex flex-col rounded-md  p-6 w-2/5"
            >
              <span className="font-bold text-xl text-center">Loại câu hỏi</span>
              <Chart valuesOfChart={valuesOfChart} colors={COLORS} />
              <ListCellInfo
                questions={valuesOfChart}
                colors={COLORS}
                questionTypes={questionTypes}
              />
            </div>

            <div
              className="flex flex-col rounded-md  p-6 w-2/5"
            >
              <span className="font-bold text-xl text-center">Câu hỏi theo danh mục</span>
              <Chart valuesOfChart={listQuestionType} colors={listColors} />
              <ListCellInfo
                questions={listQuestionType}
                colors={listColors}
                questionTypes={questionTypes}
              />
            </div>
          </div>
          <div className="flex flex-col rounded-md bg-white p-6 h-auto space-y-3 w-full">
            <span className="font-bold text-xl text-center">Top câu hỏi có nhiều lượt like</span>
            <ListQuestions listQuestions={listQuestions} />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Dashboard;
