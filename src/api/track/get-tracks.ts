import { FetchResponse, apiFetch } from "../fetch";

import Track from "@/types/track";

interface GetTracksRequest {
  albumId: string;
}

interface GetTracksResponse {
  trackList: Track[];
}

export const getTracks = async (
  request: GetTracksRequest,
): Promise<FetchResponse<GetTracksResponse>> => {
  try {
    const response = await apiFetch(`/tracks?albumId=${request.albumId}`);

    return response as FetchResponse<GetTracksResponse>;
  } catch (error) {
    console.error("[getTracks] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
