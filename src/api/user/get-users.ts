import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface GetUsersResponse {
  userList: User[];
}

export const getUsers = async (): Promise<FetchResponse<GetUsersResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__limit", "100");
    queryParams.append("__sortOption", "createdAtDESC");

    const response = await apiFetch(`/users?${queryParams.toString()}`);

    return response as FetchResponse<GetUsersResponse>;
  } catch (error) {
    console.error("[getUsers] error", error);

    throw error instanceof Error
      ? error
      : new Error("사용자 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
