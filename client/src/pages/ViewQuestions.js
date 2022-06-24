import React from "react";
import IntroductionBanner from "../components/Student/IntroductionBanner/IntroductionBanner";
import QuestionSection from "../components/Student/QuestionSection/QuestionSection";
import SearchQuestionContent from "../components/Student/SearchQuestionContent/SearchQuestionContent";

function ViewQuestions() {
  return (
    <>
      <IntroductionBanner>
        <SearchQuestionContent />
      </IntroductionBanner>
      <QuestionSection />
    </>
  );
}

export default ViewQuestions;
