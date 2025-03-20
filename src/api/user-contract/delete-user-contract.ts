import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface DeleteUserContractRequest {
  userContractId: string;
}

interface DeleteUserContractResponse {
  userContract: UserContract;
}

export const deleteUserContract = async (
  request: DeleteUserContractRequest,
): Promise<FetchResponse<DeleteUserContractResponse>> => {
  try {
    const response = await apiFetch(
      `/user-contracts/${request.userContractId}`,
      {
        method: "DELETE",
      },
    );

    return response as FetchResponse<DeleteUserContractResponse>;
  } catch (error) {
    console.error("[deleteUserContract] error", error);

    throw error instanceof Error
      ? error
      : new Error("유저 계약 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
