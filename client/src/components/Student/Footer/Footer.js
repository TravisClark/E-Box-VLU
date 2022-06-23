import React from "react";
import vluIcon from "../../../assets/_hjkj3598HJ_logo2.png";
import Container from "../../UI/Container";
import houseIcon from "../../../assets/house.png";
function Footer() {
  return (
    <footer id='footer'>
      <Container className="flex flex-col px-10 items-center pt-16 bg-black min-w-full ">
        <div className="flex flex-col min-w-sm space-y-8 md:flex-row md:space-y-0 md:space-x-40 md:justify-around">
          <div className="md:mb-20 md:w-1/2">
            <img alt="" src={vluIcon} className="w-60 md:w-80 mx-auto" />
          </div>
          <div className="flex flex-col space-y-4 md:w-1/2">
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
                <span className="text-white">Cơ sở 1: </span>45 Nguyễn Khắc Nhu,
                P. Cô Giang, Q.1, TP. HCM
              </div>
              <div className="text-lightGray text-sm font-bold">
                <span className="text-white">Cơ sở 2: </span>233A Phan Văn Trị,
                P.11, Q. Bình Thạnh, TP. HCM
              </div>
              <div className="text-lightGray text-sm font-bold">
                <span className="text-white">Ký túc xá: </span>160/63A-B Phan
                Huy Ích, P. 12, Q. Gò Vấp, TP. HCM
              </div>
              <div className="text-sm font-bold">
                <span className="text-white">
                  Điện thoại: 028.71099221- EXT: 3320
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full md:w-9/12 bg-gray-700 my-10"></div>
        <h1 className="text-sm text-lightGray mb-4">2022 - Bản Quyền Thuộc Về K25PM - SEP - Team 11</h1>
      </Container>
    </footer>
  );
}

export default Footer;
