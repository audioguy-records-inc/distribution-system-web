import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface SearchUserContractsRequest {
  __searchKeyword: string;
  __searchFields?: string;
  __limit?: number;
  __sortOption?: string;
}

interface SearchUserContractsResponse {
  userContractList: UserContract[];
}

export const searchUserContracts = async (
  request: SearchUserContractsRequest,
): Promise<FetchResponse<SearchUserContractsResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }
    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "100");
    }
    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const response = await apiFetch(
      `/user-contracts?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );

    return response as FetchResponse<SearchUserContractsResponse>;
  } catch (error) {
    console.error("[searchUserContracts] error", error);
    throw error instanceof Error
      ? error
      : new Error("권리자 계약 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
