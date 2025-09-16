export const ALBUM_FILE_STATE = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type AlbumFileState =
  (typeof ALBUM_FILE_STATE)[keyof typeof ALBUM_FILE_STATE];
