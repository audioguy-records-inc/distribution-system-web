import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface GetUserContractsResponse {
  userContractList: UserContract[];
}

export const getUserContracts = async (
  searchQuery?: string,
): Promise<FetchResponse<GetUserContractsResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__limit", "100");
    queryParams.append("__sortOption", "createdAtDESC");

    const url = searchQuery
      ? `/user-contracts?${searchQuery}&${queryParams.toString()}`
      : `/user-contracts?${queryParams.toString()}`;

    const response = await apiFetch(url);
    return response as FetchResponse<GetUserContractsResponse>;
  } catch (error) {
    console.error("[getUserContracts] error", error);

    throw error instanceof Error
      ? error
      : new Error("유저 계약 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
