import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface PutUserContractRequest {
  userContract: UserContract;
}

interface PutUserContractResponse {
  userContract: UserContract;
}

export const putUserContract = async (
  request: PutUserContractRequest,
): Promise<FetchResponse<PutUserContractResponse>> => {
  try {
    const response = await apiFetch(
      `/user-contracts/${request.userContract._id}`,
      {
        method: "PUT",
        body: JSON.stringify(request.userContract),
      },
    );

    return response as FetchResponse<PutUserContractResponse>;
  } catch (error) {
    console.error("[putUserContract] error", error);

    throw error instanceof Error
      ? error
      : new Error("유저 계약 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};
