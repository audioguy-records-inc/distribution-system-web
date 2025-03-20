import { FileInfo } from "./file-info";
import { User } from "./user";

interface DspContractReference {
  _id: string;
  dspId: string;
  dspContractUniqueId: string;
  regionType: "international" | "domestic";
  contractItemList: string[];
}

export interface UserContract {
  _id: string;
  userContractName: string;
  userContractUniqueId: string;
  userId: string;
  isContractAutoRenewEnabled: boolean;
  isContractEnabled: boolean;
  kstContractStartDateInt: number;
  kstContractEndDateInt: number;
  contractRate: number;
  dspContractList: DspContractReference[];
  fileList: FileInfo[];
  userInfo?: {
    _id: string;
    account: string;
    displayName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export default UserContract;
