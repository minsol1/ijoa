import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swiper from "../../components/fairytales/Swiper"; // 스와이퍼 컴포넌트 import
import ChoiceTab from "../../components/fairytales/ChoiceTab"; // 선택탭 컴포넌트 import
import { fairyTaleApi } from "../../api/fairytaleApi";
import { childApi } from "../../api/childApi";
import {
  FairyTaleRankByAgeItem,
  FairyTaleRecommendationItem,
  FairyTaleByCategoryListResponse,
} from "../../types/fairytaleTypes";
import { ChildInfo } from "../../types/childTypes";

const FairytaleListPage: React.FC = () => {
  const navigate = useNavigate();
  const [popularFairyTales, setPopularFairyTales] = useState<FairyTaleRankByAgeItem[]>([]);
  const [recommendedFairyTales, setRecommendedFairyTales] = useState<FairyTaleRecommendationItem[]>([]);
  const [categoryFairyTales, setCategoryFairyTales] = useState<FairyTaleByCategoryListResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(null);

  const bookCovers = popularFairyTales.map((fairyTale) => fairyTale.image);
  const titles = popularFairyTales.map((fairyTale) => fairyTale.title);

  const recommendedCovers = recommendedFairyTales.map((fairyTale) => fairyTale.image);
  const recommendedTitles = recommendedFairyTales.map((fairyTale) => fairyTale.title);

  // 카테고리 이름과 ID 매핑
  const tabItems = [
    { id: 1, name: "의사소통" },
    { id: 2, name: "자연탐구" },
    { id: 3, name: "사회관계" },
    { id: 4, name: "예술경험" },
    { id: 5, name: "신체운동 / 건강" },
  ];

  // 인기 동화책 api 통신 함수
  const getPopularFairyTalesByAge = async () => {
    try {
      const response = await fairyTaleApi.getFairyTalesRankByAge(9);
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data)) {
          setPopularFairyTales(data);
        } else {
          console.error("유효하지 않은 데이터 구조 :", data);
        }
      }
    } catch (error) {
      console.error("fairytaleApi의 getFairyTalesRankByAge :", error);
    }
  };

  // 사용자 맞춤 책 추천 api 통신 함수
  const getRecommendedFairyTales = async () => {
    try {
      const response = await fairyTaleApi.getFairyTaleRecommendations();
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data)) {
          setRecommendedFairyTales(data);
        } else {
          console.error("유효하지 않은 데이터 구조 :", data);
        }
      }
    } catch (error) {
      console.error("fairytaleApi의 getFairyTalesRecommendations :", error);
    }
  };

  // 카테고리 동화책 api 통신 함수
  const getFairyTalesByCategory = async (categoryId: number) => {
    try {
      const response = await fairyTaleApi.getFairyTalesList(categoryId, 0);
      if (response.status === 200) {
        setCategoryFairyTales(response.data);
      }
    } catch (error) {
      console.error("fairytaleApi의 getFairyTalesList :", error);
    }
  };

  // 자녀 프로필을 가져오는 api 통신 함수
  const getChildProfile = async () => {
    const childId = parseInt(localStorage.getItem("childId") || "0", 10);
    if (!childId) return;

    try {
      const response = await childApi.getChildProfile(childId);
      if (response.status === 200 && response.data) {
        setChildInfo(response.data);
      }
    } catch (error) {
      console.error("childApi의 getChildProfile:", error);
    }
  };

  const handlePopularBookClick = (index: number) => {
    navigate(`/fairytale/content/${popularFairyTales[index].fairytaleId}`, { state: { title: titles[index] } });
  };

  const handleRecommendedBookClick = (index: number) => {
    navigate(`/fairytale/content/${recommendedFairyTales[index].fairytaleId}`, {
      state: { title: recommendedTitles[index] },
    });
  };

  const handleCategoryBookClick = (index: number) => {
    if (categoryFairyTales && categoryFairyTales.content && categoryFairyTales.content[index]) {
      const selectedFairyTale = categoryFairyTales.content[index];
      navigate(`/fairytale/content/${selectedFairyTale.fairytaleId}`, { state: { title: selectedFairyTale.title } });
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    getChildProfile();
    getPopularFairyTalesByAge(); // 인기 동화책 데이터 가져오기
    getRecommendedFairyTales(); // 사용자 맞춤 추천 데이터 가져오기
    getFairyTalesByCategory(selectedCategory); // 선택된 카테고리 동화책 데이터 가져오기
  }, [selectedCategory]); // categoryId가 변경될 때마다 호출

  return (
    <div>
      <div className="pt-24 pb-24 px-10 text-xl">
        <div className="mb-10">
          <div className="mb-5 text-2xl font-bold">🏆 {childInfo?.age}살 인기 동화책</div>
          {popularFairyTales.length > 0 ? (
            <Swiper bookCovers={bookCovers} titles={titles} onBookClick={handlePopularBookClick} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="mb-10">
          <div className="mb-5 text-2xl font-bold">🧸 이런 책 어때요?</div>
          {recommendedFairyTales.length > 0 ? (
            <Swiper
              bookCovers={recommendedCovers}
              titles={recommendedTitles}
              onBookClick={handleRecommendedBookClick}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          <div className="flex justify-between mb-5">
            <div className="text-2xl font-bold">🌟 카테고리 별 인기 동화책</div>
            <ChoiceTab tabs={tabItems} onTabClick={handleCategoryChange} />
          </div>
          {categoryFairyTales && categoryFairyTales.content && categoryFairyTales.content.length > 0 ? (
            <Swiper
              bookCovers={categoryFairyTales.content.map((fairyTale) => fairyTale.image)}
              titles={categoryFairyTales.content.map((fairyTale) => fairyTale.title)}
              onBookClick={handleCategoryBookClick}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FairytaleListPage;
