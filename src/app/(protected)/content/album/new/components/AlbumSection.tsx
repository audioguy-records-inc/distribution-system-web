import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import Album from "@/types/album";
import AlbumGenre from "./fragment/AlbumGenre";
import AlbumLicensorSearch from "./fragment/AlbumLicensorSearch";
import AlbumTitle from "./fragment/AlbumTitle";
import AlbumType from "./fragment/AlbumType";
import AlbumUserContract from "./fragment/AlbumUserContract";
import ContractedDspList from "./fragment/ContractedDspList";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import CustomTextArea from "@/components/basic/CustomTextArea";
import CustomUpload from "@/components/basic/CustomUpload";
import ExcludedRegionList from "./fragment/ExcludedRegionList";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import NumberOfDiscs from "./fragment/NumberOfDiscs";
import NumberOfTracksPerDisc from "./fragment/NumberOfTracksPerDisc";
import ReleaseCountryCode from "./fragment/ReleaseCountryCode";
import ReleaseDate from "./fragment/ReleaseDate";
import RequestDetails from "./RequestDetails";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div`
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
  const t = useTranslations("content");
  const tt = useTranslations("track");
  const tu = useTranslations("upload");
  const tv = useTranslations("video");
  return (
    <Container>
      <Gap height={32} />
      <Controller
        name="titleList"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <AlbumTitle
              value={field.value || []}
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
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <AlbumType
                value={field.value || ""}
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
          label={t("distributor")}
          placeholder={t("distributorPlaceholder")}
          size="small"
          {...register("distributionCompanyName", {})}
        />
        <CustomInput
          label={t("label")}
          placeholder={t("labelPlaceholder")}
          size="small"
          required
          blueRequired
          {...register("agencyCompanyName")}
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
                user={watch("userInfo")}
              />
            );
          }}
        />
        <Controller
          name="userContractId"
          control={control}
          render={({ field }) => (
            <AlbumUserContract
              control={control}
              watch={watch}
              register={register}
              setValue={setValue}
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <Controller
        name="dspContractIdList"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ContractedDspList
            watch={watch}
            register={register}
            setValue={setValue}
          />
        )}
      />
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label={t("distributionRegion")}
          placeholder={t("distributionRegionPlaceholder")}
          size="small"
          locked={true}
          required
          {...register("supplyRegion", { required: true })}
        />
        <Controller
          name="excludedRegionList"
          control={control}
          render={({ field }) => (
            <ExcludedRegionList
              control={control}
              watch={watch}
              register={register}
              setValue={setValue}
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <Controller
        name="utcReleasedAt"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ReleaseDate
            control={control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        )}
      />
      <Gap height={56} />
      <Controller
        name="isExposed"
        control={control}
        rules={{ required: true }}
        defaultValue={true}
        render={({ field }) => (
          <CustomRadioWithLabel
            label={t("exposure")}
            leftOption={{
              label: tt("applicable"),
              value: true,
              checked: field.value === true,
            }}
            rightOption={{
              label: tt("notApplicable"),
              value: false,
              checked: field.value === false,
            }}
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <Gap height={56} />
      <Controller
        name="isAdultOnly"
        control={control}
        rules={{ required: true }}
        defaultValue={false}
        render={({ field }) => (
          <CustomRadioWithLabel
            label={t("adultOnly")}
            leftOption={{
              label: tt("applicable"),
              value: true,
              checked: field.value === true,
            }}
            rightOption={{
              label: tt("notApplicable"),
              value: false,
              checked: field.value === false,
            }}
            onChange={field.onChange}
            value={field.value}
            required
          />
        )}
      />
      <Gap height={56} />
      <CustomTextArea
        label={t("albumIntro")}
        placeholder={t("albumIntroPlaceholder")}
        expand={true}
        {...register("albumIntroduction", { required: true })}
      />
      <Gap height={56} />
      <RequestDetails
        control={control}
        watch={watch}
        register={register}
        setValue={setValue}
      />
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="coverImageList"
          control={control}
          render={({ field }) => (
            <ImageUpload
              headerText={tu("albumCover")}
              onChange={field.onChange}
              value={field.value || []}
              fileType={FileType.IMAGES}
              dataCollectionName={DataCollectionName.ALBUMS}
              width="320px"
              required
            />
          )}
        />
        <Controller
          name="bookletImageList"
          control={control}
          render={({ field }) => (
            <ImageUpload
              headerText={tu("bookletImage")}
              onChange={field.onChange}
              value={field.value || []}
              fileType={FileType.IMAGES}
              dataCollectionName={DataCollectionName.ALBUMS}
              width="320px"
            />
          )}
        />
      </RowWrapper>
      <Gap height={56} />
      <Controller
        name="etcFileList"
        control={control}
        render={({ field }) => (
          <CustomUpload
            onChange={field.onChange}
            value={field.value || []}
            fileType={FileType.DOCS}
            dataCollectionName={DataCollectionName.ALBUMS}
            headerText={tu("otherMaterials")}
          />
        )}
      />
    </Container>
  );
}
