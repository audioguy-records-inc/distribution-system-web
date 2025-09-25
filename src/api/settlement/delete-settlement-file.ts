import { FetchResponse, apiFetch } from "../fetch";

import { SettlementFile } from "@/types/settlement-file";

export interface DeleteSettlementFileRequest {
  settlementFileId: string;
}

interface DeleteSettlementFileResponse {
  settlementFile: SettlementFile;
}

export const deleteSettlementFile = async (
  request: DeleteSettlementFileRequest,
): Promise<FetchResponse<DeleteSettlementFileResponse>> => {
  try {
    const response = await apiFetch(
      `/settlements/files/${request.settlementFileId}`,
      {
        method: "DELETE",
      },
    );

    return response as FetchResponse<DeleteSettlementFileResponse>;
  } catch (error) {
    console.error("[deleteSettlementFile] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 파일 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
