import { User } from "@/types/user";
import { apiFetch } from "../fetch";

interface LoginResponse {
  status: boolean;
  data: {
    user: User;
    jsonWebToken: string;
    isAdmin: boolean;
  } | null;
  message: {
    error: {
      code: string;
      message: string;
    };
  };
}

export const login = async (
  account: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify({ account, password }),
  });

  return response as LoginResponse;
};
