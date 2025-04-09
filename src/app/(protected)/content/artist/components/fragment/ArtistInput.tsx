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
  return (
    <>
      <Gap height={42} />
      <RowWrapper>
        <CustomInput
          label="아티스트명"
          size="small"
          placeholder="아티스트명 입력"
          {...register("name", { required: true })}
          required={isEdit}
        />
        <CustomInput
          label="아티스트 코드"
          size="small"
          placeholder="아티스트 코드 입력"
          {...register("artistUniqueId")}
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
        <SnsInput isEdit={isEdit} required={isEdit} control={control} />
      </RowWrapper>
    </>
  );
};

export default ArtistInput;
