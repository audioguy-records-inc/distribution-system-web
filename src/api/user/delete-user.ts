import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface DeleteUserRequest {
  userId: string;
}

interface DeleteUserResponse {
  user: User;
}

export const deleteUser = async (
  request: DeleteUserRequest,
): Promise<FetchResponse<DeleteUserResponse>> => {
  try {
    const response = await apiFetch(`/users/${request.userId}`, {
      method: "DELETE",
    });

    return response as FetchResponse<DeleteUserResponse>;
  } catch (error) {
    console.error("[deleteUser] error", error);

    throw error instanceof Error
      ? error
      : new Error("권리사 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};
