import { FetchResponse, apiFetch } from "../fetch";

import Track from "@/types/track";

interface PutTrackRequest {
  track: Track;
}

interface PutTrackResponse {
  track: Track;
}

export const putTrack = async (
  request: PutTrackRequest,
): Promise<FetchResponse<PutTrackResponse>> => {
  try {
    const response = await apiFetch(`/tracks/${request.track._id}`, {
      method: "PUT",
      body: JSON.stringify(request.track),
    });

    return response as FetchResponse<PutTrackResponse>;
  } catch (error) {
    console.error("[putTrack] error", error);

    throw error instanceof Error
      ? error
      : new Error("트랙 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};
