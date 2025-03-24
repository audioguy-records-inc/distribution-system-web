import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface DeleteArtistRequest {
  artistId: string;
}

interface DeleteArtistResponse {
  artist: Artist;
}

export const deleteArtist = async (
  request: DeleteArtistRequest,
): Promise<FetchResponse<DeleteArtistResponse>> => {
  try {
    const response = await apiFetch(`/artists/${request.artistId}`, {
      method: "DELETE",
    });

    return response as FetchResponse<DeleteArtistResponse>;
  } catch (error) {
    console.error("[deleteArtist] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
