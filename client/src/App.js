import React from "react";
import Description from "./components/Student/Description/Description";
import Footer from "./components/Student/Footer/Footer";
import IntroductionBanner from "./components/Student/IntroductionBanner/IntroductionBanner";
import Navbar from "./components/Student/Navbar/Navbar";
import Services from "./components/Student/Services/Services";

function App() {
  return (
    <>
      <Navbar />
      <IntroductionBanner />
      <Services />
      <Description/>
      <Footer />
    </>
  );
}

export default App;
