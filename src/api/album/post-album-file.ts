import { FetchResponse, apiFetch } from "../fetch";

interface PostAlbumFileRequest {
  name: string;
  filePath: string;
}

interface AlbumFile {
  _id: string;
  name: string;
  filePath: string;
  state: string;
  result: string | null;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface PostAlbumFileResponse {
  albumFile: AlbumFile;
}

export const postAlbumFile = async (
  request: PostAlbumFileRequest,
): Promise<FetchResponse<PostAlbumFileResponse>> => {
  try {
    const response = await apiFetch("/albums/file", {
      method: "POST",
      body: JSON.stringify(request),
    });

    return response as FetchResponse<PostAlbumFileResponse>;
  } catch (error) {
    console.error("[postAlbumFile] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 파일 업로드 중 알 수 없는 오류가 발생했습니다.");
  }
};
