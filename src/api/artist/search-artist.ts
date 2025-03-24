import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface SearchArtistRequest {
  __searchKeyword: string;
  __searchFields?: string;
}

interface SearchArtistResponse {
  artistList: Artist[];
}

export const searchArtist = async (
  request: SearchArtistRequest,
): Promise<FetchResponse<SearchArtistResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    const response = await apiFetch(`/artists?${queryParams.toString()}`, {
      method: "GET",
    });

    return response as FetchResponse<SearchArtistResponse>;
  } catch (error) {
    console.error("[searchArtist] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
