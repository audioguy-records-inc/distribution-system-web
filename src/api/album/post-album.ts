import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface PostAlbumRequest {
  albumList: Album[];
}

interface PostAlbumResponse {
  albumList: Album[];
}

export const postAlbum = async (
  request: PostAlbumRequest,
): Promise<FetchResponse<PostAlbumResponse>> => {
  try {
    const response = await apiFetch("/albums", {
      method: "POST",
      body: JSON.stringify(request.albumList),
    });

    return response as FetchResponse<PostAlbumResponse>;
  } catch (error) {
    console.error("[postAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
