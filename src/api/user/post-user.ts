import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface PostUserRequest {
  userList: User[];
}

interface PostUserResponse {
  userList: User[];
}

export const postUser = async (
  request: PostUserRequest,
): Promise<FetchResponse<PostUserResponse>> => {
  try {
    const response = await apiFetch("/users", {
      method: "POST",
      body: JSON.stringify(request.userList),
    });

    return response as FetchResponse<PostUserResponse>;
  } catch (error) {
    console.error("[postUser] error", error);

    throw error instanceof Error
      ? error
      : new Error("유저 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};
