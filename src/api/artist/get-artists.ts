import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface GetArtistsResponse {
  artistList: Artist[];
}

export const getArtists = async (): Promise<
  FetchResponse<GetArtistsResponse>
> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__limit", "100");
    queryParams.append("__sortOption", "createdAtDESC");

    const response = await apiFetch(`/artists?${queryParams.toString()}`);

    return response as FetchResponse<GetArtistsResponse>;
  } catch (error) {
    console.error("[getArtists] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
