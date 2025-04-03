import { FetchResponse, apiFetch } from "../fetch";

import Track from "@/types/track";
interface GetTrackRequest {
  trackId: string;
}

interface GetTrackResponse {
  track: Track;
}

export const getTrack = async (
  request: GetTrackRequest,
): Promise<FetchResponse<GetTrackResponse>> => {
  try {
    const response = await apiFetch(`/tracks/${request.trackId}`);
    return response as FetchResponse<GetTrackResponse>;
  } catch (error) {
    console.error("[getTrack] error", error);
    throw error instanceof Error
      ? error
      : new Error("트랙 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
