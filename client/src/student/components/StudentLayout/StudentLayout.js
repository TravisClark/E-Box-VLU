import React from "react";
import StudentFooter from '../Footer/Footer'
import StudentNavbar from '../StudentNav/StudentNav'
export const StudentLayout = (props) => {
  return (
    <div className="flex flex-col">
      <StudentNavbar />
      {props.children}
      <StudentFooter />
    </div>
  );
};
