import { FetchResponse, apiFetch } from "../fetch";

import Video from "@/types/video";

interface PostVideoRequest {
  videoList: Video[];
}

interface PostVideoResponse {
  videoList: Video[];
}

export const postVideo = async (
  request: PostVideoRequest,
): Promise<FetchResponse<PostVideoResponse>> => {
  try {
    const response = await apiFetch("/videos", {
      method: "POST",
      body: JSON.stringify(request.videoList),
    });

    return response as FetchResponse<PostVideoResponse>;
  } catch (error) {
    console.error("[postVideo] error", error);

    throw error instanceof Error
      ? error
      : new Error("비디오 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
