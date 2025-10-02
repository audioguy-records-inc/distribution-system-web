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
import toast from "react-hot-toast";
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
    releaseCountryCode: "KR",
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
    // 공간 음향 UPC null 설정 헬퍼 함수
    const setSpatialAudioUPCToNull = (tracks: Track[]) => {
      return tracks.map((track) => {
        // 공간 음향 서비스를 사용하면 UPC를 null로 설정
        if (track.isSupportedSpatialAudio) {
          return {
            ...track,
            spatialAudioInfo: {
              ...track.spatialAudioInfo,
              UPC: null,
            },
          };
        }
        return track;
      });
    };

    if (newAlbum) {
      await updateAlbum(data, true);

      // 공간 음향 UPC를 null로 설정
      const tracksWithUPC = setSpatialAudioUPCToNull(edittingTracks);

      let successNewTracks = 0;
      let successUpdatedTracks = 0;

      // 트랙 처리 결과를 개별적으로 확인
      for (const track of tracksWithUPC) {
        try {
          if (track._id) {
            await updateTrack(track);
            successUpdatedTracks++;
          } else {
            await createTrack(track);
            successNewTracks++;
          }
        } catch (error) {
          // 개별 트랙 실패 시 에러는 이미 toast로 표시됨
          console.error(`트랙 처리 실패:`, error);
        }
      }

      // 성공한 트랙에 대해서만 통합 알림
      if (successNewTracks > 0 || successUpdatedTracks > 0) {
        if (successNewTracks > 0 && successUpdatedTracks > 0) {
          toast.success(
            `${successNewTracks}개 트랙이 등록되고 ${successUpdatedTracks}개 트랙이 수정되었습니다.`,
          );
        } else if (successNewTracks > 0) {
          toast.success(`${successNewTracks}개 트랙이 등록되었습니다.`);
        } else if (successUpdatedTracks > 0) {
          toast.success(`${successUpdatedTracks}개 트랙이 수정되었습니다.`);
        }
      }
    } else {
      await createAlbum(data);

      // 신규 앨범 등록 시에도 트랙 저장
      if (edittingTracks.length > 0) {
        // 앨범 생성 후 newAlbum에서 ID를 가져와서 트랙에 설정
        const currentNewAlbum = useAlbumStore.getState().newAlbum;
        if (currentNewAlbum?._id) {
          // 공간 음향 UPC를 null로 설정
          const tracksWithUPC = setSpatialAudioUPCToNull(edittingTracks);

          let successNewTracks = 0;

          // 트랙 처리 결과를 개별적으로 확인
          for (const track of tracksWithUPC) {
            try {
              const trackWithAlbumId = {
                ...track,
                albumId: currentNewAlbum._id,
              };
              await createTrack(trackWithAlbumId);
              successNewTracks++;
            } catch (error) {
              // 개별 트랙 실패 시 에러는 이미 toast로 표시됨
              console.error(`트랙 처리 실패:`, error);
            }
          }

          // 성공한 트랙에 대해서만 통합 알림
          if (successNewTracks > 0) {
            toast.success(`${successNewTracks}개 트랙이 등록되었습니다.`);
          }
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
      album.supplyRegion &&
      album.releaseCountryCode &&
      album.utcReleasedAt &&
      album.isAdultOnly !== undefined
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
