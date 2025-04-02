import { FetchResponse, apiFetch } from "../fetch";

import Video from "@/types/video";

interface GetVideosResponse {
  videoList: Video[];
}

export const getVideos = async (): Promise<
  FetchResponse<GetVideosResponse>
> => {
  try {
    const response = await apiFetch("/videos");

    return response as FetchResponse<GetVideosResponse>;
  } catch (error) {
    console.error("[getVideos] error", error);

    throw error instanceof Error
      ? error
      : new Error("비디오 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
