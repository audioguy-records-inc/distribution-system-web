import { FetchResponse, apiFetch } from "../fetch";

import Video from "@/types/video";

interface SearchVideoRequest {
  __searchKeyword: string;
  __kstStartDate: string;
  __kstEndDate: string;
  __searchFields?: string;
  __sortOption?: string;
  __skip?: number;
  __limit?: number;
}

interface SearchVideoResponse {
  videoList: Video[];
}

export const searchVideos = async (
  request: SearchVideoRequest,
): Promise<FetchResponse<SearchVideoResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    queryParams.append("__kstStartDate", request.__kstStartDate);
    queryParams.append("__kstEndDate", request.__kstEndDate);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    if (request.__skip) {
      queryParams.append("__skip", request.__skip.toString());
    }
    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    }

    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    }

    const response = await apiFetch(`/videos?${queryParams.toString()}`, {
      method: "GET",
    });

    return response as FetchResponse<SearchVideoResponse>;
  } catch (error) {
    console.error("[searchVideos] error", error);

    throw error instanceof Error
      ? error
      : new Error("비디오 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
