import { FetchResponse, apiFetch } from "../fetch";

import { Artist } from "@/types/artist";

interface PostArtistRequest {
  artistList: Artist[];
}

interface PostArtistResponse {
  artistList: Artist[];
}

export const postArtist = async (
  request: PostArtistRequest,
): Promise<FetchResponse<PostArtistResponse>> => {
  try {
    const response = await apiFetch("/artists", {
      method: "POST",
      body: JSON.stringify(request.artistList),
    });

    return response as FetchResponse<PostArtistResponse>;
  } catch (error) {
    console.error("[postArtist] error", error);

    throw error instanceof Error
      ? error
      : new Error("아티스트 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
