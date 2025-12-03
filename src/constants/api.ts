const PROD_API_URL = "https://api-v1-distribution.sovo360.com";
const DEV_API_URL = "https://api-v1-test-distribution.sovo360.com";

const PROD_STORAGE_URL = "https://storage-distribution.sovo360.com";
const DEV_STORAGE_URL = "https://storage-test-distribution.sovo360.com";

// export const API_URL =
//   process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;

// export const STORAGE_URL =
//   process.env.NODE_ENV === "production" ? PROD_STORAGE_URL : DEV_STORAGE_URL;

export const API_URL = PROD_API_URL;
export const STORAGE_URL = PROD_STORAGE_URL;

// 이미지 URL을 생성하는 헬퍼 함수 추가
export const getFullUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // 경로가 슬래시로 시작하지 않으면 슬래시 추가
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${STORAGE_URL}${formattedPath}`;
};
