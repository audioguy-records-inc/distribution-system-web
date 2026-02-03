interface VideoTypeItem {
  key: string;
  translationKey: string;
}

export const videoTypeList: VideoTypeItem[] = [
  { key: "뮤직비디오", translationKey: "videoTypeMV" },
  { key: "공연영상", translationKey: "videoTypePerformance" },
  { key: "티저영상", translationKey: "videoTypeTeaser" },
  { key: "팬미팅", translationKey: "videoTypeFanmeeting" },
  { key: "메이킹필름", translationKey: "videoTypeMakingFilm" },
  { key: "라이브", translationKey: "videoTypeLive" },
  { key: "기타", translationKey: "videoTypeEtc" },
];
