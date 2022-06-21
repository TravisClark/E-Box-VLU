import React from "react";
import Container from "../../UI/Container";
import likeIcon from '../../../assets/like (1).png';
import teamIcon from '../../../assets/team.png'
import clockIcon from '../../../assets/clock (1).png'

function Services() {
  return (
    <section id="services">
      <Container className="flex flex-col relative items-center min-w-full p-0 mb-20 space-y-6">
        <div className="absolute top-0 h-full w-full bg-heavyBlue xl:h-80 xl:-top-20 xl:rounded-xl xl:w-10/12"></div>
        <div className="flex flex-col space-y-6 mx-auto text-center text-white z-10">
          <h1 className="font-semibold">DỊCH VỤ</h1>
          <h1 className="font-bold text-2xl max-w-md">Luôn mang đến cho sinh viên nhiều lợi ích khác nhau</h1>
        </div>
        <div className="flex flex-col px-6 space-y-6 py-10 w-full items-center z-10 lg:flex-row lg:space-y-0 lg:justify-center lg:space-x-16">
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-12 rounded-xl lg:h-80 lg:w-80">
                <img alt="" src={teamIcon} className="w-10"/>
                <h1 className='font-bold text-center'>LUÔN SẴN LÒNG HỖ TRỢ</h1>
                <h1>Luôn có đội ngũ nhân viên có năng lực sẵn sàng hỗ trợ trả lời câu hỏi </h1>
            </div>
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-6 rounded-xl lg:h-80 lg:w-80">
                <img alt="" src={clockIcon} className="w-10"/>
                <h1 className='font-bold text-center'>Ở BẤT CỨ ĐÂU, BẤT KỲ LÚC NÀO</h1>
                <h1>Hộp thư góp ý khoa CNTT là nơi lưu trữ câu hỏi trực tuyến mà sinh viên đặt ra, có thể hỗ trợ bạn ở bất cứ đâu và vào bất cứ lúc nào.</h1>
            </div>
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-12 rounded-xl lg:h-80 lg:w-80 ">
                <img alt="" src={likeIcon} className="w-10"/>
                <h1 className='font-bold text-center'>ĐỘ TIN CẬY TUYỆT ĐỐI</h1>
                <h1>Các câu hỏi đưa ra luôn được giải đáp một cách chính xác nhất, minh bạch.</h1>
            </div>
        </div>
      </Container>
    </section>
  );
}

export default Services;
