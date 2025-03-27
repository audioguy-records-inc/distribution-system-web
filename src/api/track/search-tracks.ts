import { FetchResponse, apiFetch } from "../fetch";

import Track from "@/types/track";

interface SearchTracksRequest {
  __searchKeyword: string;
  __searchFields?: string;
}

interface SearchTracksResponse {
  trackList: Track[];
}

export const searchTracks = async (
  request: SearchTracksRequest,
): Promise<FetchResponse<SearchTracksResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    const response = await apiFetch(`/tracks?${queryParams.toString()}`, {
      method: "GET",
    });

    return response as FetchResponse<SearchTracksResponse>;
  } catch (error) {
    console.error("[searchTracks] error", error);

    throw error instanceof Error
      ? error
      : new Error("트랙 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
