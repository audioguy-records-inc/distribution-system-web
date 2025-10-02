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
          label="유통사"
          placeholder="유통사명 입력"
          size="small"
          {...register("distributionCompanyName", {})}
        />
        <CustomInput
          label="레이블(기획사)"
          placeholder="레이블명 입력"
          size="small"
          required
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
          label="유통 지역"
          placeholder="유통 지역 입력"
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
            label="노출"
            leftOption={{
              label: "해당",
              value: true,
              checked: field.value === true,
            }}
            rightOption={{
              label: "해당없음",
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
            label="19금"
            leftOption={{
              label: "해당",
              value: true,
              checked: field.value === true,
            }}
            rightOption={{
              label: "해당없음",
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
        label="앨범 소개"
        placeholder="앨범 소개를 입력해주세요."
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
              headerText="앨범 커버"
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
              headerText="부클릿 이미지"
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
            headerText="기타 자료(저작권 승인서 등)"
          />
        )}
      />
    </Container>
  );
}
