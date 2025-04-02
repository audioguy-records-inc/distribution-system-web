import { FetchResponse, apiFetch } from "../fetch";

import Video from "@/types/video";

interface DeleteVideoRequest {
  videoId: string;
}

interface DeleteVideoResponse {
  video: Video;
}

export const deleteVideo = async (
  request: DeleteVideoRequest,
): Promise<FetchResponse<DeleteVideoResponse>> => {
  try {
    const response = await apiFetch(`/videos/${request.videoId}`, {
      method: "DELETE",
    });

    return response as FetchResponse<DeleteVideoResponse>;
  } catch (error) {
    console.error("[deleteVideo] error", error);

    throw error instanceof Error
      ? error
      : new Error("비디오 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
