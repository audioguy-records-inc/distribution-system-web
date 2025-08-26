import { countryList } from "@/constants/country";

export enum CountryType {
  DOMESTIC = "국내",
  FOREIGN = "국외",
}

export enum GenderType {
  MALE_SOLO = "남성 솔로",
  FEMALE_SOLO = "여성 솔로",
  MIXED = "혼성",
  MALE_GROUP = "남성 그룹",
  FEMALE_GROUP = "여성 그룹",
  UNKNOWN = "불명",
}

export enum ArtistType {
  SOLO = "솔로",
  GROUP = "그룹",
}

export interface SnsLink {
  site: string; // 'facebook', 'instagram', 'twitter', 'youtube', 'website', 'tiktok' 등
  link: string;
}

export type CountryCode = (typeof countryList)[number]["countryCode"];

export interface Artist {
  _id: string;
  name: string;
  nameEn: string;
  artistUniqueId: string;

  countryCode: CountryCode; // ISO 3166-1 기준 국가 코드 (예: 'KR', 'US')
  countryType?: CountryType;

  genderType: GenderType;
  artistType: ArtistType;

  snsLinkList: SnsLink[];

  releaseAlbumCount: 0;
  participateAlbumCount: 0;
  releaseTrackCount: 0;
  participateTrackCount: 0;

  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt?: Date;
}
