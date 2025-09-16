export const SETTLEMENT_FILE_STATE = {
  PENDING: "PENDING", // 파일 업로드후 엑셀 데이터 변환 시작 전
  CONVERTING: "CONVERTING", // 엑셀 데이터 변환중
  CONVERTING_SUCCESS: "CONVERTING_SUCCESS", // 완료
  CONVERTING_ERROR: "CONVERTING_ERROR", // 컨버팅 에러

  MATCHING: "MATCHING", // 매칭중
  MATCHING_SUCCESS: "MATCHING_SUCCESS", // 매칭 성공
  MATCHING_ERROR: "MATCHING_ERROR", // 매칭 에러
} as const;

export type SettlementFileState =
  (typeof SETTLEMENT_FILE_STATE)[keyof typeof SETTLEMENT_FILE_STATE];
