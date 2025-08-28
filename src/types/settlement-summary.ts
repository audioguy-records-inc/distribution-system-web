export interface SettlementServiceSummary {
  service: string;
  settlementFee: number; // 판매금액
  distributionFee: number; // 유통수수료
  userSettlementFee: number; // 정산금
}

export interface SettlementSummary {
  userDisplayName: string; // 권리사명
  userAccount: string; // 권리사코드(user.account)
  serviceList: SettlementServiceSummary[]; // 서비스별 정산내역
  settlementFee: number; // 판매금액
  distributionFee: number; // 유통수수료
  userSettlementFee: number; // 정산금
  settlementStartMonth: number; // 조회 시작 정산월
  settlementEndMonth: number; // 조회 종료 정산월
}
