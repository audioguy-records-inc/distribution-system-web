import { FetchResponse, apiFetch } from "../fetch";

import Video from "@/types/video";

interface GetVideoRequest {
  videoId: string;
}

interface GetVideoResponse {
  video: Video;
}

export const getVideo = async (
  request: GetVideoRequest,
): Promise<FetchResponse<GetVideoResponse>> => {
  try {
    const response = await apiFetch(`/videos/${request.videoId}`);

    return response as FetchResponse<GetVideoResponse>;
  } catch (error) {
    console.error("[getVideo] error", error);

    throw error instanceof Error
      ? error
      : new Error("비디오 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
