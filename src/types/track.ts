import { ArtistInfo, TitleLanguage } from "./album";

import { CountryCode } from "./album";
import { FileInfo } from "./file-info";
import { User } from "./user";
import UserContract from "./user-contract";

export interface TrackFile {
  name: string;
  filePath: string;
}

export interface SpatialAudioInfo {
  UPC?: string;
  ISRC?: string;
  trackFileList?: TrackFile[];
}

export interface Track {
  _id?: string;
  titleList?: TitleLanguage[];
  trackUniqueId?: string;
  UCI?: string;
  ISRC?: string;

  discNumber?: number;
  trackNumber?: number;
  isMainTitle?: boolean;
  isTitle?: boolean;

  releaseArtistList?: ArtistInfo[];
  participateArtistList?: ArtistInfo[];

  mainGenre?: string;
  subGenre?: string;

  releaseCountryCode?: CountryCode;

  utcReleasedAt?: Date;
  utcServiceStartedAt?: Date;

  isExposed?: boolean;
  isAdultOnly?: boolean;

  trackFileList?: TrackFile[];

  albumId?: string;
  userId?: string;
  userInfo?: User;
  userContractId?: string;
  userContractInfo?: UserContract;

  lyrics?: string;

  isMVService?: boolean;
  isSupportedSpatialAudio?: boolean;
  spatialAudioInfo?: SpatialAudioInfo | null;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export default Track;
