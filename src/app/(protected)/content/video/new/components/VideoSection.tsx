import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import Gap from "@/components/basic/Gap";
import LabelInfo from "./fragment/LabelInfo";
import ReleaseArtistSearch from "../../../album/new/components/fragment/ReleaseArtistSearch";
import TrackSearch from "./fragment/TrackSearch";
import Video from "@/types/video";
import VideoTitle from "./fragment/VideoTitle";
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
          <TrackSearch
            value={watch("trackIdList") || []}
            onChange={(value) => {
              setValue("trackIdList", value || []);
            }}
            placeholder="트랙 검색"
            label="트랙"
            trackList={watch("trackList") || []}
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
      <LabelInfo
        value={watch("userId") || ""}
        setValue={(value) => {
          setValue("userId", value);
        }}
        watch={watch}
      />
    </Container>
  );
}
