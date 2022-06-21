import React from "react";
import introVideo from "../../../assets/[VLU] VAN LANG UNIVERSITY CAMPUS TOUR _ 2021 (online-video-cutter.com).mp4";
import Container from "../../UI/Container";
import classes from "./IntroductionBanner.module.css";
import vluIcon from "../../../assets/u48.png";
import Button from '../../UI/Button'
function IntroductionBanner() {
  return (
    <section id="Introduction">
      <Container className="relative min-w-full min-h-fit m-0 p-0 z-0">
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
        <div className="absolute flex flex-col w-full p-4 space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center sm:p-20 md:max-w-4xl sm:max-w-xl">
          <img src={vluIcon} alt="" className="w-10" />
          <h1 className="text-white font-bold text-xl  md:text-4xl">
            Xin chào, Tôi là hộp thư góp ý Khoa CNTT
          </h1>
          <h3 className="text-white text-sm md:text-xl">
            Nếu bạn cần đặt câu hỏi hoặc tham khảo các vấn đề xảy ra, bạn có thể
            đăng nhập ngay để được hỗ trợ!
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className={classes.downArrow}
          >
            <path fill='#fff' d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
          </svg>
          <Button title='Đăng Nhập' className='bg-black text-white hover:bg-white hover:text-black transition'/>
        </div>
      </Container>
    </section>
  );
}

export default IntroductionBanner;
