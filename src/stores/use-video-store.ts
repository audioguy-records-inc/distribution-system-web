import { createJSONStorage, persist } from "zustand/middleware";

import Video from "@/types/video";
import { create } from "zustand";
import { deleteVideo } from "@/api/video/delete-video";
import { getVideos } from "@/api/video/get-videos";
import { postVideo } from "@/api/video/post-video";
import { putVideo } from "@/api/video/put-video";
import { searchVideos } from "@/api/video/search-videos";
import toast from "react-hot-toast";

interface VideoStore {
  newVideo: Video | null;
  videos: Video[];
  isLoading: boolean;
  error: string | null;

  fetchVideos: () => Promise<void>;
  createVideo: (video: Video) => Promise<void>;
  updateVideo: (video: Video, isNewVideo: boolean) => Promise<void>;
  deleteVideo: (videoId: string) => Promise<void>;
  searchVideos: (params: {
    __searchKeyword: string;
    __kstStartDate?: string;
    __kstEndDate?: string;
    __searchFields?: string;
    __sortOption?: string;
    __skip?: number;
    __limit?: number;
  }) => Promise<void>;

  resetNewVideo: () => void;
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      newVideo: null,
      videos: [],
      isLoading: false,
      error: null,

      fetchVideos: async () => {
        set({ isLoading: true });
        try {
          const response = await getVideos();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ videos: response.data.videoList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "영상 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useVideoStore/fetchVideos] Fetch videos failed.",
            error,
          );

          set({ videos: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createVideo: async (video: Video) => {
        set({ isLoading: true });
        try {
          const response = await postVideo({ videoList: [video] });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.videoList.length === 0) {
            throw new Error("영상 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            videos: [response.data!.videoList[0], ...state.videos],
            newVideo: response.data!.videoList[0],
            error: null,
          }));

          toast.success("영상이 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "영상 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useVideoStore/postVideo] Post video failed.", error);
        } finally {
          set({ isLoading: false });
        }
      },
      updateVideo: async (video: Video, isNewVideo: boolean = false) => {
        set({ isLoading: true });
        try {
          const response = await putVideo({ video });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getVideos();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            videos: fetchResponse.data!.videoList,
            error: null,
          }));

          if (isNewVideo) {
            set({ newVideo: response.data.video });
          }
          toast.success("영상이 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "영상 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useVideoStore/updateVideo] Update video failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      deleteVideo: async (videoId: string) => {
        set({ isLoading: true });
        try {
          const response = await deleteVideo({ videoId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            videos: state.videos.filter((video) => video._id !== videoId),
            error: null,
          }));

          toast.success("영상이 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "영상 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useVideoStore/deleteVideo] Delete video failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      searchVideos: async (params: {
        __searchKeyword: string;
        __kstStartDate?: string;
        __kstEndDate?: string;
        __searchFields?: string;
        __sortOption?: string;
        __skip?: number;
        __limit?: number;
      }) => {
        set({ isLoading: true });
        try {
          const response = await searchVideos(params);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            videos: response.data!.videoList,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "영상 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useVideoStore/searchVideos] Search videos failed.",
            error,
          );
          set({ videos: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      resetNewVideo: () => {
        set({ newVideo: null });
      },
    }),
    {
      name: "video-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ newVideo: state.newVideo }),
    },
  ),
);
