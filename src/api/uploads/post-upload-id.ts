import { DataCollectionName, FileType } from "../../types/upload";
import { FetchResponse, apiFetch } from "../fetch";

interface PostUploadIdResponse {
  uploadId: string;
  key: string;
}

interface PostUploadIdRequest {
  filename: string;
  fileType: FileType;
  dataCollectionName: DataCollectionName;
}

export const postUploadId = async (
  request: PostUploadIdRequest,
): Promise<FetchResponse<PostUploadIdResponse>> => {
  try {
    const response = await apiFetch("/uploads/multipart/upload-id", {
      method: "POST",
      body: JSON.stringify(request),
    });

    return response as FetchResponse<PostUploadIdResponse>;
  } catch (error) {
    console.error("[postUploadId] error", error);

    throw error instanceof Error
      ? error
      : new Error("업로드 ID 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
