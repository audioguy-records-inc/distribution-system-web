import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import ContractedDspList from "../../../album/new/components/fragment/ContractedDspList";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import Gap from "@/components/basic/Gap";
import LabelInfo from "./fragment/LabelInfo";
import ReleaseArtistSearch from "../../../album/new/components/fragment/ReleaseArtistSearch";
import TrackSearch from "./fragment/TrackSearch";
import Video from "@/types/video";
import VideoContractedDspList from "./fragment/VideoContractedDspList";
import VideoLicensorSearch from "./fragment/VideoLicensorSearch";
import VideoReleaseDate from "./fragment/VideoReleaseDate";
import VideoTitle from "./fragment/VideoTitle";
import VideoUserContract from "./fragment/VideoUserContract";
import { getCountryKeyValueList } from "@/constants/country";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { videoTypeList } from "@/constants/video-type";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface VideoSectionProps {
  control: Control<Video>;
  watch: UseFormWatch<Video>;
  register: UseFormRegister<Video>;
  setValue: UseFormSetValue<Video>;
  required?: boolean;
}

export default function VideoSection({
  control,
  watch,
  register,
  setValue,
  required = false,
}: VideoSectionProps) {
  const tv = useTranslations("video");
  const tc = useTranslations("content");
  const tt = useTranslations("track");
  const tcon = useTranslations("contract");
  const locale = useLocale();
  return (
    <Container>
      <Gap height={32} />
      <Controller
        name="titleList"
        control={control}
        render={({ field }) => {
          return (
            <VideoTitle
              value={field.value || []}
              onChange={field.onChange}
              readOnly={false}
            />
          );
        }}
      />
      <Gap height={56} />
      <Controller
        name="releaseArtistList"
        control={control}
        render={({ field }) => {
          return (
            <ReleaseArtistSearch
              value={field.value || []}
              onChange={field.onChange}
              readOnly={false}
              placeholder={tv("videoArtistSearch")}
              label={tv("videoArtist")}
              modalHeader={tv("videoArtistSearchModal")}
              required={required}
            />
          );
        }}
      />
      <Gap height={56} />
      <Controller
        name="isMathcedTrack"
        control={control}
        render={({ field }) => {
          return (
            <CustomRadioWithLabel
              label={tt("trackMatching")}
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
              required={required}
            />
          );
        }}
      />
      {watch("isMathcedTrack") && (
        <>
          <Gap height={56} />
          <Controller
            name="trackIdList"
            control={control}
            render={({ field }) => (
              <TrackSearch
                value={field.value || []}
                onChange={(value) => {
                  field.onChange(value);
                }}
                placeholder={tt("trackSearch")}
                label={tt("track")}
                setValue={setValue}
                watch={watch}
              />
            )}
          />
        </>
      )}
      <Gap height={56} />
      <RowWrapper>
        <CustomDropdown
          label={tv("videoType")}
          items={videoTypeList.map((item) => ({ key: item.key, value: tv(item.translationKey) }))}
          selectedKey={watch("videoType")}
          onSelectKey={(selectedKey) => {
            setValue("videoType", selectedKey);
          }}
          size="small"
          width={320}
          required={required}
        />
        <CustomRadioWithLabel
          label={tv("paidFree")}
          leftOption={{
            label: tv("paid"),
            value: false,
            checked: watch("isFree") === false,
          }}
          rightOption={{
            label: tv("free"),
            value: true,
            checked: watch("isFree") === true,
          }}
          onChange={(e) => {
            const value = e.target.value;
            setValue("isFree", value);
          }}
          value={watch("isFree")}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomDropdown
          label={tv("releaseCountry")}
          placeholder={tv("countrySelect")}
          items={getCountryKeyValueList(locale)}
          selectedKey={watch("releaseCountryCode")}
          onSelectKey={(selectedKey) => {
            setValue("releaseCountryCode", selectedKey);
          }}
          size="small"
          width={320}
          required={required}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label={tc("distributor")}
          placeholder={tv("distributorPlaceholder")}
          value={watch("distributionCompanyName") || ""}
          onChange={(e) => {
            setValue("distributionCompanyName", e.target.value);
          }}
          size="small"
          width={320}
          required={required}
        />
        <CustomInput
          label={tc("label")}
          placeholder={tv("plannerPlaceholder")}
          value={watch("agencyCompanyName") || ""}
          onChange={(e) => {
            setValue("agencyCompanyName", e.target.value);
          }}
          size="small"
          width={320}
          required={required}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <VideoLicensorSearch
          value={watch("userId") || ""}
          onChange={(value) => {
            setValue("userId", value || undefined);
          }}
          register={register}
          setValue={setValue}
          required={true}
        />
        <VideoUserContract
          control={control}
          watch={watch}
          register={register}
          setValue={setValue}
          required={true}
        />
      </RowWrapper>
      <Gap height={56} />
      <VideoContractedDspList
        watch={watch}
        register={register}
        setValue={setValue}
        required={false}
      />
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label={tv("supplyRegion")}
          placeholder={tv("supplyRegionPlaceholder")}
          size="small"
          locked={true}
          value={watch("supplyRegion") || ""}
          onChange={(e) => {
            setValue("supplyRegion", e.target.value);
          }}
        />
        <CustomDropdown
          label={tv("excludeRegion")}
          placeholder={tv("excludeRegionPlaceholder")}
          items={getCountryKeyValueList(locale)}
          selectedKeys={watch("excludedRegionList") || []}
          onMultiSelectKeys={(selectedKeys) => {
            setValue("excludedRegionList", selectedKeys);
          }}
          size="small"
          width={320}
          multiple={true}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label={tv("videoCode")}
          placeholder={tv("videoCodePlaceholder")}
          size="small"
          value={watch("videoUniqueId") || ""}
          onChange={(e) => {
            setValue("videoUniqueId", e.target.value);
          }}
          required={required}
        />
        <CustomInput
          label="UPC"
          placeholder={tv("upcPlaceholder")}
          size="small"
          value={watch("UPC") || ""}
          onChange={(e) => {
            setValue("UPC", e.target.value);
          }}
          required={required}
        />
      </RowWrapper>
      <Gap height={56} />
      <CustomInput
        label="ISRC"
        placeholder={tv("isrcPlaceholder")}
        size="small"
        value={watch("ISRC") || ""}
        onChange={(e) => {
          setValue("ISRC", e.target.value);
        }}
        required={required}
      />
      <Gap height={56} />
      <VideoReleaseDate
        control={control}
        watch={watch}
        register={register}
        setValue={setValue}
        required={required}
      />
    </Container>
  );
}
