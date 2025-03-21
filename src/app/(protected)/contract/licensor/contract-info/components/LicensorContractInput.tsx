import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import { User, UserType } from "@/types/user";

import CustomCalendar from "@/components/basic/CustomCalendar";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import CustomInput from "@/components/basic/CustomInput";
import CustomUpload from "@/components/basic/CustomUpload";
import Gap from "@/components/basic/Gap";
import LicensorSearch from "./LicensorSearch";
import UserContract from "@/types/user-contract";
import styled from "styled-components";
import theme from "@/styles/theme";

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const ContractTitleRowWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const ContractTitle = styled.div`
  ${theme.fonts.heading2.medium};
  color: ${theme.colors.gray[800]};
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
  console.log("moonsae watch", watch());
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
      <Controller
        name="userId"
        control={control}
        render={({ field }) => (
          <LicensorSearch
            value={field.value}
            onChange={field.onChange}
            readOnly={!isEdit}
          />
        )}
      />
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
      <Gap height={56} />
      <ContractTitleRowWrapper>
        <ContractTitle>계약 기간</ContractTitle>
        <Controller
          name="isContractEnabled"
          control={control}
          render={({ field }) => (
            <CustomCheckbox
              checked={field.value}
              onChange={field.onChange}
              label="자동 연장(1년)"
            />
          )}
        />
      </ContractTitleRowWrapper>
      <Gap height={12} />
      <CustomCalendar />
      <Gap height={500} />
    </>
  );
};

export default LicensorContractInput;
