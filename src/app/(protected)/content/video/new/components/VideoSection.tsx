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
import VideoReleaseDate from "./fragment/VideoReleaseDate";
import VideoTitle from "./fragment/VideoTitle";
import VideoUserContract from "./fragment/VideoUserContract";
import { getCountryKeyValueList } from "@/constants/country";
import styled from "styled-components";
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
}

export default function VideoSection({
  control,
  watch,
  register,
  setValue,
}: VideoSectionProps) {
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
              placeholder="아티스트 검색"
              label="영상 아티스트"
              modalHeader="영상 아티스트 검색"
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
              label="트랙 매칭"
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
                placeholder="트랙 검색"
                label="트랙"
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
          label="영상 유형"
          items={videoTypeList}
          selectedKey={watch("videoType")}
          onSelectKey={(selectedKey) => {
            setValue("videoType", selectedKey);
          }}
          size="small"
          width={320}
        />
        <CustomRadioWithLabel
          label="유/무료"
          leftOption={{
            label: "유료",
            value: false,
            checked: watch("isFree") === false,
          }}
          rightOption={{
            label: "무료",
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
          label="발매국가"
          placeholder="국가 선택"
          items={getCountryKeyValueList()}
          selectedKey={watch("releaseCountryCode")}
          onSelectKey={(selectedKey) => {
            setValue("releaseCountryCode", selectedKey);
          }}
          size="small"
          width={320}
        />
        <CustomInput
          label="기획사"
          placeholder="기획사 입력"
          value={watch("agencyCompanyName") || ""}
          onChange={(e) => {
            setValue("agencyCompanyName", e.target.value);
          }}
          size="small"
          width={320}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <LabelInfo
          value={watch("userId") || ""}
          setValue={(value) => {
            setValue("userId", value);
          }}
          watch={watch}
        />
        <VideoUserContract
          control={control}
          watch={watch}
          register={register}
          setValue={setValue}
        />
      </RowWrapper>

      <VideoContractedDspList
        watch={watch}
        register={register}
        setValue={setValue}
      />
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label="공급 지역"
          placeholder="공급 지역 입력"
          size="small"
          locked={true}
          value={watch("supplyRegion") || ""}
          onChange={(e) => {
            setValue("supplyRegion", e.target.value);
          }}
        />
        <CustomDropdown
          label="공급 제외 지역"
          placeholder="공급 제외 지역 선택"
          items={getCountryKeyValueList()}
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
          label="영상 코드"
          placeholder="영상 코드 입력"
          size="small"
          value={watch("videoUniqueId") || ""}
          onChange={(e) => {
            setValue("videoUniqueId", e.target.value);
          }}
        />
        <CustomInput
          label="UPC"
          placeholder="UPC 입력"
          size="small"
          value={watch("UPC") || ""}
          onChange={(e) => {
            setValue("UPC", e.target.value);
          }}
        />
      </RowWrapper>
      <Gap height={56} />
      <CustomInput
        label="ISRC"
        placeholder="ISRC 입력"
        size="small"
        value={watch("ISRC") || ""}
        onChange={(e) => {
          setValue("ISRC", e.target.value);
        }}
      />
      <Gap height={56} />
      <VideoReleaseDate
        control={control}
        watch={watch}
        register={register}
        setValue={setValue}
      />
    </Container>
  );
}
