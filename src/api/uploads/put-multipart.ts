import { FetchResponse, apiFetch } from "../fetch";

interface PutMultipartRequest {
  uploadId: string;
  key: string;
  partList: {
    ETag: string;
    partNumber: number;
  }[];
  action: "complete" | "abort";
}

interface PutMultipartResponse {
  uploadResult: {
    $metadata: {
      httpStatusCode: number;
      requestId: string;
      extendedRequestId: string;
      attempts: number;
      totalRetryDelay: number;
    };
    ServerSideEncryption: string;
    Bucket: string;
    ETag: string;
    Key: string;
    Location: string;
  };
}

export const putMultipart = async (
  request: PutMultipartRequest,
): Promise<FetchResponse<PutMultipartResponse>> => {
  try {
    const response = await apiFetch(`/uploads/multipart`, {
      method: "PUT",
      body: JSON.stringify(request),
    });

    return response as FetchResponse<PutMultipartResponse>;
  } catch (error) {
    console.error("[putMultipart] error", error);

    throw error instanceof Error
      ? error
      : new Error("멀티파트 업로드 완료 중 알 수 없는 오류가 발생했습니다.");
  }
};
