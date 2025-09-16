import { FetchResponse, apiFetch } from "../fetch";

import { AlbumFile } from "@/types/album";

interface GetAlbumFilesRequest {
  __skip?: number;
  __limit?: number;
  __sortOption?: string;
}

interface GetAlbumFilesResponse {
  albumFileList: AlbumFile[];
}

export const getAlbumFiles = async (
  request: GetAlbumFilesRequest = {},
): Promise<FetchResponse<GetAlbumFilesResponse>> => {
  try {
    const queryParams = new URLSearchParams();

    if (request.__skip !== undefined) {
      queryParams.append("__skip", request.__skip.toString());
    } else {
      queryParams.append("__skip", "0");
    }

    if (request.__limit !== undefined) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "10");
    }

    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const response = await apiFetch(`/albums/files?${queryParams.toString()}`);

    return response as FetchResponse<GetAlbumFilesResponse>;
  } catch (error) {
    console.error("[getAlbumFiles] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 파일 목록 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
