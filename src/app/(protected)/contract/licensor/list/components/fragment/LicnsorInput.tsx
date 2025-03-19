import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import { User, UserType } from "@/types/user";

import ContactPersonTable from "../../../../dsp/list/components/fragment/ContactPersonTable";
import ContractProductItem from "../../../../dsp/list/components/fragment/ContractProductItem";
import CountryCodeDropdown from "../../../../dsp/list/components/fragment/CountryCodeDropdown";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import CustomUpload from "@/components/basic/CustomUpload";
import DspContract from "@/types/dsp-contract";
import DspDropdown from "../../../../dsp/list/components/fragment/DspDropdown";
import Gap from "@/components/basic/Gap";
import PercentIcon from "@/components/icons/PercentIcon";
import styled from "styled-components";

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const LicensorInput = ({
  watch,
  register,
  control,
  isEdit,
  inputType,
}: {
  watch: UseFormWatch<User>;
  register: UseFormRegister<User>;
  control: Control<User>;
  isEdit: boolean;
  inputType: "create" | "update";
}) => {
  const disabled = inputType === "create" ? false : true;
  return (
    <>
      <Gap height={42} />
      <RowWrapper>
        <CustomInput
          size="small"
          label="권리사 ID"
          placeholder="아이디 입력"
          readOnly={!isEdit}
          disabled={disabled}
          {...register("account", { required: true })}
        />
        <CustomInput
          size="small"
          label="비밀번호"
          placeholder="비밀번호 입력"
          readOnly={!isEdit}
          disabled={disabled}
          {...register("password", { required: true })}
        />
      </RowWrapper>
      <Gap height={56} />
      <CustomInput
        size="small"
        label="권리사명"
        placeholder="권리사명 입력"
        readOnly={!isEdit}
        {...register("displayName", { required: true })}
      />
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="type"
          control={control}
          defaultValue={UserType.COMPANY}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomRadioWithLabel
              label="구분"
              leftOption={{
                label: "사업자",
                value: UserType.COMPANY,
                checked: field.value === UserType.COMPANY,
              }}
              rightOption={{
                label: "개인",
                value: UserType.INDIVIDUAL,
                checked: field.value === UserType.INDIVIDUAL,
              }}
              onChange={field.onChange}
              value={field.value}
              readOnly={!isEdit}
            />
          )}
        />
        <CustomInput
          size="small"
          label="사업자등록번호"
          placeholder="사업자등록번호 입력(- 제외)"
          type="number"
          readOnly={!isEdit}
          {...register("companyRegistrationNumber", { required: true })}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="countryCode"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CountryCodeDropdown
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              readOnly={!isEdit}
              // disabled={watch("regionType") === "domestic"}
            />
          )}
        />
        <Controller
          name="isTimeReleaseEnabled"
          control={control}
          defaultValue={true}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomRadioWithLabel
              label="T/R"
              leftOption={{
                label: "사용",
                value: true,
                checked: field.value === true,
              }}
              rightOption={{
                label: "미사용",
                value: false,
                checked: field.value === false,
              }}
              onChange={field.onChange}
              value={field.value}
              readOnly={!isEdit}
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <Controller
        name="contactPersonList"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ContactPersonTable
            onChange={field.onChange}
            value={field.value}
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
            dataCollectionName={DataCollectionName.DSP_CONTRACTS}
            headerText="계약서"
            readOnly={!isEdit}
          />
        )}
      />
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
            value={
              field.value !== undefined ? (field.value * 100).toString() : ""
            }
            onChange={(e) => {
              e.preventDefault();
              const value = e.target.value;

              // 부동 소수점 정밀도 문제 해결을 위해 toFixed 사용
              const numValue = parseFloat((parseFloat(value) / 100).toFixed(4));

              field.onChange(numValue);
            }}
            readOnly={!isEdit}
          />
        )}
      />
      <Gap height={56} />
      <Controller
        name="contractItemList"
        control={control}
        defaultValue={[]}
        rules={{ required: true }}
        render={({ field }) => (
          <ContractProductItem
            value={field.value}
            onChange={field.onChange}
            readOnly={!isEdit}
          />
        )}
      />
    </>
  );
};

export default LicensorInput;
