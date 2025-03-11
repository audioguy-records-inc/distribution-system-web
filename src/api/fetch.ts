import { API_URL } from "@/constants/api";
import { useUserStore } from "@/stores/use-user-store";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface FetchResponse<T> {
  status: boolean;
  data?: T;
  message?: {
    error: {
      code: string;
      message: string;
    };
  };
}

export const apiFetch = async <T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<FetchResponse<T>> => {
  const jwt = useUserStore.getState().jsonWebToken;
  const url = `${API_URL}${path}`;

  // 요청 내용 로깅
  console.log(`[FETCH REQUEST] ${options.method || "GET"} ${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
      ...options.headers,
    },
    ...options,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    // 응답 내용 로깅
    console.log(`[FETCH RESPONSE] ${options.method || "GET"} ${url}`, {
      status: response.status,
      data: data,
    });

    if (!response.ok) {
      console.error(
        `[${options.method || "GET"}][${response.status}] ${response.url}`,
        data,
      );
      return { status: false, message: data };
    }

    return { status: true, data };
  } catch (error) {
    console.error("[FETCH][ERROR]", error);
    return {
      status: false,
      message: {
        error: { code: "0000", message: "Network error or invalid response" },
      },
    };
  }
};
