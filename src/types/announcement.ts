export const ANNOUNCEMENT_TYPE = {
  ETC: "ETC",
  TRANSMISSION: "TRANSMISSION",
  SETTLEMENT: "SETTLEMENT",
};

export type AnnouncementType = keyof typeof ANNOUNCEMENT_TYPE;

export interface Announcement {
  _id?: string;
  title: string;
  text: string;
  type: AnnouncementType;
  recipientResponsibility: string; // user.contractPersonList.responsibility: 메일 전송 대상
  userId: string; // 작성자 id, token 에서 참조

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export default Announcement;
