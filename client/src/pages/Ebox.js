import React from "react";
import Description from "../components/Student/Description/Description";
import IntroContent from "../components/Student/IntroContent/IntroContent";
import IntroductionBanner from "../components/Student/IntroductionBanner/IntroductionBanner";
import Services from "../components/Student/Services/Services";

function Ebox() {
  return (
    <>
      <IntroductionBanner><IntroContent/></IntroductionBanner>
      <Services />
      <Description/>
    </>
  )
}

export default Ebox