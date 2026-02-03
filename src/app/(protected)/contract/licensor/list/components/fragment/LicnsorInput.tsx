import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import { User, UserType } from "@/types/user";

import ContactPersonTable from "../../../../dsp/list/components/fragment/ContactPersonTable";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import CustomUpload from "@/components/basic/CustomUpload";
import Gap from "@/components/basic/Gap";
import { useTranslations } from "next-intl";
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
  const tLicensor = useTranslations("licensor");
  const tCommon = useTranslations("common");
  const locked = inputType === "create" ? false : true;

  return (
    <>
      <Gap height={42} />
      <RowWrapper>
        <CustomInput
          size="small"
          label={tLicensor("licensorCode")}
          placeholder={tLicensor("idPlaceholder")}
          readOnly={!isEdit}
          {...register("account")}
        />
        <CustomInput
          size="small"
          label={tLicensor("password")}
          placeholder={tLicensor("passwordPlaceholder")}
          readOnly={!isEdit}
          required
          {...register("password")}
        />
      </RowWrapper>
      <Gap height={56} />
      <CustomInput
        size="small"
        label={tLicensor("licensorName")}
        placeholder={tLicensor("licensorNamePlaceholder")}
        readOnly={!isEdit}
        required
        {...register("displayName", { required: true })}
      />
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="type"
          control={control}
          defaultValue={UserType.COMPANY}
          render={({ field }) => (
            <CustomRadioWithLabel
              label={tCommon("category")}
              required
              leftOption={{
                label: tCommon("business"),
                value: UserType.COMPANY,
                checked: field.value === UserType.COMPANY,
              }}
              rightOption={{
                label: tCommon("individual"),
                value: UserType.INDIVIDUAL,
                checked: field.value === UserType.INDIVIDUAL,
              }}
              onChange={field.onChange}
              value={field.value}
              readOnly={!isEdit}
            />
          )}
        />
        {watch("type") === UserType.COMPANY && (
          <CustomInput
            size="small"
            label={tLicensor("businessNumber")}
            placeholder={tLicensor("businessNumberPlaceholder")}
            {...register("companyRegistrationNumber")}
          />
        )}
        {watch("type") === UserType.INDIVIDUAL && (
          <CustomInput
            size="small"
            label={tLicensor("residentNumber")}
            placeholder={tLicensor("residentNumberPlaceholder")}
            {...register("personalIdNumber")}
          />
        )}
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          size="small"
          label={tLicensor("ceoName")}
          placeholder={tLicensor("ceoNamePlaceholder")}
          readOnly={!isEdit}
          required
          {...register("representativeName")}
        />
        <CustomInput
          size="small"
          label={tLicensor("address")}
          placeholder={tLicensor("addressPlaceholder")}
          readOnly={!isEdit}
          {...register("address")}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          size="small"
          label={tLicensor("bankName")}
          placeholder={tLicensor("bankNamePlaceholder")}
          readOnly={!isEdit}
          {...register("bankName")}
        />
        <CustomInput
          size="small"
          label={tLicensor("accountNumber")}
          placeholder={tLicensor("accountNumberPlaceholder")}
          readOnly={!isEdit}
          {...register("bankAccount")}
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
            dataCollectionName={DataCollectionName.USERS}
            headerText={tLicensor("companyInfo")}
            readOnly={!isEdit}
          />
        )}
      />
    </>
  );
};

export default LicensorInput;
