import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import { User, UserType } from "@/types/user";

import CustomInput from "@/components/basic/CustomInput";
import CustomUpload from "@/components/basic/CustomUpload";
import Gap from "@/components/basic/Gap";
import SearchDropdownInput from "./SearchDropdownInput";
import SearchInput from "@/components/SearchInput";
import UserContract from "@/types/user-contract";
import styled from "styled-components";

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const LicensorContractInput = ({
  watch,
  register,
  control,
  isEdit,
  inputType,
}: {
  watch: UseFormWatch<UserContract>;
  register: UseFormRegister<UserContract>;
  control: Control<UserContract>;
  isEdit: boolean;
  inputType: "create" | "update";
}) => {
  const locked = inputType === "create" ? false : true;
  return (
    <>
      <Gap height={42} />
      <RowWrapper>
        <CustomInput
          size="small"
          label="계약명"
          placeholder="계약명 입력"
          readOnly={!isEdit}
          locked={locked}
          {...register("userContractName", { required: true })}
        />
        <CustomInput
          size="small"
          label="계약 코드"
          placeholder="계약 코드 입력"
          readOnly={!isEdit}
          locked={locked}
          {...register("userContractUniqueId", { required: true })}
        />
      </RowWrapper>
      <Gap height={56} />
      <SearchInput placeholder="권리사명 검색" />
      <SearchDropdownInput placeholder="권리사명 검색" />
      <Gap height={56} />
      <Controller
        name="fileList"
        control={control}
        render={({ field }) => (
          <CustomUpload
            onChange={field.onChange}
            value={field.value}
            fileType={FileType.DOCS}
            dataCollectionName={DataCollectionName.USERS}
            headerText="계약서"
            readOnly={!isEdit}
          />
        )}
      />
    </>
  );
};

export default LicensorContractInput;
