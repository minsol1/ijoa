// 나이별 동화 랭킹
export interface FairyTaleRankByAgeItem {
  fairytaleId: number;
  title: string;
  image: string;
  total_pages: number;
  current_page: number;
  is_completed: boolean;
}

export interface FairyTaleRankByAgeResponse {
  rankList: FairyTaleRankByAgeItem[];
}

// 사용자 맞춤 책 추천
export interface FairyTaleRecommendationItem {
  fairytaleId: number;
  title: string;
  image: string;
  total_pages: number;
  current_page: number;
  is_completed: boolean;
}

export type FairyTaleRecommendationsResponse = FairyTaleRecommendationItem[];

// 카테고리별 동화 리스트 조회
export interface FairyTaleByCategoryItem {
  fairytaleId: number;
  title: string;
  image: string;
  total_pages: number;
  current_page: number;
  is_completed: boolean;
}

export interface FairyTaleByCategoryListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: FairyTaleByCategoryItem[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 동화 페이지 조회 (POST)
export interface FairyTalePageResponse {
    pageNumber: number;
    content: string;
    image: string;
    totalPages: number;
    pageHistoryId: number;
  }