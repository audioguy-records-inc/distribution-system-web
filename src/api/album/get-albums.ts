import { FetchResponse, apiFetch } from "../fetch";

import Album from "@/types/album";

interface GetAlbumResponse {
  albumList: Album[];
  totalCount: number;
}

interface GetAlbumsParams {
  __skip?: number;
  __limit?: number;
  __sortOption?: string;
}

export const getAlbums = async (
  params?: GetAlbumsParams,
): Promise<FetchResponse<GetAlbumResponse>> => {
  try {
    const queryParams = new URLSearchParams();

    // 기본값 설정
    const skip = params?.__skip || 0;
    const limit = params?.__limit || 100;
    const sortOption = params?.__sortOption || "createdAtDESC";

    queryParams.append("__skip", skip.toString());
    queryParams.append("__limit", limit.toString());
    queryParams.append("__sortOption", sortOption);

    const response = await apiFetch(`/albums?${queryParams.toString()}`);

    return response as FetchResponse<GetAlbumResponse>;
  } catch (error) {
    console.error("[getAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
