import { FileInfo } from "./file-info";
import { User } from "./user";
import UserContract from "./user-contract";
import { countryList } from "../constants/country";

export type CountryCode = (typeof countryList)[number]["countryCode"];

export type TitleLanguage = {
  [key in CountryCode]?: string;
};

export interface ImageInfo extends FileInfo {
  name: string;
  imageOriginalPath: string;
  image64Path: string;
  image128Path: string;
  image256Path: string;
  image512Path: string;
  image1024Path: string;
  imageFilename: string;
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

export interface Track {
  trackId: string;
  title: string;
}

export interface Album {
  _id: string;
  titleList: TitleLanguage[];
  albumUniqueId: string;
  UCI: string;
  UPC: string;

  artistImageList: ImageInfo[];
  releaseArtistList: ArtistInfo[];
  participateArtistList: ArtistInfo[];

  albumType: string;
  releaseCountryCode: string;

  mainGenre: string;
  subGenre: string;

  numberOfDiscs: number;
  numberOfTracksPerDisc: number;

  distributionCompanyName: string;
  agencyCompanyName: string;

  userId?: string;
  userInfo?: User;
  userContractId?: string;
  userContract?: UserContract;
  dspContractIdList: string[];

  supplyRegion: string;
  excludedRegionList: string[];

  utcReleasedAt: Date;
  utcServiceStartedAt: Date;

  isExposed: boolean;
  isAdultOnly: boolean;
  isSupportedSpatialAudio: boolean;

  albumIntroduction: string;
  requestDetails: string;

  coverImageList: ImageInfo[];
  bookletImageList: ImageInfo[];
  etcFileList: FileInfo[];

  transmissionList: Transmission[];
  trackList: Track[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export default Album;
