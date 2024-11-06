import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { FairyTaleReadCheckItem } from "../../types/fairytaleTypes";

interface Props {
  direction: string;
  myBookLists: FairyTaleReadCheckItem[];
}

const MyBookSwiper = ({ direction, myBookLists }: Props) => {
  const myBookCovers = myBookLists.map((book) => book.image);
  const myBookTitles = myBookLists.map((book) => book.title);

  return (
    <Swiper
      dir={`${direction === "reverse" ? "rtl" : ""}`}
      slidesPerView={3.5}
      spaceBetween={30}
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
      }}
      speed={4000}
      loop={true}
      freeMode={true}
      modules={[FreeMode, Autoplay]}
      className="mySwiper"
    >
      {myBookCovers.map((cover, index) => (
        <SwiperSlide key={index}>
          <div className="block text-center cursor-pointer">
            <img src={cover} alt={`동화책 ${index + 1}`} className="w-full" />
            <div className="mt-2 text-left">
              <span className="text-xl text-white line-clamp-1">{myBookTitles[index]}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MyBookSwiper;
