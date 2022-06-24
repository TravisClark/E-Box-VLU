import React from "react";
import Container from "../../UI/Container";
import Wave from "../../../assets/wave.svg";
import classes from "./QuestionSection.module.css";
import QuestionList from "./QuestionList/QuestionList";
function QuestionSection() {
  return (
    <section id="question">
      <Container className="min-w-full relative">
        {/* <div className={`${classes.spacer} ${classes.layer1}`}></div> */}
        <svg
          id="visual"
          viewBox="0 0 100% 540"
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
        <QuestionList/>
      </Container>
    </section>
  );
}

export default QuestionSection;
