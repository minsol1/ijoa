import React from "react";
import Swiper from "../../components/Swiper"; // 스와이퍼 컴포넌트 import
import ChoiceTab from "../../components/ChoiceTab"; // 선택탭 컴포넌트 import
import bookcover from "../../assets/images/BookCover.png";

const FairytaleListPage: React.FC = () => {
  // 스와이퍼에 들어갈 사진 리스트
  const bookCovers = [bookcover, bookcover, bookcover, bookcover, bookcover, bookcover, bookcover];
  // 스와이퍼에 들어갈 제목 리스트
  const titles = ["동화책 1", "동화책 2", "동화책 3", "동화책 4", "동화책 5", "동화책 6", "동화책 7"];
  // 선택탭 항목 리스트
  const tabItems = ["의사소통", "자연탐구", "사회관계", "예술경험", "신체운동 / 건강"];

  return (
    <div className="mt-24 px-10">
      <div className="mb-10">
        <div className="mb-5 text-2xl font-bold">🏆 9살 인기 동화책</div>
        <Swiper bookCovers={bookCovers} titles={titles} />
      </div>
      <div className="mb-10">
        <div className="mb-5 text-2xl font-bold">🧸 이런 책 어때요?</div>
        <Swiper bookCovers={bookCovers} titles={titles} />
      </div>
      <div>
        <div className="flex justify-between mb-5">
          <div className="text-2xl font-bold">🌟 카테고리 별 인기 동화책</div>
          <ChoiceTab tabs={tabItems} />
        </div>
        <Swiper bookCovers={bookCovers} titles={titles} />
      </div>
    </div>
  );
};

export default FairytaleListPage;
