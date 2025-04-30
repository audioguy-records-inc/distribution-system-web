/**
 * 원본 정산 레코드와 내부 시스템 데이터(앨범, 트랙, 사용자, 계약 등)를
 * 매칭한 후의 결과를 저장합니다. 최종 정산 계산의 기초 데이터가 됩니다.
 */

import { ArtistName } from "./settlement-raw-record";

// 정산 매칭 레코드 인터페이스 정의
export interface SettlementMatchedRecord {
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

  /* 매칭 결과 필드 */
  // 매칭된 트랙 ID (ObjectId, tracks 컬렉션 참조)
  trackId: string; // 예: "67eb9fa1ecd13bf4fd460e6f"

  // 매칭된 앨범 ID (ObjectId, albums 컬렉션 참조)
  albumId: string; // 예: "67e6481f477a18eb817b3c80"

  // 매칭된 앨범/트랙의 UCI 코드 (String)
  UCI: string; // 예: "테스트uci2"

  // 매칭된 앨범/트랙의 발매일 (Date)
  utcReleasedAt: Date;

  // 매칭된 앨범/트랙의 서비스 시작일 (Date)
  utcServiceStartedAt: Date;

  // 매칭된 앨범의 유통사 회사명 (String)
  distributionCompanyName: string; // 예: "테스트유통사2"

  // 매칭된 앨범의 기획사 회사명 (String)
  agencyCompanyName: string; // 예: "테스트 기획사2"

  // 매칭된 권리자(사용자)의 표시 이름 (String)
  userDisplayName: string; // 예: "테스트권리자003"

  // 매칭된 권리자(사용자)의 계정 ID (String)
  userAccount: string; // 예: "testCompany003"

  // 매칭된 사용자 계약의 이름 (String)
  userContractName: string; // 예: "체크"

  // 매칭된 사용자 계약의 고유 ID (String)
  userContractUniqueId: string; // 예: "체크"

  // 매칭된 사용자 계약의 정산 비율 (Number)
  // 예: 0.33 (33%)
  userContractRate: number;
  /* 매칭 결과 필드 end */

  /* 매칭후 계산되어 추가된 필드 */
  // 최종 사용자(권리자)에게 지급될 정산 금액 (Number)
  // 계산식: settlementFee * userContractRate
  userSettlementFee: number; // 예: 0.04504962

  // 유통사 또는 플랫폼이 가져가는 수수료 (Number)
  // 계산식: settlementFee - userSettlementFee
  distributionFee: number; // 예: 0.091464
  /* 매칭후 계산되어 추가된 필드 end */
}

// SettlementDetail
export interface SettlementDetail {
  albumTitle: string;
  userDisplayName: string;
  userAccount: string;
  albumDistributionCode: string;
  userSettlementFee: number;
  artistNameList: string[];
  utcReleasedAt: string;
  agencyCompanyName: string;
}

export interface SettlementTaxInvoice {
  _id?: string; // 정산월 (YYYYMM 형식)
  settlementMonth: string; // 정산월

  // 전체
  worldwide: {
    netAmount: number; // 공급가액
    taxAmount: number; // 세액
    totalAmount: number; // 발행 총액
  };

  // 국내
  domestic: {
    netAmount: number; // 공급가액
    taxAmount: number; // 세액
    totalAmount: number; // 발행 총액
  };

  // 해외
  international: {
    netAmount: number; // 공급가액
    taxAmount: number; // 세액
    totalAmount: number; // 발행 총액
  };
}

export interface SettlementAdminInvoice {
  _id?: string; // 정산월 (YYYYMM 형식)
  settlementMonth: string; // 정산월
  totalSettlementFee: number; // 판매금액
  totalUserSettlementFee: number; // 권리자 정산 금액
  totalDistributionFee: number; // 유통 수수료 수익
}

export default SettlementMatchedRecord;
