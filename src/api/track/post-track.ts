import { FetchResponse, apiFetch } from "../fetch";

import Track from "@/types/track";

interface PostTrackRequest {
  trackList: Track[];
}

interface PostTrackResponse {
  trackList: Track[];
}

export const postTrack = async (
  request: PostTrackRequest,
): Promise<FetchResponse<PostTrackResponse>> => {
  try {
    const response = await apiFetch("/tracks", {
      method: "POST",
      body: JSON.stringify(request.trackList),
    });

    return response as FetchResponse<PostTrackResponse>;
  } catch (error) {
    console.error("[postTrack] error", error);

    throw error instanceof Error
      ? error
      : new Error("트랙 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
