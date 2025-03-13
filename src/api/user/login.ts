import { FetchResponse, apiFetch } from "../fetch";

import { User } from "@/types/user";

interface LoginResponse {
  user: User;
  isAdmin: boolean;
  jsonWebToken: string;
  isLogined?: boolean;
}

export const login = async (
  account: string,
  password: string,
): Promise<FetchResponse<LoginResponse>> => {
  try {
    const response = await apiFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ account, password }),
    });

    return response as FetchResponse<LoginResponse>;
  } catch (error) {
    console.error("[login] error", error);

    throw error instanceof Error
      ? error
      : new Error("로그인 중 알 수 없는 오류가 발생했습니다.");
  }
};
