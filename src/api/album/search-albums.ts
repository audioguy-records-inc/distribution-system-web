import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface SearchAlbumRequest {
  __kstStartDate?: string;
  __kstEndDate?: string;
  __searchKeyword: string;
  __searchFields?: string;
  __skip?: number;
  __limit?: number;
  __sortOption?: string;
}

interface SearchAlbumResponse {
  albumList: Album[];
  totalCount: number;
}

export const searchAlbums = async (
  request: SearchAlbumRequest,
): Promise<FetchResponse<SearchAlbumResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__kstStartDate) {
      queryParams.append("__kstStartDate", request.__kstStartDate);
    }
    if (request.__kstEndDate) {
      queryParams.append("__kstEndDate", request.__kstEndDate);
    }
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    if (request.__skip) {
      queryParams.append("__skip", request.__skip.toString());
    }
    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "1000");
    }

    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const response = await apiFetch(`/albums?${queryParams.toString()}`, {
      method: "GET",
    });

    return response as FetchResponse<SearchAlbumResponse>;
  } catch (error) {
    console.error("[searchAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
