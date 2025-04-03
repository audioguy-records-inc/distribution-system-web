import { FileInfo } from "./file-info";
import { User } from "./user";
import UserContract from "./user-contract";
import { countryList } from "../constants/country";

export type CountryCode = (typeof countryList)[number]["countryCode"];

export type TitleLanguage = {
  [key in CountryCode]?: string;
};

export interface ImageInfo {
  name: string;
  imageOriginalPath: string;
  image64Path?: string;
  image128Path?: string;
  image256Path?: string;
  image512Path?: string;
  image1024Path?: string;
  imageFilename?: string;
}

export interface ArtistInfo {
  artistId: string;
  name: string;
  mainRole: string;
  subRole: string;
}

export interface Transmission {
  dspContractId: string;
  url: string | null;
  status: "PENDING" | "INSERT" | "UPDATED" | "TAKEDOWN";
  transmittedAt: Date;
  isLive: boolean;
}

export interface TrackInfo {
  trackId: string;
  title: string;
}

export interface Video {
  _id?: string;
  titleList: TitleLanguage[];
  videoUniqueId?: string;
  UPC?: string;
  ISRC?: string;

  videoType?: string;

  releaseArtistList?: ArtistInfo[];

  releaseCountryCode?: string;

  distributionCompanyName?: string;
  agencyCompanyName?: string;

  userId?: string;
  userInfo?: User;
  userContractId?: string;
  userContract?: UserContract;
  dspContractIdList?: string[];

  isFree?: boolean;
  isMathcedTrack?: boolean;
  trackIdList?: string[];

  supplyRegion?: string;
  excludedRegionList?: string[];

  utcReleasedAt?: Date;
  utcServiceStartedAt?: Date;

  ratingAuthority?: string;
  rating?: string;
  utcRatedAt?: Date;
  ratingExemptionReason?: string;
  ratingFileList?: FileInfo[];

  requestDetails?: string;

  videoFileList?: FileInfo[];
  thumbnailImageList?: ImageInfo[];

  transmissionList?: Transmission[];
  trackList?: TrackInfo[];

  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt?: Date | null;
}

export default Video;
