"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Album from "@/types/album";
import AlbumSection from "../../new/components/AlbumSection";
import ArtistSection from "../../new/components/ArtistSection";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CenterSpinner from "@/components/CenterSpinner";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import CollapsibleTrackHeader from "@/components/CollapsibleTrackHeader";
import DistributionSection from "../../new/components/DistributionSection";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import TrackSection from "../../new/components/TrackSection";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAlbumStore } from "@/stores/use-album-store";
import { useForm } from "react-hook-form";
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

const AlbumDetailPage = () => {
  const router = useRouter();
  const { albumId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { albums, updateAlbum, deleteAlbum, fetchAlbum, sendAlbumDdex } =
    useAlbumStore();
  const {
    edittingTracks,
    resetEdittingTracks,
    updateTrack,
    createTrack,
    deleteTrack,
  } = useTrackStore();

  // 초기 앨범 상태 설정 로직 개선
  const [album, setAlbum] = useState<Album | null>(null);

  const { register, reset, control, watch, setValue, formState } =
    useForm<Album>({
      defaultValues: {}, // 빈 객체로 시작하고 데이터 로드 후 reset으로 설정
      mode: "onChange",
      shouldFocusError: false,
    });

  useEffect(() => {
    const _fetchAlbum = async () => {
      setIsLoading(true);
      const _album = await fetchAlbum(albumId as string);
      if (_album) {
        // 발매국가가 없는 경우 기본값으로 대한민국 설정
        const albumWithDefaultCountry = {
          ..._album,
          releaseCountryCode: _album.releaseCountryCode || "KR",
        };
        setAlbum(albumWithDefaultCountry);
        reset(albumWithDefaultCountry);
      }
      setIsLoading(false);
    };
    _fetchAlbum();
  }, [albumId, fetchAlbum, reset]);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // 1. 등록된 트랙들을 먼저 전부 삭제
      if (edittingTracks.length > 0) {
        const tracksToDelete = edittingTracks.filter((track) => track._id);

        if (tracksToDelete.length > 0) {
          console.log(`${tracksToDelete.length}개의 트랙 삭제 시작...`);

          const deleteTrackPromises = tracksToDelete.map((track) =>
            deleteTrack(track._id!).catch((error) => {
              console.error(`트랙 ${track._id} 삭제 실패:`, error);
              throw error;
            }),
          );

          await Promise.all(deleteTrackPromises);
          console.log("모든 트랙 삭제 완료");
        }
      }

      // 2. 트랙 삭제 완료 후 앨범 삭제
      console.log("앨범 삭제 시작...");
      await deleteAlbum(albumId as string);
      console.log("앨범 삭제 완료");

      setIsLoading(false);
      router.push("/content/album/list");
    } catch (error) {
      setIsLoading(false);
      console.error("앨범 삭제 중 오류 발생:", error);

      // 사용자에게 에러 메시지 표시
      if (error instanceof Error) {
        alert(`삭제 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("삭제 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleDdexSend = async () => {
    if (!albumId) return;

    try {
      setIsLoading(true);
      await sendAlbumDdex(albumId as string);
    } catch (error) {
      console.error("DDEX 전송 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSubmit = async () => {
    const _album = watch();
    if (!_album) {
      return;
    }
    setIsLoading(true);
    await updateAlbum(_album, false);

    // 공간 음향 UPC 자동 설정
    const tracksWithUPC = edittingTracks.map((track) => {
      // 공간 음향 서비스를 사용하고 UPC가 비어있으면 앨범 UPC로 채우기
      if (
        track.isSupportedSpatialAudio &&
        !track.spatialAudioInfo?.UPC &&
        _album.UPC
      ) {
        return {
          ...track,
          spatialAudioInfo: {
            ...track.spatialAudioInfo,
            UPC: _album.UPC,
          },
        };
      }
      return track;
    });

    // 트랙 업데이트 및 생성 로직 추가
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

    setIsLoading(false);
  };

  if (isLoading) {
    return <CenterSpinner />;
  }

  if (!album) {
    return <div>앨범을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <PageHeader title={"앨범 상세"} />
        <ButtonWrapper>
          <ButtonOutlinedSecondary label="DDEX 전송" onClick={handleDdexSend} />
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
    </Container>
  );
};

export default AlbumDetailPage;
