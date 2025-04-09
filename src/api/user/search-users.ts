import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface SearchUsersRequest {
  __searchKeyword: string;
  __searchFields?: string;
  __limit?: number;
  __sortOption?: string;
}

interface SearchUsersResponse {
  userList: User[];
}

export const searchUsers = async (
  request: SearchUsersRequest,
): Promise<FetchResponse<SearchUsersResponse>> => {
  try {
    // 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }
    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "100");
    }
    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    }
    const response = await apiFetch(`/users?${queryParams.toString()}`, {
      method: "GET",
    });

    return response as FetchResponse<SearchUsersResponse>;
  } catch (error) {
    console.error("[searchUsers] error", error);
    throw error instanceof Error
      ? error
      : new Error("사용자 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};
