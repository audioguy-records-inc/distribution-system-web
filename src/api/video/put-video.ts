import { FetchResponse, apiFetch } from "../fetch";

import Video from "@/types/video";

interface PutVideoRequest {
  video: Video;
}

interface PutVideoResponse {
  video: Video;
}

export const putVideo = async (
  request: PutVideoRequest,
): Promise<FetchResponse<PutVideoResponse>> => {
  try {
    const response = await apiFetch(`/videos/${request.video._id}`, {
      method: "PUT",
      body: JSON.stringify(request.video),
    });

    return response as FetchResponse<PutVideoResponse>;
  } catch (error) {
    console.error("[putVideo] error", error);

    throw error instanceof Error
      ? error
      : new Error("비디오 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};
