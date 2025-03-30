import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface FilterUserContractsRequest {
  query: string;
}

interface FilterUserContractsResponse {
  userContractList: UserContract[];
}

export const filterUserContracts = async (
  request: FilterUserContractsRequest,
): Promise<FetchResponse<FilterUserContractsResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("query", request.query);

    const response = await apiFetch(
      `/user-contracts?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );
    return response as FetchResponse<FilterUserContractsResponse>;
  } catch (error) {
    console.error("[filterUserContracts] error", error);
    throw error instanceof Error
      ? error
      : new Error("DSP 계약 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
