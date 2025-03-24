import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface PutArtistRequest {
  artist: Artist;
}

interface PutArtistResponse {
  artist: Artist;
}

export const putArtist = async (
  request: PutArtistRequest,
): Promise<FetchResponse<PutArtistResponse>> => {
  try {
    const response = await apiFetch(`/artists/${request.artist._id}`, {
      method: "PUT",
      body: JSON.stringify(request.artist),
    });

    return response as FetchResponse<PutArtistResponse>;
  } catch (error) {
    console.error("[putArtist] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};
