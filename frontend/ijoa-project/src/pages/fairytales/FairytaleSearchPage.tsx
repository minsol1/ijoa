import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fairyTaleApi } from "../../api/fairytaleApi";
import { FairyTaleSearchResponse, FairyTaleListResponse } from "../../types/fairytaleTypes";
import BookCoverGrid from "../../components/fairytales/BookCoverGrid";
import SearchBar from "../../components/common/SearchBar";

const FairytaleSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<FairyTaleSearchResponse | null>(null);
  const [allFairyTales, setAllFairyTales] = useState<FairyTaleListResponse | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const getAllFairyTales = async () => {
      try {
        const response = await fairyTaleApi.getFairyTalesList(1, 2);
        if (response.status === 200) {
          setAllFairyTales(response.data);
        } else {
          console.error("유효하지 않은 응답 상태 :", response.status);
        }
      } catch (error) {
        console.error("fairytaleApi의 getFairyTalesList :", error);
      }
    };

    getAllFairyTales();
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim()) {
      try {
        const response = await fairyTaleApi.getFairyTalesBySearch(searchQuery, 0);
        if (response.status === 200) {
          const data = response.data;
          setSearchResults(data);
        } else {
          console.error("유효하지 않은 응답 상태 :", response.status);
        }
      } catch (error) {
        console.error("fairytaleApi의 getFairyTalesBySearch :", error);
        setSearchResults(null);
      }
    } else {
      setSearchResults(null);
    }
  };

  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  const handleBookClick = (index: number) => {
    const selectedFairytaleId =
      searchResults?.content[index]?.fairytaleId || allFairyTales?.content[index]?.fairytaleId;
    if (selectedFairytaleId) {
      navigate(`/fairytale/content/${selectedFairytaleId}`);
    }
  };

  return (
    <div>
      <div className="relative w-full h-screen overflow-y-auto bg-gradient-to-b from-white">
        <div className="pt-[96px] px-10 flex justify-between items-center mb-6">
          <div className="text-2xl font-bold flex items-center">
            {query ? "🔎 검색 결과 ..." : "📚 전체 동화 목록"}
          </div>
          <SearchBar onInputChange={handleInputChange} />
        </div>

        <div className="px-10 mb-6">
          {query && searchResults && searchResults.content.length > 0 ? (
            <BookCoverGrid
              bookCovers={searchResults.content.map((item) => item.image)}
              titles={searchResults.content.map((item) => item.title)}
              onBookClick={handleBookClick}
            />
          ) : query ? (
            <p className="p-4 text-gray-500">검색 결과가 없습니다.</p>
          ) : allFairyTales && allFairyTales.content.length > 0 ? (
            <BookCoverGrid
              bookCovers={allFairyTales.content.map((item) => item.image)}
              titles={allFairyTales.content.map((item) => item.title)}
              onBookClick={handleBookClick}
            />
          ) : (
            <p className="p-4 text-gray-500">전체 동화 목록이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FairytaleSearchPage;
