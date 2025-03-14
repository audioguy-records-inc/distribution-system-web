export enum FileType {
  IMAGES = "images",
  SONGS = "songs",
  VIDEOS = "videos",
  DOCS = "docs",
  ETC = "etc",
}

export enum DataCollectionName {
  DSPS = "dsps",
  USERS = "users",
  DSP_CONTRACTS = "dspContracts",
  USER_CONTRACTS = "userContracts",
  ALBUMS = "albums",
  SONGS = "songs",
  VIDEOS = "videos",
  SETTLEMENTS = "settlements",
}

export type urlList = {
  url: string;
  partNumber: number;
};
