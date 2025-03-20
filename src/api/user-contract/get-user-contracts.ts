import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface GetUserContractsResponse {
  userContractList: UserContract[];
}

export const getUserContracts = async (): Promise<
  FetchResponse<GetUserContractsResponse>
> => {
  try {
    const response = await apiFetch("/user-contracts");

    return response as FetchResponse<GetUserContractsResponse>;
  } catch (error) {
    console.error("[getUserContracts] error", error);

    throw error instanceof Error
      ? error
      : new Error("유저 계약 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
