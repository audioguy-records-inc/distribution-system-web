import { Dsp } from "./dsp";

type ContactPerson = {
  responsibility: "contract" | "settlement" | "promotion";
  name: string;
  email: string;
  phone: string;
};

type FileInfo = {
  name: string;
  filePath: string;
};

interface DspContract {
  _id: {
    $oid: string;
  };
  dspContractName: string;
  dspId: {
    $oid: string;
  };
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
  createdAt: {
    $date: {
      $numberLong: string;
    };
  };
  updatedAt: {
    $date: {
      $numberLong: string;
    };
  };
  deletedAt?: {
    $date: {
      $numberLong: string;
    };
  };
}

export default DspContract;
