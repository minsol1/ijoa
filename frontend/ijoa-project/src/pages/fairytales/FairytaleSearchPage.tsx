import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fairyTaleApi } from "../../api/fairytaleApi";
import { FairyTaleSearchResponse, FairyTaleListResponse, FairyTaleListItem } from "../../types/fairytaleTypes";
import BookCoverGrid from "../../components/child/BookCoverGrid";
import SearchBar from "../../components/common/SearchBar";
import Lottie from "react-lottie-player";
import "../../css/FairytaleContentPage.css";
import loadingAnimation from "../../lottie/footPrint-loadingAnimation.json";

const FairytaleSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<FairyTaleSearchResponse | null>(null);
  const [allFairyTales, setAllFairyTales] = useState<FairyTaleListResponse | null>(null);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태 추가
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수 상태 추가
  const itemsPerPage = 12; // 페이지당 아이템 수 설정

  const myBookReadOrNot = allFairyTales?.content?.map((fairyTale: FairyTaleListItem) => fairyTale.isCompleted) || [];

  useEffect(() => {
    const getAllFairyTales = async () => {
      try {
        const response = await fairyTaleApi.getFairyTalesList(currentPage, itemsPerPage);
        if (response.status === 200) {
          setAllFairyTales(response.data);
          setTotalPages(6);
        } else {
          console.error("유효하지 않은 응답 상태 :", response.status);
        }
      } catch (error) {
        console.error("fairytaleApi의 getFairyTalesList :", error);
      }
    };

    getAllFairyTales();
  }, [currentPage]); // currentPage가 변경될 때마다 데이터 요청

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim()) {
      try {
        const response = await fairyTaleApi.getFairyTalesBySearch(searchQuery, 1, 10);
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
      navigate(`/fairytale/content/${selectedFairytaleId}`, {
        state: {
          title: allFairyTales?.content[index].title,
          isCompleted: allFairyTales?.content[index].isCompleted,
          currentPage: allFairyTales?.content[index].currentPage,
          totalPages: allFairyTales?.content[index].totalPages,
          from: "search",
        },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="relative w-full h-screen overflow-y-auto bg-gradient-to-b from-white">
        <div className="pt-[96px] px-10 flex justify-between items-center mb-4 sticky top-0 bg-white z-40">
          <div className="text-2xl font-bold flex items-center font-['MapleBold']">
            {query ? "🔎 검색 결과 ..." : "📚 전체 동화 목록"}
          </div>
          <SearchBar onInputChange={handleInputChange} />
        </div>

        <div className="px-10 mb-12">
          {query && searchResults && searchResults.content.length > 0 ? (
            <BookCoverGrid
              bookCovers={searchResults.content.map((item) => item.image)}
              titles={searchResults.content.map((item) => item.title)}
              onBookClick={handleBookClick}
              myBookReadOrNot={searchResults.content.map((book) => book.isCompleted)}
              progress={searchResults?.content.map((book) => book.progressRate || 0)}
            />
          ) : query ? (
            <p className="p-4 text-gray-500">검색 결과가 없습니다.</p>
          ) : allFairyTales && allFairyTales.content.length > 0 ? (
            <BookCoverGrid
              bookCovers={allFairyTales.content.map((item) => item.image)}
              titles={allFairyTales.content.map((item) => item.title)}
              onBookClick={handleBookClick}
              myBookReadOrNot={myBookReadOrNot}
              progress={allFairyTales?.content.map((book) => book.progressRate || 0)}
            />
          ) : (
            <div className="mt-48 mb-48 flex justify-center items-center">
              <Lottie className="w-40 aspect-1" loop play animationData={loadingAnimation} />
            </div>
          )}
        </div>

        {!query && (
          <div className="flex justify-center items-center my-4 space-x-4 font-['MapleLight']">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-[#67CCFF] rounded-3xl disabled:bg-gray-300"
            >
              이전
            </button>
            <span className="text-lg font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-[#67CCFF] rounded-3xl disabled:bg-gray-300"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairytaleSearchPage;
