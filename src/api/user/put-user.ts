import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface PutUserRequest {
  user: User;
}

interface PutUserResponse {
  user: User;
}

export const putUser = async (
  request: PutUserRequest,
): Promise<FetchResponse<PutUserResponse>> => {
  try {
    const response = await apiFetch(`/users/${request.user._id}`, {
      method: "PUT",
      body: JSON.stringify(request.user),
    });

    return response as FetchResponse<PutUserResponse>;
  } catch (error) {
    console.error("[putUser] error", error);

    throw error instanceof Error
      ? error
      : new Error("권리사 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};
