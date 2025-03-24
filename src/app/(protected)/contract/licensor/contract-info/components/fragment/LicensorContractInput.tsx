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
import LicensorDspContractList from "./LicensorDspContractList";
import LicensorSearch from "./LicensorSearch";
import PercentIcon from "@/components/icons/PercentIcon";
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

const CalendarWrapper = styled.div`
  display: flex;
  gap: 52px;
`;

const CalendarLine = styled.div`
  width: 16px;
  height: 1.5px;
  background-color: ${theme.colors.gray[500]};
  margin-top: 50px;
`;

const LicensorContractInput = ({
  watch,
  register,
  control,
  isEdit,
}: {
  watch: UseFormWatch<UserContract>;
  register: UseFormRegister<UserContract>;
  control: Control<UserContract>;
  isEdit: boolean;
}) => {
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
          {...register("userContractName", { required: true })}
        />
        <CustomInput
          size="small"
          label="계약 코드"
          placeholder="계약 코드 입력"
          readOnly={!isEdit}
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
            user={watch("userInfo") as User}
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
              readOnly={!isEdit}
            />
          )}
        />
      </ContractTitleRowWrapper>
      <Gap height={12} />
      <CalendarWrapper>
        <Controller
          name="kstContractStartDateInt"
          control={control}
          render={({ field }) => (
            <CustomCalendar
              label={"계약 시작일"}
              value={field.value}
              onChange={field.onChange}
              readOnly={!isEdit}
            />
          )}
        />
        <CalendarLine />
        <Controller
          name="kstContractEndDateInt"
          control={control}
          render={({ field }) => (
            <CustomCalendar
              label={"계약 종료일"}
              value={field.value}
              onChange={field.onChange}
              readOnly={!isEdit}
            />
          )}
        />
      </CalendarWrapper>
      <Gap height={56} />
      <Controller
        name="contractRate"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomInput
            defaultValue={undefined}
            size="small"
            label="계약 요율"
            icon={<PercentIcon />}
            placeholder="숫자 입력"
            type="number"
            readOnly={!isEdit}
            value={
              field.value !== undefined
                ? (field.value * 100).toFixed(0).toString()
                : ""
            }
            onChange={(e) => {
              e.preventDefault();
              const value = parseFloat(e.target.value) / 100;

              const numValue = value;

              field.onChange(numValue);
            }}
          />
        )}
      />
      <Gap height={56} />
      <Controller
        name="dspContractList"
        control={control}
        render={({ field }) => (
          <LicensorDspContractList
            value={field.value}
            onChange={field.onChange}
            readOnly={!isEdit}
            isEdit={isEdit}
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
            dataCollectionName={DataCollectionName.DSP_CONTRACTS}
            headerText="계약서"
            readOnly={!isEdit}
          />
        )}
      />
    </>
  );
};

export default LicensorContractInput;
