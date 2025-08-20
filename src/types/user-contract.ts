import DspContract from "./dsp-contract";
import { FileInfo } from "./file-info";
import { User } from "./user";

/**
 * 계약 유형
 * - GENERAL: 일반
 * - INVESTMENT: 투자
 * - MG: MG
 */
export type UserContractType = "GENERAL" | "INVESTMENT" | "MG";

/**
 * 업체 유형
 * - INDIVIDUAL: 개인
 * - INDIVIDUAL_BUSINESS: 개인사업자
 * - CORPORATION_BUSINESS: 법인사업자
 */
export type UserContractBusinessType =
  | "INDIVIDUAL"
  | "INDIVIDUAL_BUSINESS"
  | "CORPORATION_BUSINESS";

export interface UserContract {
  _id: string;
  userContractName: string;
  userContractUniqueId: string;
  userId: string;
  userContractType: UserContractType;
  userContractBusinessType: UserContractBusinessType;
  isContractAutoRenewEnabled: boolean;
  isContractEnabled: boolean;
  kstContractStartDateInt: string;
  kstContractEndDateInt: string;
  contractRate: number;
  dspContractList: DspContract[];
  fileList: FileInfo[];
  userInfo?: {
    _id: string;
    account: string;
    displayName: string;
  };

  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt?: Date | null;
}

export default UserContract;
