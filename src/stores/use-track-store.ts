import { createJSONStorage, persist } from "zustand/middleware";

import Track from "@/types/track";
import { create } from "zustand";
import { deleteTrack } from "@/api/track/delete-track";
import { getTrack } from "@/api/track/get-track";
import { getTracks } from "@/api/track/get-tracks";
import { postTrack } from "@/api/track/post-track";
import { putTrack } from "@/api/track/put-track";
import { searchTracks } from "@/api/track/search-tracks";
import toast from "react-hot-toast";

interface TrackStore {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;

  fetchTrack: (trackId: string) => Promise<Track | null>;
  fetchTracks: (albumId: string) => Promise<void>;
  createTrack: (track: Track) => Promise<void>;
  updateTrack: (track: Track) => Promise<void>;
  deleteTrack: (trackId: string) => Promise<void>;
  searchTracks: (
    searchKeyword: string,
    searchFields?: string,
  ) => Promise<Track[]>;
  resetTracks: () => void;
}

export const useTrackStore = create<TrackStore>()(
  persist(
    (set) => ({
      tracks: [],
      isLoading: false,
      error: null,

      fetchTrack: async (trackId: string) => {
        set({ isLoading: true });
        try {
          const response = await getTrack({ trackId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return response.data.track;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "트랙 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useTrackStore/fetchTrack] Fetch track failed.",
            error,
          );

          return null;
        } finally {
          set({ isLoading: false });
        }
      },
      fetchTracks: async (albumId: string) => {
        set({ isLoading: true });
        try {
          const response = await getTracks({ albumId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ tracks: response.data.trackList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "트랙 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useTrackStore/fetchTracks] Fetch tracks failed.",
            error,
          );

          set({ tracks: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createTrack: async (track: Track) => {
        set({ isLoading: true });
        try {
          const response = await postTrack({ trackList: [track] });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.trackList.length === 0) {
            throw new Error("트랙 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            tracks: [...state.tracks, response.data!.trackList[0]],
            error: null,
          }));

          toast.success("트랙이 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "트랙 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useTrackStore/postTrack] Post track failed.", error);
        } finally {
          set({ isLoading: false });
        }
      },
      updateTrack: async (track: Track) => {
        set({ isLoading: true });
        try {
          if (!track.albumId) {
            throw new Error("앨범 ID가 없습니다.");
          }

          const response = await putTrack({ track });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getTracks({
            albumId: track.albumId,
          });

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            tracks: fetchResponse.data!.trackList,
            error: null,
          }));

          toast.success("트랙이 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "트랙 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useTrackStore/updateTrack] Update track failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      deleteTrack: async (trackId: string) => {
        set({ isLoading: true });
        try {
          const response = await deleteTrack({ trackId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            tracks: state.tracks.filter((track) => track._id !== trackId),
            error: null,
          }));

          toast.success("트랙이 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "트랙 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useTrackStore/deleteTrack] Delete track failed.",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      searchTracks: async (searchKeyword: string, searchFields?: string) => {
        set({ isLoading: true });
        try {
          const __searchKeyword = searchKeyword;
          const __searchFields = searchFields;

          const response = await searchTracks({
            __searchKeyword,
            __searchFields,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            error: null,
          });

          return response.data!.trackList;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "트랙 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useTrackStore/searchTracks] Search tracks failed.",
            error,
          );
          set({ error: errorMessage });
          return [];
        } finally {
          set({ isLoading: false });
        }
      },
      resetTracks: () => {
        set({ tracks: [] });
      },
    }),
    {
      name: "track-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
