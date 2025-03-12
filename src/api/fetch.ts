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

  // jwt가 있을 때만 포함할 헤더 설정
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (jwt) {
    headers.Authorization = `${jwt}`;
  }

  // 요청 내용 로깅
  console.log(`[FETCH REQUEST] ${options.method || "GET"} ${url}`, {
    headers,
    ...options,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 응답 상태 먼저 확인
    if (!response.ok) {
      console.error(
        `[${options.method || "GET"}][${response.status}] ${response.url}`,
      );
      return {
        status: false,
        message: {
          error: {
            code: response.status.toString(),
            message: response.statusText,
          },
        },
      };
    }

    // JSON 파싱 시도
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("[FETCH][PARSE ERROR]", parseError);
      return {
        status: false,
        message: {
          error: { code: "0001", message: "Invalid JSON response" },
        },
      };
    }

    // 응답 내용 로깅
    console.log(`[FETCH RESPONSE] ${options.method || "GET"} ${url}`, {
      status: response.status,
      data: data,
    });

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
