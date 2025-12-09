import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import ContactPersonTable from "./ContactPersonTable";
import ContractProductItem from "./ContractProductItem";
import CountryCodeDropdown from "./CountryCodeDropdown";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import CustomUpload from "@/components/basic/CustomUpload";
import DspContract from "@/types/dsp-contract";
import DspDropdown from "./DspDropdown";
import Gap from "@/components/basic/Gap";
import PercentIcon from "@/components/icons/PercentIcon";
import styled from "styled-components";

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const DspContractInput = ({
  watch,
  register,
  control,
  isEdit,
}: {
  watch: UseFormWatch<DspContract>;
  register: UseFormRegister<DspContract>;
  control: Control<DspContract>;
  isEdit: boolean;
}) => {
  return (
    <>
      <Gap height={42} />
      <RowWrapper>
        <CustomInput
          size="small"
          label="계약명"
          placeholder="계약명 입력"
          readOnly={!isEdit}
          required
          {...register("dspContractName", { required: true })}
        />
        <Controller
          name="dspId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DspDropdown
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              readOnly={!isEdit}
              required
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          size="small"
          label="DPID"
          placeholder="DPID 입력"
          required
          helpText="중복된 id 요청시 생성되지 않습니다."
          {...register("dspContractUniqueId", { required: true })}
        />
        <Controller
          name="regionType"
          control={control}
          render={({ field }) => (
            <CustomRadioWithLabel
              label="구분"
              leftOption={{
                label: "국내",
                value: "domestic",
                checked: field.value === "domestic",
              }}
              rightOption={{
                label: "해외",
                value: "international",
                checked: field.value === "international",
              }}
              onChange={field.onChange}
              value={field.value}
              readOnly={!isEdit}
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="countryCode"
          control={control}
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
            required
            icon={<PercentIcon />}
            placeholder="숫자 입력"
            type="number"
            onWheel={(e) => {
              e.currentTarget.blur();
              e.preventDefault();
            }}
            value={
              field.value !== undefined
                ? (field.value * 100).toFixed(0).toString()
                : ""
            }
            onChange={(e) => {
              e.preventDefault();

              let percentValue = parseFloat(e.target.value);

              if (percentValue > 100) percentValue = 100;
              if (percentValue < 0) percentValue = 0;

              // UI에 직접 적용 (preventDefault 때문에 필요)
              e.target.value = percentValue.toString();

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

export default DspContractInput;
