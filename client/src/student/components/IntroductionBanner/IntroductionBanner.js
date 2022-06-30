import React from "react";
import introVideo from "../../../assets/[VLU] VAN LANG UNIVERSITY CAMPUS TOUR _ 2021 (online-video-cutter.com).mp4";
import Container from "../UI/Container";

import classes from "./IntroductionBanner.module.css";

function IntroductionBanner(props) {
  return (
    <section id="Introduction">
      <Container className="relative min-w-full min-h-fit z-0">
        <video
          className="hidden min-w-full min-h-full md:block"
          src={introVideo}
          autoPlay
          playsInline
          muted
          loop
        ></video>
        {/* <img alt='' src={universityIcon} className="bg-cover md:hidden"/> */}
        <div className={`${classes.bannerBg} relative md:hidden`}/>
        <div
          className={`${classes.model} min-w-full min-h-full absolute top-0`}
        ></div>
        {props.children}
      </Container>
    </section>
  );
}

export default IntroductionBanner;
