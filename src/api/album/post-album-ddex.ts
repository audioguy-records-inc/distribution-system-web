import { FetchResponse, apiFetch } from "../fetch";

type PostAlbumDdexRequest = Record<string, never>;

interface SqsMessageSendResult {
  sqsMessageId: string;
  albumId: string;
  albumTransferHistoryId: string;
  releaseType: string;
  UPC: string;
  isQueued: boolean;
}

interface PostAlbumDdexResponse {
  message: string;
  sqsMessageSendResultList: SqsMessageSendResult[];
}

export const postAlbumDdex = async (
  albumId: string,
  request: PostAlbumDdexRequest = {},
): Promise<FetchResponse<PostAlbumDdexResponse>> => {
  try {
    const response = await apiFetch(`/albums/${albumId}/ddex`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    return response as FetchResponse<PostAlbumDdexResponse>;
  } catch (error) {
    console.error("[postAlbumDdex] error", error);

    throw error instanceof Error
      ? error
      : new Error("앨범 DDEX 전송 중 알 수 없는 오류가 발생했습니다.");
  }
};
