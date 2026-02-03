import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { Artist } from "@/types/artist";
import ArtistGenderTypeDropdown from "./ArtistGenderTypeDropdown";
import ArtistTypeDropdown from "./ArtistTypeDropdown";
import CountryCodeDropdown from "@/app/(protected)/contract/dsp/list/components/fragment/CountryCodeDropdown";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import DomainDropdown from "./DomainDropdown";
import Gap from "@/components/basic/Gap";
import PercentIcon from "@/components/icons/PercentIcon";
import SnsInput from "./SnsInput";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const ArtistInput = ({
  watch,
  register,
  control,
  isEdit,
}: {
  watch: UseFormWatch<Artist>;
  register: UseFormRegister<Artist>;
  control: Control<Artist>;
  isEdit: boolean;
}) => {
  const ta = useTranslations("artist");
  return (
    <>
      <Gap height={42} />
      <RowWrapper>
        <CustomInput
          label={ta("artistName")}
          size="small"
          placeholder={ta("artistNamePlaceholder")}
          {...register("name", { required: true })}
          required={isEdit}
          readOnly={!isEdit}
        />
        <CustomInput
          label={ta("artistCode")}
          size="small"
          placeholder={ta("artistCodePlaceholder")}
          {...register("artistUniqueId")}
          readOnly={!isEdit}
        />
      </RowWrapper>

      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label={ta("artistEnName")}
          size="small"
          placeholder={ta("artistEnNamePlaceholder")}
          {...register("nameEn")}
          readOnly={!isEdit}
        />
        <Controller
          name="artistType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ArtistTypeDropdown
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              readOnly={!isEdit}
              required={isEdit}
            />
          )}
        />
      </RowWrapper>

      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="genderType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ArtistGenderTypeDropdown
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              readOnly={!isEdit}
              required={isEdit}
            />
          )}
        />
        <Controller
          name="countryCode"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DomainDropdown
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              readOnly={!isEdit}
              required={isEdit}
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <SnsInput isEdit={isEdit} required={isEdit} control={control} />
      </RowWrapper>
    </>
  );
};

export default ArtistInput;
