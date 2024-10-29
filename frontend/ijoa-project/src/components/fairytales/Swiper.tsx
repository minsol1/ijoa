import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"; // Import Link for routing
import "swiper/css";

interface BookCoverSwiperProps {
  bookCovers: string[]; // 스와이퍼에 넣을 이미지 리스트
  titles: string[]; // 스와이퍼에 넣을 제목 리스트
  spaceBetween?: number; // 이미지 사이 간 간격
  slidesPerView?: number; // 페이지 당 이미지 개수
}

const BookCoverSwiper: React.FC<BookCoverSwiperProps> = ({
  bookCovers, // 책 표지 사진들
  titles, // 책 제목들
  spaceBetween = 10, // 사진 간 간격
  slidesPerView = 3.5, // 화면 당 슬라이드 개수
}) => {
  return (
    <Swiper spaceBetween={spaceBetween} slidesPerView={slidesPerView} onSlideChange={() => {}} onSwiper={() => {}}>
      {bookCovers.map((cover, index) => (
        <SwiperSlide key={index}>
          <Link to={`/fairytale/content/${index + 1}`} className="block text-center">
            <img src={cover} alt={`동화책 ${index + 1}`} className="w-full cursor-pointer" />
            <div className="mt-2 text-left">
              <span className="text-xl cursor-pointer">{titles[index]}</span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BookCoverSwiper;
