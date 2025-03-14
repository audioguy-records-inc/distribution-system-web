import { FetchResponse, apiFetch } from "../fetch";

import { urlList } from "@/types/upload";

interface PostPreSignedUrlsRequest {
  uploadId: string;
  key: string;
  partCount: number;
}

interface PostPreSignedUrlsResponse {
  urlList: urlList[];
}

export const postPreSignedUrls = async (
  request: PostPreSignedUrlsRequest,
): Promise<FetchResponse<PostPreSignedUrlsResponse>> => {
  try {
    const response = await apiFetch(`/uploads/multipart/pre-signed-urls`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    return response as FetchResponse<PostPreSignedUrlsResponse>;
  } catch (error) {
    console.error("[postPreSignedUrls] error", error);

    throw error instanceof Error
      ? error
      : new Error(
          "업로드 전 서명 주소 생성 중 알 수 없는 오류가 발생했습니다.",
        );
  }
};
