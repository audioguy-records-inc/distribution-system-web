export interface CensorshipBoard {
  key: string;
  value: string;
  translationKey?: string;
}

export const censorshipBoardList: CensorshipBoard[] = [
  { key: "심의제외", value: "심의제외", translationKey: "censorBoardExempt" },
  { key: "CMTV", value: "CMTV" },
  { key: "ETN", value: "ETN" },
  { key: "jtbc", value: "jtbc" },
  { key: "KBS", value: "KBS" },
  { key: "M.net", value: "M.net" },
  { key: "mbc", value: "mbc" },
  { key: "MBC Music", value: "MBC Music" },
  { key: "mbcevery1", value: "mbcevery1" },
  { key: "MBN", value: "MBN" },
  { key: "OCN", value: "OCN" },
  { key: "sbs", value: "sbs" },
  { key: "SBS M", value: "SBS M" },
  { key: "tvn", value: "tvn" },
  { key: "TV조선", value: "TV조선", translationKey: "censorBoardTVChosun" },
  {
    key: "영상물등급위원회",
    value: "영상물등급위원회",
    translationKey: "censorBoardKMRB",
  },
  { key: "채널A", value: "채널A", translationKey: "censorBoardChannelA" },
  {
    key: "기타(직접입력)",
    value: "기타(직접입력)",
    translationKey: "censorBoardOther",
  },
];

export const censorshipExemptionList: CensorshipBoard[] = [
  {
    key: "방송 편집 영상(드라마, 영화)",
    value: "방송 편집 영상(드라마, 영화)",
    translationKey: "exemptBroadcast",
  },
  {
    key: "종교물 영상",
    value: "종교물 영상",
    translationKey: "exemptReligion",
  },
  {
    key: "등급 시행 전 영상",
    value: "등급 시행 전 영상",
    translationKey: "exemptPreRating",
  },
  {
    key: "자연물 영상",
    value: "자연물 영상",
    translationKey: "exemptNature",
  },
  {
    key: "라이브 영상",
    value: "라이브 영상",
    translationKey: "exemptLive",
  },
  {
    key: "리릭 비디오 (가사 영상)",
    value: "리릭 비디오 (가사 영상)",
    translationKey: "exemptLyric",
  },
  {
    key: "메이킹 필름 (작업 영상)",
    value: "메이킹 필름 (작업 영상)",
    translationKey: "exemptMaking",
  },
  {
    key: "이미지 영상",
    value: "이미지 영상",
    translationKey: "exemptImage",
  },
];

export const censorshipRatingList: CensorshipBoard[] = [
  {
    key: "전체관람가",
    value: "전체관람가",
    translationKey: "ratingAll",
  },
  {
    key: "7세 이상 관람가",
    value: "7세 이상 관람가",
    translationKey: "rating7",
  },
  {
    key: "12세 이상 관람가",
    value: "12세 이상 관람가",
    translationKey: "rating12",
  },
  {
    key: "15세 이상 관람가",
    value: "15세 이상 관람가",
    translationKey: "rating15",
  },
  {
    key: "청소년 관람 불가 (19금 이상 관람가)",
    value: "청소년 관람 불가 (19금 이상 관람가)",
    translationKey: "rating19",
  },
  {
    key: "심의예정",
    value: "심의예정",
    translationKey: "ratingPending",
  },
  {
    key: "제한 관람가",
    value: "제한 관람가",
    translationKey: "ratingRestricted",
  },
  {
    key: "등급없음",
    value: "등급없음",
    translationKey: "ratingNone",
  },
];
