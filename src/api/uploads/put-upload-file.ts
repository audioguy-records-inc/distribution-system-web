import { FetchResponse } from "../fetch";

interface PutUploadFileResponse {
  etag: string;
}

export const putUploadFile = async (
  presignedUrl: string,
  file: File | Blob,
): Promise<PutUploadFileResponse> => {
  console.log("presignedUrl", presignedUrl);
  console.log("file", file.type);
  try {
    console.log("업로드 시작:", {
      url: presignedUrl,
      fileType: file.type,
      fileSize: file.size,
    });

    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      // headers: {
      //   "Content-Type": file.type,
      // },
    });

    console.log("업로드 응답:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        responseBody: errorText,
        headers: Object.fromEntries(response.headers.entries()),
        url: presignedUrl,
        fileType: file.type,
        fileSize: file.size,
      };

      console.error("업로드 실패 상세:", errorDetails);
      throw new Error(
        `업로드 실패 (${response.status}): ${errorText}\n상세: ${JSON.stringify(
          errorDetails,
        )}`,
      );
    }
    console.log("업로드 성공");
    console.log("response etag", response.headers.get("ETag"));
    return {
      etag: response.headers.get("ETag")?.replace(/"/g, "") ?? "",
    };
  } catch (error) {
    console.error("[putUploadFile] error", error);
    throw error instanceof Error
      ? error
      : new Error("파일 업로드 중 알 수 없는 오류가 발생했습니다.");
  }
};
