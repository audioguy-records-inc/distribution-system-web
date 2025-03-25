import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface GetArtistRequest {
  artistId: string;
}

interface GetArtistResponse {
  artist: Artist;
}

export const getArtist = async (
  request: GetArtistRequest,
): Promise<FetchResponse<GetArtistResponse>> => {
  try {
    const response = await apiFetch(`/artists/${request.artistId}`);

    return response as FetchResponse<GetArtistResponse>;
  } catch (error) {
    console.error("[getArtist] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
