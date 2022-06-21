import React from "react";
import Container from "../../UI/Container";
import descriptionIcon from '../../../assets/description.jpg'
function Description() {
  return (
    <section id="description">
      <Container className="flex flex-col space-y-10 px-12 py-16 items-center justify-between bg-gray-200 min-w-full lg:flex-row  lg:space-y-0">
        <div className="flex flex-col space-y-4 items-center text-black lg:w-1/2 xl:pl-40 lg:items-start">
          <h1 className="font-bold text-xl">HỘP THƯ GÓP Ý KHOA CNTT</h1>
          <h1 className="text-md max-w-md">
            Dùng Kênh <span className="font-bold">HỘP THƯ GÓP Ý KHOA CNTT</span> trực tuyến là cách nhanh và đơn
            giản nhất để tìm câu trả lời cũng như kết nối với đội ngũ hỗ trợ.
            Sinh viên có thể tìm câu trả lời cho các vấn đề thường gặp; gửi câu
            hỏi đến VHUB.
          </h1>
        </div>
        <div className="lg:w-1/2">
            <img alt="" src={descriptionIcon} className=" p-4 border-2 border-lightBlue w-full max-w-sm mx-auto"></img>
        </div>
      </Container>
    </section>
  );
}

export default Description;
