import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface PutAlbumRequest {
  album: Album;
}

interface PutAlbumResponse {
  album: Album;
}

export const putAlbum = async (
  request: PutAlbumRequest,
): Promise<FetchResponse<PutAlbumResponse>> => {
  try {
    const response = await apiFetch(`/albums/${request.album._id}`, {
      method: "PUT",
      body: JSON.stringify(request.album),
    });

    return response as FetchResponse<PutAlbumResponse>;
  } catch (error) {
    console.error("[putAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};
