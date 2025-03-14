import { API_URL } from "@/constants/api";
import { useUserStore } from "@/stores/use-user-store";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export interface FetchResponse<T> {
  error: boolean;
  data?: T;
  message: string;
}

export const apiFetch = async <T>(
  path: string,
  options: FetchOptions = {},
): Promise<FetchResponse<T>> => {
  const jwt = useUserStore.getState().jsonWebToken;
  const url = `${API_URL}${path}`;

  // jwt가 있을 때만 포함할 헤더 설정
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (jwt) {
    headers.Authorization = `jwt ${jwt}`;
  }

  // 요청 내용 로깅
  console.log(`[FETCH REQUEST] ${options.method || "GET"} ${url}`, {
    headers,
    body: options.body ? JSON.parse(options.body as string) : undefined,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`[FETCH RESPONSE] ${options.method || "GET"} ${url}`, {
        status: response.status,
        data,
      });
      throw new Error(data.message);
    }

    console.log(`[FETCH RESPONSE] ${options.method || "GET"} ${url}`, {
      status: response.status,
      data,
    });

    return data as FetchResponse<T>;
  } catch (error) {
    console.error("[apiFetch] error", error);
    return {
      error: true,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      data: undefined,
    };
  }
};
