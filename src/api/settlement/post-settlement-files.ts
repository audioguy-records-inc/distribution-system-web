import { FetchResponse, apiFetch } from "../fetch";

import { FileInfo } from "@/types/file-info";
import SettlementFile from "@/types/settlement-file";

export interface PostSettlementFilesRequest {
  fileInfos: {
    filename: string;
    filePath: string;
  }[];
}

interface PostSettlementFilesResponse {
  settlementFileList: SettlementFile[];
}

export const postSettlementFiles = async (
  request: PostSettlementFilesRequest,
): Promise<FetchResponse<PostSettlementFilesResponse>> => {
  try {
    const response = await apiFetch("/settlements/files", {
      method: "POST",
      body: JSON.stringify(request.fileInfos),
    });

    return response as FetchResponse<PostSettlementFilesResponse>;
  } catch (error) {
    console.error("[postSettlementFiles] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 파일 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
