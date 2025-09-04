"use client";

import Album from "@/types/album";
import AlbumSection from "./components/AlbumSection";
import ArtistSection from "./components/ArtistSection";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import CollapsibleTrackHeader from "@/components/CollapsibleTrackHeader";
import DistributionSection from "./components/DistributionSection";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import Track from "@/types/track";
import TrackSection from "./components/TrackSection";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTrackStore } from "@/stores/use-track-store";

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

export default function AlbumNewPage() {
  const [resetKey, setResetKey] = useState(0);
  const { createAlbum, newAlbum, isLoading, resetNewAlbum, updateAlbum } =
    useAlbumStore();
  const { edittingTracks, resetEdittingTracks, createTrack, updateTrack } =
    useTrackStore();

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
    isExposed: true,
  };
  const {
    register,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
    setValue,
  } = useForm<Album>({
    defaultValues: newAlbum || defaultValues,
    mode: "onChange",
    shouldFocusError: false,
  });

  const handleReset = () => {
    resetNewAlbum();
    reset(defaultValues);
    resetEdittingTracks();
    setResetKey((prev) => prev + 1);
  };

  const handleSubmit = () => {
    onSubmit(watch());
  };

  const onSubmit = async (data: Album) => {
    if (newAlbum) {
      await updateAlbum(data, true);

      const trackPromises = edittingTracks.map((track) => {
        if (track._id) {
          return updateTrack(track);
        } else {
          return createTrack(track);
        }
      });
      await Promise.all(trackPromises);
    } else {
      await createAlbum(data);

      // 신규 앨범 등록 시에도 트랙 저장
      if (edittingTracks.length > 0) {
        // 앨범 생성 후 newAlbum에서 ID를 가져와서 트랙에 설정
        const currentNewAlbum = useAlbumStore.getState().newAlbum;
        if (currentNewAlbum?._id) {
          const trackPromises = edittingTracks.map((track) => {
            const trackWithAlbumId = {
              ...track,
              albumId: currentNewAlbum._id,
            };
            return createTrack(trackWithAlbumId);
          });
          await Promise.all(trackPromises);
        }
      }

      // 신규 앨범 등록 후 자동 초기화
      handleReset();
    }
  };

  console.log("moonsae album", watch());
  const isFilled = () => {
    const album = watch();

    return (
      album.UPC &&
      album.albumUniqueId &&
      album.releaseArtistList &&
      album.releaseArtistList.length > 0 &&
      album.titleList &&
      album.titleList.length > 0 &&
      album.albumType &&
      album.mainGenre &&
      album.subGenre &&
      album.agencyCompanyName &&
      album.supplyRegion &&
      album.releaseCountryCode &&
      album.utcReleasedAt &&
      album.isAdultOnly !== undefined &&
      album.coverImageList &&
      album.coverImageList.length > 0 &&
      album.userId &&
      album.userContractId
    );
  };

  return (
    <Container key={resetKey}>
      <HeaderWrapper>
        <PageHeader title={"신규 앨범 등록"} />
        <ButtonWrapper>
          <ButtonOutlinedSecondary label="초기화" onClick={handleReset} />
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonFilledPrimary
              label={newAlbum ? "수정" : "등록"}
              onClick={handleSubmit}
              disabled={!isFilled()}
            />
          )}
        </ButtonWrapper>
      </HeaderWrapper>
      <Gap height={32} />
      <CollapsibleHeader
        title="1. 유통 정보"
        renderComponent={
          <DistributionSection
            control={control}
            watch={watch}
            register={register}
          />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="2. 아티스트 정보"
        renderComponent={
          <ArtistSection control={control} watch={watch} register={register} />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="3. 앨범 정보"
        renderComponent={
          <AlbumSection
            control={control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        }
      />
      <Gap height={56} />
      <CollapsibleTrackHeader
        title="4. 트랙 정보"
        renderComponent={<TrackSection albumWatch={watch} />}
      />
      <Gap height={56} />
    </Container>
  );
}
