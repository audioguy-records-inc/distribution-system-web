import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface GetUsersResponse {
  userList: User[];
}

export const getUsers = async (): Promise<FetchResponse<GetUsersResponse>> => {
  try {
    const response = await apiFetch("/users");

    return response as FetchResponse<GetUsersResponse>;
  } catch (error) {
    console.error("[getUsers] error", error);

    throw error instanceof Error
      ? error
      : new Error("사용자 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
