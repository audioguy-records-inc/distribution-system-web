import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface SearchArtistRequest {
  __searchKeyword: string;
  __searchFields?: string;
  __limit?: number;
  __sortOption?: string;
}

interface SearchArtistResponse {
  artistList: Artist[];
}

export const searchArtists = async (
  request: SearchArtistRequest,
): Promise<FetchResponse<SearchArtistResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "100");
    }

    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "createdAtDESC");
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
