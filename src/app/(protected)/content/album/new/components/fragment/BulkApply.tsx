import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import Album from "@/types/album";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import { ClipLoader } from "react-spinners";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import { EditTrack } from "../TrackSection";
import Track from "@/types/track";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTrackStore } from "@/stores/use-track-store";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 36px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray[50]};
  width: fit-content;
`;

interface BulkApplyProps {
  albumWatch: UseFormWatch<Album>;
  tracks: EditTrack[];
  setTracks: (tracks: EditTrack[]) => void;
}

export default function BulkApply({
  albumWatch,
  tracks,
  setTracks,
}: // setValue,
// watch,
BulkApplyProps) {
  const [albumGenre, setAlbumGenre] = useState<boolean>(false);
  const [serviceTime, setServiceTime] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<boolean>(false);
  const [expose, setExpose] = useState<boolean>(false);
  const [contractInfo, setContractInfo] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateTrack } = useTrackStore();

  const handleApply = async () => {
    const albumData = albumWatch();

    // 선택된 트랙들만 필터링
    const selectedTracks = tracks.filter((track) => track.isSelected);

    if (selectedTracks.length === 0) return;

    // 로딩 상태 시작
    setIsLoading(true);

    // 업데이트된 트랙 배열 생성
    const updatedTracks = tracks.map((track) => {
      // 선택되지 않은 트랙은 그대로 반환
      if (!track.isSelected) return track;

      // 선택된 트랙에 대해 체크된 항목들 적용
      const updatedTrack = { ...track };

      if (albumGenre && albumData.mainGenre) {
        updatedTrack.mainGenre = albumData.mainGenre;
        updatedTrack.subGenre = albumData.subGenre;
      }

      if (serviceTime) {
        updatedTrack.utcServiceStartedAt = albumData.utcServiceStartedAt;
      }

      if (countryCode && albumData.releaseCountryCode) {
        updatedTrack.releaseCountryCode = albumData.releaseCountryCode;
      }

      if (expose) {
        updatedTrack.isExposed = albumData.isExposed;
        updatedTrack.isAdultOnly = albumData.isAdultOnly;
      }

      if (contractInfo && albumData.userContractId) {
        updatedTrack.userContractId = albumData.userContractId;
        updatedTrack.userContract = albumData.userContract;
      }

      return updatedTrack;
    });

    // 업데이트된 트랙 배열 설정
    setTracks(updatedTracks);

    // 선택된 트랙들에 대해 Promise.all을 사용하여 모든 트랙 업데이트
    try {
      const updatePromises = updatedTracks
        .filter((track) => track.isSelected)
        .map((track) => updateTrack(track as Track));

      await Promise.all(updatePromises);
      toast.success("일괄 적용 완료");
    } catch (error) {
      toast.error("트랙 업데이트 중 오류가 발생했습니다");
      console.error("트랙 업데이트 오류:", error);
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };
  console.log("moonsae tracks", tracks);
  return (
    <Container>
      <ButtonWrapper>
        <CustomCheckbox
          label="앨범 장르"
          checked={albumGenre}
          onChange={() => setAlbumGenre(!albumGenre)}
        />
        <CustomCheckbox
          label="서비스 시간"
          checked={serviceTime}
          onChange={() => setServiceTime(!serviceTime)}
        />
        <CustomCheckbox
          label="발매 국가"
          checked={countryCode}
          onChange={() => setCountryCode(!countryCode)}
        />
        <CustomCheckbox
          label="노출"
          checked={expose}
          onChange={() => setExpose(!expose)}
        />
        <CustomCheckbox
          label="계약 정보"
          checked={contractInfo}
          onChange={() => setContractInfo(!contractInfo)}
        />
        <ButtonOutlinedPrimary
          label={isLoading ? "적용 중" : "일괄 적용"}
          onClick={handleApply}
          size="small"
          disabled={isLoading}
          rightIcon={
            isLoading ? (
              <ClipLoader color={theme.colors.purple[600]} size={16} />
            ) : undefined
          }
        />
      </ButtonWrapper>
    </Container>
  );
}
