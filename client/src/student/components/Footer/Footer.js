import React from "react";
import ITIcon from "../../../assets/IT_Icon.png";
import houseIcon from "../../../assets/house.png";
import Container from "../UI/Container";
function Footer() {
  return (
    <footer id="footer">
      <Container className="flex flex-col px-10 items-center pt-16 bg-black min-w-full relative z-20">
        <div className="flex flex-col min-w-sm space-y-8 md:flex-row md:space-y-0 md:space-x-40 md:justify-around">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <div className="flex flex-col space-y-6 items-center">
              <img alt="" src={ITIcon} className=" h-28 mx-auto" />
              <span className='text-white font-bold whitespace-nowrap text-xl md:text-2xl'>Khoa Công Nghệ Thông Tin</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 h-auto justify-center md:w-1/2">
            <div className="flex space-x-4 items-center">
              <img src={houseIcon} className="w-6" alt="" />
              <h1 className="font-bold text-white text-sm">
                TRƯỜNG ĐẠI HỌC VĂN LANG
              </h1>
            </div>
            <div className="h-0.5 w-9/12  bg-gray-700"></div>
            <div className="">
              <div className="text-lightGray text-sm font-bold">
                <span className="text-white">Cơ sở chính: </span>69/68 Đặng Thùy
                Trâm, P. 13, Q. Bình Thạnh, TP. HCM
              </div>
              <div className="text-lightGray text-sm font-bold">
                <span className="text-white">Vị trí: </span>Tầng trệt tòa G
              </div>
              <div className="text-lightGray text-sm font-bold">
                <span className="text-white">Email Khoa CNTT: </span>k.cntt@vlu.edu.vn
              </div>
              <div className="text-sm font-bold">
                <span className="text-white">
                  Điện thoại: 028.7109 9240 - EXT: 4010
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full md:w-9/12 bg-gray-700 my-10"></div>
        <h1 className="text-sm text-lightGray mb-4">
          2022 - Bản Quyền Thuộc Về K25PM - SEP - Team 11
        </h1>
      </Container>
    </footer>
  );
}

export default Footer;
