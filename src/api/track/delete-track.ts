import { FetchResponse, apiFetch } from "../fetch";

import Track from "@/types/track";

interface DeleteTrackRequest {
  trackId: string;
}

interface DeleteTrackResponse {
  track: Track;
}

export const deleteTrack = async (
  request: DeleteTrackRequest,
): Promise<FetchResponse<DeleteTrackResponse>> => {
  try {
    const response = await apiFetch(`/tracks/${request.trackId}`, {
      method: "DELETE",
    });

    return response as FetchResponse<DeleteTrackResponse>;
  } catch (error) {
    console.error("[deleteTrack] error", error);

    throw error instanceof Error
      ? error
      : new Error("트랙 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
