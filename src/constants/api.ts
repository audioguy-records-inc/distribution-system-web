const PROD_API_URL = "https://api-v1-distribution.sovo360.com";
const DEV_API_URL = "https://api-v1-test-distribution.sovo360.com";

const PROD_STORAGE_URL = "https://storage-distribution.sovo360.com";
const DEV_STORAGE_URL = "https://storage-test-distribution.sovo360.com";

export const API_URL =
  process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;

export const STORAGE_URL =
  process.env.NODE_ENV === "production" ? PROD_STORAGE_URL : DEV_STORAGE_URL;
