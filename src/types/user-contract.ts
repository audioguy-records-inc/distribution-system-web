import DspContract from "./dsp-contract";
import { FileInfo } from "./file-info";
import { User } from "./user";

export interface UserContract {
  _id: string;
  userContractName: string;
  userContractUniqueId: string;
  userId: string;
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
