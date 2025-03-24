import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface GetAlbumResponse {
  albumList: Album[];
}

export const getAlbums = async (): Promise<FetchResponse<GetAlbumResponse>> => {
  try {
    const response = await apiFetch(`/albums`);

    return response as FetchResponse<GetAlbumResponse>;
  } catch (error) {
    console.error("[getAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
