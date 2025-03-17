import { DataCollectionName, FileType, urlList } from "@/types/upload";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postPreSignedUrls } from "@/api/uploads/post-pre-signed-urls";
import { postUploadId } from "@/api/uploads/post-upload-id";
import { putMultipart } from "@/api/uploads/put-multipart";
import { putUploadFile } from "@/api/uploads/put-upload-file";
import toast from "react-hot-toast";

interface UploadStore {
  isLoading: boolean;
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
      error: null,
      uploadToS3: async ({ file, fileType, dataCollectionName }) => {
        try {
          set({ isLoading: true });

          // 1. Upload ID 생성
          const uploadIdResult = await postUploadId({
            filename: file.name,
            fileType,
            dataCollectionName,
          });

          if (!uploadIdResult || uploadIdResult.error || !uploadIdResult.data) {
            throw new Error(uploadIdResult?.message || "업로드 ID 생성 실패");
          }

          const { uploadId, key } = uploadIdResult.data;

          // 2. Presigned URL 생성
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

          // 3. 파일 업로드
          const { etag } = await putUploadFile(
            presignedResult.data.urlList[0].url,
            file,
          );

          if (!etag) {
            throw new Error("파일 업로드 실패");
          }

          // 4. 멀티파트 업로드 완료
          const completeResult = await putMultipart({
            uploadId,
            key,
            partList: [{ ETag: etag, partNumber: 1 }],
            action: "complete",
          });
          console.log("moonsae completeResult", completeResult);
          if (!completeResult || completeResult.error || !completeResult.data) {
            throw new Error(
              completeResult?.message || "멀티파트 업로드 완료 실패",
            );
          }

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
          set({ isLoading: false });
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
    },
  ),
);
