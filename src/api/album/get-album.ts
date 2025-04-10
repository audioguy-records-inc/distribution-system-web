import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface GetAlbumRequest {
  albumId: string;
}

interface GetAlbumResponse {
  album: Album;
}

export const getAlbum = async (
  request: GetAlbumRequest,
): Promise<FetchResponse<GetAlbumResponse>> => {
  try {
    const response = await apiFetch(`/albums/${request.albumId}`);

    return response as FetchResponse<GetAlbumResponse>;
  } catch (error) {
    console.error("[getAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
