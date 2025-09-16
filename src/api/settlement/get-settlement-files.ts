import { FetchResponse, apiFetch } from "../fetch";

import SettlementFile from "@/types/settlement-file";

export interface GetSettlementFilesRequest {
  __skip?: number;
  __limit?: number;
  __sortOption?: string;
}

interface GetSettlementFilesResponse {
  settlementFileList: SettlementFile[];
}

export const getSettlementFiles = async (
  request: GetSettlementFilesRequest,
): Promise<FetchResponse<GetSettlementFilesResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    if (request.__skip) queryParams.append("__skip", request.__skip.toString());
    if (request.__limit)
      queryParams.append("__limit", request.__limit.toString());
    else {
      queryParams.append("__limit", "100");
    }
    if (request.__sortOption)
      queryParams.append("__sortOption", request.__sortOption);
    else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const response = await apiFetch(
      `/settlements/files?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );

    return response as FetchResponse<GetSettlementFilesResponse>;
  } catch (error) {
    console.error("[getSettlementFiles] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 파일 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
