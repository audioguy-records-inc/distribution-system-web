"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Album from "@/types/album";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CensorSection from "../../new/components/CensorSection";
import CenterSpinner from "@/components/CenterSpinner";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import CollapsibleTrackHeader from "@/components/CollapsibleTrackHeader";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import UploadSection from "../../new/components/UploadSection";
import Video from "@/types/video";
import VideoSection from "../../new/components/VideoSection";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";
import { useForm } from "react-hook-form";
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

const VideoDetailPage = () => {
  const router = useRouter();
  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { videos, updateVideo, deleteVideo, fetchVideo } = useVideoStore();

  const [video, setVideo] = useState<Video | null>(null);

  const { register, reset, control, watch, setValue, formState } =
    useForm<Video>({
      defaultValues: {},
      mode: "onChange",
      shouldFocusError: false,
    });

  useEffect(() => {
    const _fetchVideo = async () => {
      setIsLoading(true);
      const _video = await fetchVideo(videoId as string);
      if (_video) {
        // 발매국가가 없는 경우 기본값으로 대한민국 설정
        const videoWithDefaultCountry = {
          ..._video,
          releaseCountryCode: _video.releaseCountryCode || "KR",
        };
        setVideo(videoWithDefaultCountry);
        reset(videoWithDefaultCountry);
      }
      setIsLoading(false);
    };
    _fetchVideo();
  }, [videoId, fetchVideo, reset]);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteVideo(videoId as string);
    setIsLoading(false);
    router.push("/content/video/list");
  };
  console.log("moonsae watch", watch());

  const isFilled = () => {
    const titleList = watch("titleList");
    const releaseArtistList = watch("releaseArtistList");
    const isMatchedTrack = watch("isMathcedTrack");
    const videoType = watch("videoType");
    const releaseCountryCode = watch("releaseCountryCode");
    const distributionCompanyName = watch("distributionCompanyName");
    const agencyCompanyName = watch("agencyCompanyName");
    const videoUniqueId = watch("videoUniqueId");
    const UPC = watch("UPC");
    const ISRC = watch("ISRC");
    const utcReleasedAt = watch("utcReleasedAt");
    const utcServiceStartedAt = watch("utcServiceStartedAt");
    const ratingAuthority = watch("ratingAuthority");
    const userId = watch("userId");
    const userContractId = watch("userContractId");
    const dspContractIdList = watch("dspContractIdList");

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

    if (releaseCountryCode === undefined || releaseCountryCode === null) {
      return false;
    }

    if (
      distributionCompanyName === undefined ||
      distributionCompanyName === null ||
      distributionCompanyName === ""
    ) {
      return false;
    }

    if (
      agencyCompanyName === undefined ||
      agencyCompanyName === null ||
      agencyCompanyName === ""
    ) {
      return false;
    }

    if (!videoUniqueId || videoUniqueId === "") {
      return false;
    }

    if (!UPC || UPC === "") {
      return false;
    }

    if (!ISRC || ISRC === "") {
      return false;
    }

    if (!utcReleasedAt) {
      return false;
    }

    if (!utcServiceStartedAt) {
      return false;
    }

    if (!ratingAuthority || ratingAuthority === "") {
      return false;
    }

    if (!userId || userId === "") {
      return false;
    }

    if (!userContractId || userContractId === "") {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const _video = watch();
    if (!_video) {
      return;
    }

    if (
      _video.ratingAuthorityOther &&
      _video.ratingAuthorityOther !== "" &&
      _video.ratingAuthority === "기타(직접입력)"
    ) {
      _video.ratingAuthority = _video.ratingAuthorityOther;
    }

    setIsLoading(true);
    await updateVideo(_video, false);
    setIsLoading(false);
  };

  if (isLoading) {
    return <CenterSpinner />;
  }

  if (!video) {
    return <div>영상을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <PageHeader title={"영상 상세"} />
        <ButtonWrapper>
          <ButtonOutlinedSecondary label="삭제" onClick={handleDelete} />
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonFilledPrimary
              label="저장"
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
            required={true}
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
            required={true}
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
};

export default VideoDetailPage;
