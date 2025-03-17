import { ContactPerson } from "./contact-person";
import { FileInfo } from "./file-info";

export interface User {
  _id: string;
  account: string;
  password: string;
  displayName: string;
  authLevel: "USER" | "ADMIN";
  type: "individual" | "company";
  isEnabled: boolean;

  // 회사 타입일 때만 필요한 필드
  companyRegistrationNumber?: string;

  // 개인 타입일 때만 필요한 필드
  personalIdNumber?: string;

  // 공통 필드
  representativeName: string;
  address: string;
  bankName: string;
  bankAccount: string;

  contactPersonList: ContactPerson[];
  fileList: FileInfo[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
