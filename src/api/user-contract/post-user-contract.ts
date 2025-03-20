import { FetchResponse, apiFetch } from "../fetch";

import UserContract from "@/types/user-contract";

interface PostUserContractRequest {
  userContractList: UserContract[];
}

interface PostUserContractResponse {
  userContractList: UserContract[];
}

export const postUserContract = async (
  request: PostUserContractRequest,
): Promise<FetchResponse<PostUserContractResponse>> => {
  try {
    const response = await apiFetch("/user-contracts", {
      method: "POST",
      body: JSON.stringify(request.userContractList),
    });

    return response as FetchResponse<PostUserContractResponse>;
  } catch (error) {
    console.error("[postUserContract] error", error);

    throw error instanceof Error
      ? error
      : new Error("유저 계약 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
