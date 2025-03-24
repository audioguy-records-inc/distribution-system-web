import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface GetArtistsResponse {
  artistList: Artist[];
}

export const getArtists = async (): Promise<
  FetchResponse<GetArtistsResponse>
> => {
  try {
    const response = await apiFetch("/artists");

    return response as FetchResponse<GetArtistsResponse>;
  } catch (error) {
    console.error("[getArtists] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
