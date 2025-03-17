import { ContactPerson } from "./contact-person";
import { Dsp } from "./dsp";
import { FileInfo } from "./file-info";

export interface DspContract {
  _id: string;
  dspContractName: string;
  dspId: string;
  dspContractUniqueId: string;
  regionType: "international" | "domestic";
  countryCode: string;
  isContractEnabled: boolean;
  isTimeReleaseEnabled: boolean;
  contractRate: number;
  contactPersonList: ContactPerson[];
  contractItemList: string[];
  fileList: FileInfo[];
  dspInfo?: Dsp;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export default DspContract;
