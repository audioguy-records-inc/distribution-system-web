"use client";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CensorSection from "./components/CensorSection";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import UploadSection from "./components/UploadSection";
import Video from "@/types/video";
import VideoSection from "./components/VideoSection";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useVideoStore } from "@/stores/use-video-store";

const Container = styled.div``;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default function VideoNewPage() {
  const { isLoading, newVideo, createVideo, updateVideo, resetNewVideo } =
    useVideoStore();
  const { user } = useAuthStore();

  const [resetKey, setResetKey] = useState(0);

  const defaultValues = {
    titleList: [
      {
        ko: "",
      },
      {
        en: "",
      },
    ],
    supplyRegion: "Worldwide",
    ratingExemptionReason: "해당없음",
  };

  const {
    register,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
    setValue,
  } = useForm<Video>({
    defaultValues: newVideo || defaultValues,
    mode: "onChange",
    shouldFocusError: false,
  });

  const handleReset = () => {
    resetNewVideo();
    reset(defaultValues);
    setResetKey((prev) => prev + 1);
  };

  const handleSubmit = () => {
    onSubmit(watch());
  };

  const onSubmit = async (data: Video) => {
    if (
      data.ratingAuthorityOther &&
      data.ratingAuthorityOther !== "" &&
      data.ratingAuthority === "기타(직접입력)"
    ) {
      data.ratingAuthority = data.ratingAuthorityOther;
      return;
    }
    if (newVideo) {
      await updateVideo(data, true);
    } else {
      await createVideo(data);
    }
  };

  const isFilled = () => {
    const titleList = watch("titleList");
    const releaseArtistList = watch("releaseArtistList");
    const isMatchedTrack = watch("isMathcedTrack");
    const videoType = watch("videoType");
    const isFree = watch("isFree");
    const releaseCountryCode = watch("releaseCountryCode");
    const agencyCompanyName = watch("agencyCompanyName");

    if (!titleList || titleList.length === 0) {
      return false;
    }

    if (!releaseArtistList || releaseArtistList.length === 0) {
      return false;
    }

    if (isMatchedTrack === undefined || isMatchedTrack === null) {
      return false;
    }

    if (videoType === undefined || videoType === null) {
      return false;
    }

    if (isFree === undefined || isFree === null) {
      return false;
    }

    if (releaseCountryCode === undefined || releaseCountryCode === null) {
      return false;
    }

    if (
      agencyCompanyName === undefined ||
      agencyCompanyName === null ||
      agencyCompanyName === ""
    ) {
      return false;
    }

    return true;
  };

  console.log("moonsae isValid", isValid);
  console.log("moonsae isDirty", isDirty);
  console.log("moonsae watch", watch());

  return (
    <Container key={resetKey}>
      <HeaderWrapper>
        <PageHeader title={"신규 영상 등록"} />
        <ButtonWrapper>
          <ButtonOutlinedSecondary label="초기화" onClick={handleReset} />
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonFilledPrimary
              label={newVideo ? "수정" : "등록"}
              onClick={handleSubmit}
              disabled={!isFilled()}
            />
          )}
        </ButtonWrapper>
      </HeaderWrapper>
      <Gap height={32} />
      <CollapsibleHeader
        title="1. 영상 정보"
        renderComponent={
          <VideoSection
            control={control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="2. 영상 트랙 정보"
        renderComponent={
          <CensorSection
            control={control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="3. 영상 파일"
        renderComponent={
          <UploadSection
            control={control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        }
      />
    </Container>
  );
}
