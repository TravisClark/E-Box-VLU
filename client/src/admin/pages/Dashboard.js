import React from "react";
import Container from "../../student/components/UI/Container";
// import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 bg-transparent">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Dashboard</h1>
      </div>
    </Container>
  );
}

export default Dashboard;
