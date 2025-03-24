import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface SearchAlbumRequest {
  __searchKeyword: string;
  __searchFields?: string;
}

interface SearchAlbumResponse {
  albumList: Album[];
}

export const searchAlbum = async (
  request: SearchAlbumRequest,
): Promise<FetchResponse<SearchAlbumResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    const response = await apiFetch(`/albums?${queryParams.toString()}`, {
      method: "GET",
    });

    return response as FetchResponse<SearchAlbumResponse>;
  } catch (error) {
    console.error("[searchAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
