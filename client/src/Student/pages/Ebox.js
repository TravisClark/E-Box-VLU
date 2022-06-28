import React, { useEffect } from "react";
import IntroContent from "../components/IntroContent/IntroContent";
import IntroductionBanner from "../components/IntroductionBanner/IntroductionBanner";
import likeIcon from "../../assets/like (1).png";
import teamIcon from "../../assets/team.png";
import clockIcon from "../../assets/clock (1).png";
import Container from "../components/UI/Container";
import descriptionIcon from "../../assets/description.jpg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TriangleIcon from "../components/UI/TriangleIcon";

function Ebox() {
  const history = useHistory();
  const {isLoggedIn} = useSelector(state => state.auth) 
  useEffect(() => {
    isLoggedIn && history.push('/E-boxVLU/Home')
  }, [isLoggedIn, history]);
  return (
    <>
      <IntroductionBanner>
        <IntroContent />
      </IntroductionBanner>
      <section id="services">
        <Container className="flex flex-col relative items-center min-w-full p-0 mb-20 space-y-6">
          <div className="absolute top-0 h-full w-full bg-heavyBlue xl:h-80 xl:-top-20 xl:rounded-xl xl:w-10/12">
            <TriangleIcon/>
          </div>
          <div className="flex flex-col space-y-6 mx-auto text-center text-white z-10">
            <h1 className="font-semibold">DỊCH VỤ</h1>
            <h1 className="font-bold text-2xl max-w-md">
              Luôn mang đến cho sinh viên nhiều lợi ích khác nhau
            </h1>
          </div>
          <div className="flex flex-col px-6 space-y-6 py-10 w-full items-center z-10 lg:flex-row lg:space-y-0 lg:justify-center lg:space-x-16">
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-12 rounded-xl drop-shadow-lg lg:h-80 lg:w-80">
              <img alt="" src={teamIcon} className="w-10" />
              <h1 className="font-bold text-center">LUÔN SẴN LÒNG HỖ TRỢ</h1>
              <h1>
                Luôn có đội ngũ nhân viên có năng lực sẵn sàng hỗ trợ trả lời
                câu hỏi
              </h1>
            </div>
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-6 rounded-xl drop-shadow-lg lg:h-80 lg:w-80">
              <img alt="" src={clockIcon} className="w-10" />
              <h1 className="font-bold text-center">
                Ở BẤT CỨ ĐÂU, BẤT KỲ LÚC NÀO
              </h1>
              <h1>
                Hộp thư góp ý khoa CNTT là nơi lưu trữ câu hỏi trực tuyến mà
                sinh viên đặt ra, có thể hỗ trợ bạn ở bất cứ đâu và vào bất cứ
                lúc nào.
              </h1>
            </div>
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-12 rounded-xl drop-shadow-lg lg:h-80 lg:w-80 ">
              <img alt="" src={likeIcon} className="w-10" />
              <h1 className="font-bold text-center">ĐỘ TIN CẬY TUYỆT ĐỐI</h1>
              <h1>
                Các câu hỏi đưa ra luôn được giải đáp một cách chính xác nhất,
                minh bạch.
              </h1>
            </div>
          </div>
        </Container>
      </section>
      <section id="description">
        <Container className="flex flex-col space-y-10 px-12 py-16 items-center justify-between bg-gray-200 min-w-full lg:flex-row  lg:space-y-0">
          <div className="flex flex-col space-y-4 items-center text-black lg:w-1/2 xl:pl-40 lg:items-start">
            <h1 className="font-bold text-xl">HỘP THƯ GÓP Ý KHOA CNTT</h1>
            <h1 className="text-md max-w-md">
              Dùng Kênh
              <span className="font-bold">HỘP THƯ GÓP Ý KHOA CNTT</span> trực
              tuyến là cách nhanh và đơn giản nhất để tìm câu trả lời cũng như
              kết nối với đội ngũ hỗ trợ. Sinh viên có thể tìm câu trả lời cho
              các vấn đề thường gặp; gửi câu hỏi đến VHUB.
            </h1>
          </div>
          <div className="lg:w-1/2">
            <img
              alt=""
              src={descriptionIcon}
              className=" p-4 border-2 border-lightBlue w-full max-w-sm mx-auto"
            ></img>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Ebox;
