import { FetchResponse, apiFetch } from "../fetch";

interface DeleteAlbumRequest {
  albumId: string;
}

interface DeleteAlbumResponse {
  albumId: string;
}

export const deleteAlbum = async (
  request: DeleteAlbumRequest,
): Promise<FetchResponse<DeleteAlbumResponse>> => {
  try {
    const response = await apiFetch(`/albums/${request.albumId}`, {
      method: "DELETE",
    });

    return response as FetchResponse<DeleteAlbumResponse>;
  } catch (error) {
    console.error("[deleteAlbum] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
