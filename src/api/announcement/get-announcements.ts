import { FetchResponse, apiFetch } from "../fetch";

import { Announcement } from "@/types/announcement";

interface GetAnnouncementsResponse {
  announcementList: Announcement[];
}

export const getAnnouncements = async (): Promise<
  FetchResponse<GetAnnouncementsResponse>
> => {
  try {
    const response = await apiFetch("/announcements");

    return response as FetchResponse<GetAnnouncementsResponse>;
  } catch (error) {
    console.error("[getAnnouncements] error", error);

    throw error instanceof Error
      ? error
      : new Error("공지사항 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};
