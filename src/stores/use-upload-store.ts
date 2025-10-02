import { DataCollectionName, FileType, urlList } from "@/types/upload";
import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import { postPreSignedUrls } from "@/api/uploads/post-pre-signed-urls";
import { postUploadId } from "@/api/uploads/post-upload-id";
import { putMultipart } from "@/api/uploads/put-multipart";
import { putUploadFile } from "@/api/uploads/put-upload-file";
import toast from "react-hot-toast";

// 진행률 콜백과 함께 파일 업로드하는 함수
const putUploadFileWithProgress = async (
  presignedUrl: string,
  file: File | Blob,
  onProgress: (progress: number) => void,
): Promise<{ etag: string }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 업로드 진행률 이벤트 리스너
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    });

    // 업로드 완료 이벤트 리스너
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader("ETag")?.replace(/"/g, "") || "";
        resolve({ etag });
      } else {
        reject(new Error(`업로드 실패 (${xhr.status}): ${xhr.statusText}`));
      }
    });

    // 에러 이벤트 리스너
    xhr.addEventListener("error", () => {
      reject(new Error("네트워크 오류로 업로드에 실패했습니다."));
    });

    // PUT 요청 시작
    xhr.open("PUT", presignedUrl);
    xhr.send(file);
  });
};

interface UploadStore {
  isLoading: boolean;
  uploadProgress: number;
  error: string | null;
  uploadToS3: (params: {
    file: File;
    fileType: FileType;
    dataCollectionName: DataCollectionName;
  }) => Promise<{ name: string; filePath: string } | null>;
  createUploadId: ({
    filename,
    fileType,
    dataCollectionName,
  }: {
    filename: string;
    fileType: FileType;
    dataCollectionName: DataCollectionName;
  }) => Promise<{ uploadId: string; key: string } | null>;

  createPreSignedUrls: ({
    uploadId,
    key,
    partCount,
  }: {
    uploadId: string;
    key: string;
    partCount: number;
  }) => Promise<{ urlList: urlList[] } | null>;

  updateUploadFile: (
    presignedUrl: string,
    file: File | Blob,
  ) => Promise<string | null>;

  updateMultipart: ({
    uploadId,
    key,
    partList,
    action,
  }: {
    uploadId: string;
    key: string;
    partList: { ETag: string; partNumber: number }[];
    action: "complete" | "abort";
  }) => Promise<boolean>;
}

export const useUploadStore = create<UploadStore>()(
  persist(
    (set) => ({
      isLoading: false,
      uploadProgress: 0,
      error: null,
      uploadToS3: async ({ file, fileType, dataCollectionName }) => {
        try {
          set({ isLoading: true, uploadProgress: 0 });

          // 1. Upload ID 생성 (10%)
          const uploadIdResult = await postUploadId({
            filename: file.name,
            fileType,
            dataCollectionName,
          });

          if (!uploadIdResult || uploadIdResult.error || !uploadIdResult.data) {
            throw new Error(uploadIdResult?.message || "업로드 ID 생성 실패");
          }

          set({ uploadProgress: 10 });

          const { uploadId, key } = uploadIdResult.data;

          // 2. Presigned URL 생성 (20%)
          const presignedResult = await postPreSignedUrls({
            uploadId,
            key,
            partCount: 1,
          });

          if (
            !presignedResult ||
            presignedResult.error ||
            !presignedResult.data
          ) {
            throw new Error(
              presignedResult?.message || "Presigned URL 생성 실패",
            );
          }

          set({ uploadProgress: 20 });

          // 3. 파일 업로드 (20% -> 80%)
          const { etag } = await putUploadFileWithProgress(
            presignedResult.data.urlList[0].url,
            file,
            (progress) => {
              set({ uploadProgress: 20 + (progress * 60) / 100 });
            },
          );

          if (!etag) {
            throw new Error("파일 업로드 실패");
          }

          set({ uploadProgress: 80 });

          // 4. 멀티파트 업로드 완료 (80% -> 100%)
          const completeResult = await putMultipart({
            uploadId,
            key,
            partList: [{ ETag: etag, partNumber: 1 }],
            action: "complete",
          });

          if (!completeResult || completeResult.error || !completeResult.data) {
            throw new Error(
              completeResult?.message || "멀티파트 업로드 완료 실패",
            );
          }

          set({ uploadProgress: 100 });

          return { name: file.name, filePath: `/${key}` };
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "파일 업로드 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);
          console.error("[uploadToS3] error", error);
          return null;
        } finally {
          set({ isLoading: false, uploadProgress: 0 });
        }
      },
      createUploadId: async ({ filename, fileType, dataCollectionName }) => {
        try {
          set({ isLoading: true });
          const response = await postUploadId({
            filename,
            fileType,
            dataCollectionName,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return response.data;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "업로드 ID 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[postUploadId] error", error);

          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      createPreSignedUrls: async ({ uploadId, key, partCount }) => {
        try {
          set({ isLoading: true });
          const response = await postPreSignedUrls({
            uploadId,
            key,
            partCount,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return response.data;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "업로드 전 서명 주소 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[postPreSignedUrls] error", error);

          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      updateUploadFile: async (presignedUrl: string, file: File | Blob) => {
        try {
          set({ isLoading: true });
          const response = await putUploadFile(presignedUrl, file);

          if (!response || !response.etag) {
            throw new Error("파일 업로드 실패");
          }

          return response.etag;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "파일 업로드 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);
          console.error("[putUploadFile] error", error);
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      updateMultipart: async ({ uploadId, key, partList, action }) => {
        try {
          set({ isLoading: true });
          const response = await putMultipart({
            uploadId,
            key,
            partList,
            action,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "멀티파트 업로드 완료 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);
          console.error("[putMultipart] error", error);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "upload",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
