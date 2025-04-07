// 정산 파일 상태 타입 정의
export type SettlementFileState =
  | "PENDING" // 파일 업로드후 엑셀 데이터 변환 시작 전
  | "CONVERTING" // 엑셀 데이터 변환중
  | "CONVERTING_SUCCESS" // 완료
  | "CONVERTING_ERROR" // 컨버팅 에러
  | "MATCHING" // 매칭중
  | "MATCHING_SUCCESS" // 매칭 완료
  | "MATCHING_ERROR"; // 매칭 에러

// 정산 파일 인터페이스 정의
export interface SettlementFile {
  _id?: string; // 문서 고유 ID (MongoDB ObjectId)

  distributor: "AUDIOGUY"; // 유통사 식별자 (String), "AUDIOGUY" 고정

  state: SettlementFileState; // 파일 처리 상태

  filename: string; // 업로드된 원본 파일 이름 (예: "test.xlsx", "spotify_report_2024_03.tsv")

  filePath: string; // 서버 또는 S3에 저장된 파일 경로

  isMissingTrackMatchingField: boolean; // 매칭에 필요한 필드(UPC, ISRC)가 누락된 행이 있는지 여부

  convertingStartedAt?: Date | null; // 원본 데이터 변환 시작 시각
  convertingEndedAt?: Date | null; // 원본 데이터 변환 종료 시각

  matchingStartedAt?: Date | null; // 데이터 매칭 시작 시각
  matchingEndedAt?: Date | null; // 데이터 매칭 종료 시각

  createdAt: Date; // 문서 생성 시각
  updatedAt: Date; // 문서 마지막 업데이트 시각
  deletedAt?: Date | null; // 문서 삭제 시각
}

export default SettlementFile;
