/**
 * 업로드된 정산 파일에서 변환된 각 행(레코드)의 데이터를 저장합니다.
 * 이 데이터는 아직 집계되거나 다른 데이터와 매칭되기 전의 원본 엑셀에 가깝습니다.
 */

// 아티스트 정보 인터페이스
export interface ArtistName {
  name: string; // 예: "이아름"
}

// 정산 원본 레코드 인터페이스 정의
export interface SettlementRawRecord {
  _id?: string; // 문서 고유 ID (MongoDB ObjectId)

  // 이 레코드가 속한 원본 정산 파일의 ID (ObjectId, settlementFiles 컬렉션 참조)
  settlementFileId: string; // 예: "67edeb5105a2ab668652b5b4"

  // 유통사 식별자 (String)
  distributor: string;

  // 정산 기준 월 (Number, YYYYMM 형식)
  // 예: 202408 (2024년 8월)
  settlementMonth: number;

  // 실제 판매 발생 월 (Number, YYYYMM 형식)
  // 예: 202407 (2024년 7월)
  salesMonth: number;

  // 서비스
  // 예: "YG Plus", "Spotify", "YouTube" 등
  service: string;

  // 국제 표준 녹음 코드 (String)
  ISRC: string; // 예: "KRMIM2422403"

  // 국제 상품 번호 (String)
  UPC: string; // 예: "KRMIM2422403"

  // 자사앨범코드 (String)
  albumDistributionCode: string; // 예: "AG240301"

  // 자사곡코드 (String)
  trackDistributionCode: string; // 예: "AG24030101"

  // 정산금액 (오디오가이가 받은)
  settlementFee: number; // 예: 0.136514

  // 트랙명 (String)
  trackTitle: string; // 예: "다크니스 투 라이트 (Darkness to Light)"

  // 앨범명 (String)
  albumTitle: string; // 예: "Voice"

  // 아티스트(Array of Objects)
  artistList: ArtistName[];

  // 스트리밍, TODO: 정산자료에서 어떤 값이 들어가는지 확인 필요
  ST: number | null;

  // 다운로드, TODO: 정산자료에서 어떤 값이 들어가는지 확인 필요
  DN: number | null;

  // 유통 방식, TODO: 정산자료에서 어떤 값이 들어가는지 확인 필요
  distributionType: string | null;

  // 지역 유형 (String)
  // 예: 'domestic' (국내), 'international' (해외)
  regionType: string;
}

export default SettlementRawRecord;
