import React from "react";
import StudentFooter from '../Footer/Footer'
import StudentNavbar from '../StudentNav/StudentNav'
export const StudentLayout = (props) => {
  return (
    <>
      <StudentNavbar />
      {props.children}
      <StudentFooter />
    </>
  );
};
