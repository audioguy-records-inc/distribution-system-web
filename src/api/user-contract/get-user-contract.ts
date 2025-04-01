import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface GetUserContractRequest {
  userContractId: string;
}

interface GetUserContractResponse {
  userContract: UserContract;
}

export const getUserContract = async (
  request: GetUserContractRequest,
): Promise<FetchResponse<GetUserContractResponse>> => {
  try {
    const response = await apiFetch(
      `/user-contracts/${request.userContractId}`,
    );
    return response as FetchResponse<GetUserContractResponse>;
  } catch (error) {
    console.error("[getUserContract] error", error);
    throw error instanceof Error
      ? error
      : new Error("유저 계약 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
