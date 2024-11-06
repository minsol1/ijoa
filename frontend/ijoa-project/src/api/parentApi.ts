import api from "../lib/axios";
import { ChildInfo } from "../types/parentTypes"

export const parentApi = {
  // 자녀 프로필 목록 조회
  getChildList: () => {
    return api.get(`/parent/children`);
  },

  // 자녀 프로필 생성
  createChildProfile: (formData: FormData) => {
    return api.post(`/parent/children`, formData);
  },

  // 자녀 프로필 수정
  updateChildProfile: (childId: number, formData: FormData) => {
    return api.patch(`/parent/children/${childId}`, formData);
  },

  // 자녀 프로필 삭제
  deleteChildProfile: (childId: number) => {
    return api.delete(`/parent/children/${childId}`);
  },

  // 자녀 프로필 단건 조회
  getChildProfile: (childId: number) => {
    return api.get<ChildInfo>(`/parent/children/${childId}`);
  },

  // 히스토그램 집중한 시간 차트 조회
  getFocusTimeData: (childId: number, interval: string) => {
    return api.get(`/children/${childId}/statistics/focus-time`, { params: { interval } });
  },

  // 도넛형 차트 분류별 독서 통계 조회
  getCategoriesData: (childId: number) => {
    return api.get(`/children/${childId}/statistics/categories`);
  },

  // 독서 분석 보고서 조회
  getReadingReport: (childId: number) => {
    return api.get(`/children/${childId}/statistics/reading-report`);
  },
};