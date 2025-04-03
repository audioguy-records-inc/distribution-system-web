import { Announcement, AnnouncementType } from "@/types/announcement";

import { create } from "zustand";
import { deleteAnnouncement } from "@/api/announcement/delete-announcement";
import { getAnnouncements } from "@/api/announcement/get-announcements";
import { persist } from "zustand/middleware";
import { postAnnouncement } from "@/api/announcement/post-announcement";
import { putAnnouncement } from "@/api/announcement/put-announcement";
import { searchAnnouncement } from "@/api/announcement/search-aanouncement";
import toast from "react-hot-toast";

interface AnnouncementStore {
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;

  fetchAnnouncements: () => Promise<void>;
  createAnnouncement: (announcement: Announcement) => Promise<void>;
  updateAnnouncement: (announcement: Announcement) => Promise<void>;
  deleteAnnouncement: (announcementId: string) => Promise<void>;
  searchAnnouncements: (params: {
    type: AnnouncementType;
    __searchKeyword: string;
    __searchFields?: string;
    __skip?: number;
    __limit?: number;
    __sortOption?: string;
  }) => Promise<void>;
}

export const useAnnouncementStore = create<AnnouncementStore>()(
  persist(
    (set) => ({
      announcements: [],
      isLoading: false,
      error: null,

      fetchAnnouncements: async () => {
        set({ isLoading: true });
        try {
          const response = await getAnnouncements();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ announcements: response.data.announcementList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "공지사항 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAnnouncementStore/fetchAnnouncements] Fetch announcements failed.",
            error,
          );

          set({ announcements: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createAnnouncement: async (announcement: Announcement) => {
        set({ isLoading: true });
        try {
          const response = await postAnnouncement({
            announcementList: [announcement],
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.announcementList.length === 0) {
            throw new Error("공지사항 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            announcements: [
              ...state.announcements,
              response.data!.announcementList[0],
            ],
            error: null,
          }));

          toast.success("공지사항이 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "공지사항 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAnnouncementStore/createAnnouncement] Create announcement failed.",
            error,
          );

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      updateAnnouncement: async (announcement: Announcement) => {
        set({ isLoading: true });
        try {
          const response = await putAnnouncement({
            announcement,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getAnnouncements();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            announcements: fetchResponse.data!.announcementList,
            error: null,
          }));

          toast.success("공지사항이 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "공지사항 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAnnouncementStore/updateAnnouncement] Update announcement failed.",
            error,
          );

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteAnnouncement: async (announcementId: string) => {
        set({ isLoading: true });
        try {
          const response = await deleteAnnouncement({ announcementId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            announcements: state.announcements.filter(
              (announcement) => announcement._id !== announcementId,
            ),
            error: null,
          }));

          toast.success("공지사항이 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "공지사항 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAnnouncementStore/deleteAnnouncement] Delete announcement failed.",
            error,
          );

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      searchAnnouncements: async (params: {
        type: AnnouncementType;
        __searchKeyword: string;
        __searchFields?: string;
        __skip?: number;
        __limit?: number;
        __sortOption?: string;
      }) => {
        set({ isLoading: true });
        try {
          const response = await searchAnnouncement(params);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ announcements: response.data!.announcementList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "공지사항 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useAnnouncementStore/searchAnnouncements] Search announcements failed.",
            error,
          );

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "announcement-store",
    },
  ),
);
