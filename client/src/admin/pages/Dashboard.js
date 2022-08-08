import React from "react";
import Container from "../../student/components/UI/Container";
import { Chart } from "../components/Chart/PieChart";
import { BarCharts } from "../components/Chart/BarCharts";

function Dashboard() {

  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 bg-transparent space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Thống kê</h1>
      </div>
      {/* <div className="flex space-x-10">
        <div className="stat w-96 bg-white rounded-md space-y-3">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="font-semibold text-lg">Câu hỏi chưa duyệt</div>
          <div className="font-semibold text-lg">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
      </div> */}
      <div className="flex space-x-20">
        <div className="flex flex-col w-96 rounded-md bg-white p-6">
          <span className="font-bold text-xl text-center">Câu hỏi</span>
          <Chart />
          <ul className="flex flex-col space-y-2">
            <li className="border-b-2 border-slate-100 py-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">Câu hỏi chưa được duyệt</span>
                  <span className="opacity-70">Tổng: 33 (?)</span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
              </div>
            </li>
            <li className="border-b-2 border-slate-100 py-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">Câu hỏi chưa được duyệt</span>
                  <span className="opacity-70">Tổng: 33 (?)</span>
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-md"></div>
              </div>
            </li>
            <li className="border-b-2 border-slate-100 py-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">Câu hỏi chưa được duyệt</span>
                  <span className="opacity-70">Tổng: 33 (?)</span>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-md"></div>
              </div>
            </li>
            <li className="border-b-2 border-slate-100 py-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">Câu hỏi chưa được duyệt</span>
                  <span className="opacity-70">Tổng: 33 (?)</span>
                </div>
                <div className="w-8 h-8 bg-amber-500 rounded-md"></div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col rounded-md bg-white p-6 h-fit">
          <BarCharts />
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
