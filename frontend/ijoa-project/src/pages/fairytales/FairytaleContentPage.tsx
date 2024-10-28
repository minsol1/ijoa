import React, { useState } from "react";
import "./FairytaleContentPage.css";
import MenuButton from "../../../public/assets/fairytales/MenuButton.png";
import SoundOnButton from "../../../public/assets/fairytales/SoundOnButton.png";
import LeftArrow from "../../../public/assets/fairytales/LeftArrow.png";
import RightArrow from "../../../public/assets/fairytales/RightArrow.png";
import dummy1 from "../../../public/assets/fairytales/dummy1.png";
import dummy2 from "../../../public/assets/fairytales/dummy2.png";
import dummy3 from "../../../public/assets/fairytales/dummy3.png";

// 더미 데이터
const fairyTales = [
  {
    image: dummy1, // 첫 번째 페이지 배경 이미지
    text: "준비~ 땅! 토끼와 거북이의 달리기 대결이 시작됐어요.", // 첫 번째 페이지 대사
  },
  {
    image: dummy2, // 두 번째 페이지 배경 이미지
    text: "느림보가 어디쯤 오나? 헤헤. 쫓아오려면 아직도 멀었네. 한숨 자야지.", // 두 번째 페이지 대사
  },
  {
    image: dummy3, // 세 번째 페이지 배경 이미지
    text: "동물 친구들은 하하호호 웃으며 즐거워했어요.", // 세 번째 페이지 대사
  },
];

const FairyTaleContentPage: React.FC = () => {
  // 현재 페이지를 추적하는 상태 변수
  const [fairytaleCurrentPage, setfairytaleCurrentPage] = useState(0);

  // 좌측 화살표 버튼 클릭 시 호출되는 함수
  // 현재 페이지가 첫 페이지보다 크면, 이전 페이지로 이동
  const handleLeftClick = () => {
    if (fairytaleCurrentPage > 0) {
      setfairytaleCurrentPage(fairytaleCurrentPage - 1);
    }
  };

  // 우측 화살표 버튼 클릭 시 호출되는 함수
  // 현재 페이지가 마지막 페이지보다 작으면, 다음 페이지로 이동
  const handleRightClick = () => {
    if (fairytaleCurrentPage < fairyTales.length - 1) {
      setfairytaleCurrentPage(fairytaleCurrentPage + 1);
    }
  };

  return (
    <div className="relative h-screen">
      {/* 현재 페이지 배경사진 */}
      <img src={fairyTales[fairytaleCurrentPage].image} alt="동화책 내용 사진" className="w-screen h-screen" />

      {/* 우측 상단 메뉴 버튼 */}
      <div className="absolute top-[-12px] right-10">
        <button className="px-3 py-4 bg-gray-700 bg-opacity-50 rounded-2xl shadow-md hover:bg-gray-200 hover:bg-opacity-80">
          <img src={MenuButton} alt="메뉴 버튼" />
          <p className="text-xs text-white">메뉴</p>
        </button>
      </div>

      {/* 중앙 하단 동화 내용 */}
      <div className="w-3/4 h-[140px] p-4 flex absolute bottom-10 left-1/2 transform -translate-x-1/2 justify-between items-center bg-white bg-opacity-70 rounded-3xl shadow-lg">
        {/* 다시 듣기 버튼 */}
        <button className="items-center ml-5">
          <img src={SoundOnButton} alt="다시 듣기 버튼" className="w-20 h-20" />
          <p className="text-sm text-[#565656] font-bold">다시 듣기</p>
        </button>
        {/* 동화 내용 텍스트 */}
        <p className="text-3xl font-bold text-center break-words flex-1 fairytale-content">
          {fairyTales[fairytaleCurrentPage].text}
        </p>
      </div>

      {/* 좌측 화살표 버튼 */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
        <button className="bg-transparent border-none" onClick={handleLeftClick}>
          <img src={LeftArrow} alt="왼쪽 화살표" />
        </button>
      </div>

      {/* 우측 화살표 버튼 */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <button className="bg-transparent border-none" onClick={handleRightClick}>
          <img src={RightArrow} alt="오른쪽 화살표" />
        </button>
      </div>
    </div>
  );
};

export default FairyTaleContentPage;
