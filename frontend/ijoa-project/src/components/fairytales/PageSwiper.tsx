import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface PageSwiperProps {
  bookPages: string[]; // 스와이퍼에 넣을 페이지 이미지 리스트
  pageNums: string[]; // 스와이퍼에 넣을 페이지번호 리스트
  onPageClick: (index: number) => void; // 클릭 핸들러 추가
  spaceBetween?: number; // 이미지 사이 간 간격
  slidesPerView?: number; // 페이지 당 이미지 개수
  activeIndex: number;
}

const PageSwiper: React.FC<PageSwiperProps> = ({
  bookPages, // 책 페이지 사진들
  pageNums, // 책 페이지 번호들
  onPageClick, // 클릭 핸들러
  activeIndex,
  spaceBetween = 5, // 사진 간 간격
  slidesPerView = 3.5, // 화면 당 슬라이드 개수
}) => {

    return (
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          initialSlide={activeIndex-1} 
        >
          {bookPages.map((cover, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative block cursor-pointer transition-all duration-300"
                onClick={() => onPageClick(index + 1)}
              >
                <img
                  src={cover}
                  alt={`동화책 ${index + 1}`}
                  className={`w-[330px] h-[200px] rounded-2xl ${
                    activeIndex === index ? "border-8 border-[#67CCFF] rounded-3xl" : "grayscale-[80%]"
                  }`}
                />
                <div className="mt-2 text-center pr-7">
                  <span className="text-2xl font-semibold">{pageNums[index]}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    };
    
    export default PageSwiper;