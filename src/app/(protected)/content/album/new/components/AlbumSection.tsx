import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Album from "@/types/album";
import AlbumGenre from "./fragment/AlbumGenre";
import AlbumLicensorSearch from "./fragment/AlbumLicensorSearch";
import AlbumTitle from "./fragment/AlbumTitle";
import AlbumType from "./fragment/AlbumType";
import AlbumUserContract from "./fragment/AlbumUserContract";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import NumberOfDiscs from "./fragment/NumberOfDiscs";
import NumberOfTracksPerDisc from "./fragment/NumberOfTracksPerDisc";
import ReleaseCountryCode from "./fragment/ReleaseCountryCode";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 100px;
  overflow-y: visible;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface AlbumSectionProps {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
  setValue: UseFormSetValue<Album>;
}

export default function AlbumSection({
  control,
  watch,
  register,
  setValue,
}: AlbumSectionProps) {
  return (
    <Container>
      <Gap height={32} />
      <Controller
        name="titleList"
        control={control}
        render={({ field }) => {
          return (
            <AlbumTitle
              value={field.value}
              onChange={field.onChange}
              readOnly={false}
            />
          );
        }}
      />
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="albumType"
          control={control}
          render={({ field }) => {
            return (
              <AlbumType
                value={field.value}
                onChange={field.onChange}
                readOnly={false}
              />
            );
          }}
        />
        <AlbumGenre control={control} watch={watch} />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <ReleaseCountryCode control={control} watch={watch} />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <NumberOfDiscs control={control} watch={watch} />
        <NumberOfTracksPerDisc control={control} watch={watch} />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label="유통사"
          placeholder="유통사명 입력"
          size="small"
          {...register("distributionCompanyName", { required: true })}
        />
        <CustomInput
          label="기획사"
          placeholder="기획사명 입력"
          size="small"
          {...register("agencyCompanyName", { required: true })}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="userId"
          control={control}
          render={({ field }) => {
            return (
              <AlbumLicensorSearch
                value={field.value || ""}
                onChange={field.onChange}
                readOnly={false}
                register={register}
                setValue={setValue}
              />
            );
          }}
        />
        <AlbumUserContract
          control={control}
          watch={watch}
          register={register}
          setValue={setValue}
        />
      </RowWrapper>
    </Container>
  );
}
