import { useEffect, useState } from "react";

import CustomInput from "@/components/basic/CustomInput";
import CustomModal from "@/components/CustomModal";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import DetailHeaderButton from "@/app/(protected)/contract/dsp/list/components/fragment/DetailHeaderButton";
import Gap from "@/components/basic/Gap";
import ParticipateArtistSearch from "./ParticipateArtistSearch";
import ReleaseArtistSearch from "./ReleaseArtistSearch";
import SpecialAudio from "./SpecialAudio";
import Track from "@/types/track";
import TrackGenre from "./TrackGenre";
import TrackReleaseCountryCode from "./TrackReleaseCountryCode";
import TrackReleaseDate from "./TrackReleaseDate";
import TrackTitle from "./TrackTitle";
import TrackUserContract from "./TrackUserContract";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  padding-left: 32px;
  padding-right: 32px;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.fonts.title2.medium}
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export default function TrackDetail({
  record,
  index,
  tracks,
  setTracks,
}: {
  record: Track;
  index: number;
  tracks: Track[];
  setTracks: (tracks: Track[]) => void;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const currentTrack = tracks[index];
  const [prefTrack, setPrefTrack] = useState(currentTrack);

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const { createTrack, updateTrack, deleteTrack, error } = useTrackStore();
  // const handleConfirmUpdate = async () => {
  //   if (!currentTrack._id) {
  //     await createTrack(currentTrack);
  //   } else {
  //     await updateTrack(currentTrack);
  //   }
  //   setIsUpdateModalOpen(false);
  //   setIsEdit(false);
  // };

  // const handleDelete = () => {
  //   setIsDeleteModalOpen(true);
  // };

  // const handleConfirmDelete = async () => {
  //   if (!currentTrack._id) return;
  //   await deleteTrack(currentTrack._id);

  //   if (!error) {
  //     setTracks(tracks.filter((track, i) => i !== index));
  //   }

  //   setIsDeleteModalOpen(false);
  // };

  // const isDisabled = () => {
  //   // if (!currentTrack.title || currentTrack.title === "") return true;
  //   return false;
  // };

  useEffect(() => {
    if (currentTrack?.userContractInfo) {
    }
  }, [currentTrack?.userContractInfo]);

  // const handleEdit = () => {
  //   setPrefTrack(currentTrack);
  //   setIsEdit(true);
  // };

  return (
    <Container>
      <Gap height={48} />
      <Header>
        <TitleWrapper>트랙 상세 정보</TitleWrapper>
        {/* <DetailHeaderButton
          isEdit={isEdit}
          setIsEdit={(value) => {
            if (value) handleEdit();
            else setIsEdit(value);
          }}
          onSubmit={handleConfirmUpdate}
          onDelete={handleDelete}
          isDisabled={isDisabled()}
          onCancel={() => {
            setIsEdit(false);
            setTracks(
              tracks.map((track, i) => (i === index ? prefTrack : track)),
            );
          }}
        /> */}
      </Header>
      <Gap height={56} />
      <TrackTitle
        value={currentTrack.titleList || []}
        onChange={(value) => {
          setTracks(
            tracks.map((track, i) =>
              i === index ? { ...track, titleList: value } : track,
            ),
          );
        }}
        readOnly={false}
      />
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label="트랙 코드"
          placeholder="트랙 코드를 입력"
          size="small"
          value={currentTrack.trackUniqueId || ""}
          onChange={(e) => {
            setTracks(
              tracks.map((track, i) =>
                i === index
                  ? { ...track, trackUniqueId: e.target.value }
                  : track,
              ),
            );
          }}
          // readOnly={!isEdit}
        />
        <CustomInput
          label="ISRC"
          placeholder="ISRC 입력"
          size="small"
          value={currentTrack.ISRC || ""}
          onChange={(e) => {
            setTracks(
              tracks.map((track, i) =>
                i === index ? { ...track, ISRC: e.target.value } : track,
              ),
            );
          }}
          // readOnly={!isEdit}
        />
      </RowWrapper>
      <Gap height={56} />
      <CustomInput
        label="UCI"
        placeholder="UCI 입력"
        size="small"
        value={currentTrack.UCI || ""}
        onChange={(e) => {
          setTracks(
            tracks.map((track, i) =>
              i === index ? { ...track, UCI: e.target.value } : track,
            ),
          );
        }}
        // readOnly={!isEdit}
      />
      <Gap height={56} />
      <ReleaseArtistSearch
        value={currentTrack.releaseArtistList || []}
        onChange={(e) => {
          setTracks(
            tracks.map((track, i) =>
              i === index
                ? { ...track, releaseArtistList: e || undefined }
                : track,
            ),
          );
        }}
        placeholder="아티스트 검색"
        label="트랙 아티스트"
        modalHeader="트랙 아티스트 검색"
        // readOnly={!isEdit}
      />
      <Gap height={56} />
      <ParticipateArtistSearch
        value={currentTrack.participateArtistList || []}
        onChange={(e) => {
          setTracks(
            tracks.map((track, i) =>
              i === index
                ? { ...track, participateArtistList: e || undefined }
                : track,
            ),
          );
        }}
        placeholder="아티스트 검색"
        label="참여 아티스트"
        modalHeader="참여 아티스트 검색"
        // readOnly={!isEdit}
      />
      <Gap height={56} />
      <TrackGenre
        mainGenre={currentTrack.mainGenre || ""}
        subGenre={currentTrack.subGenre || ""}
        onChangeMainGenre={(value) => {
          setTracks(
            tracks.map((track, i) =>
              i === index ? { ...track, mainGenre: value } : track,
            ),
          );
        }}
        onChangeSubGenre={(value) => {
          setTracks(
            tracks.map((track, i) =>
              i === index ? { ...track, subGenre: value } : track,
            ),
          );
        }}
        // readOnly={!isEdit}
      />
      <Gap height={56} />
      <RowWrapper>
        <TrackReleaseCountryCode
          value={currentTrack.releaseCountryCode || ""}
          onChange={(value) => {
            setTracks(
              tracks.map((track, i) =>
                i === index ? { ...track, releaseCountryCode: value } : track,
              ),
            );
          }}
          // readOnly={!isEdit}
        />
        <TrackUserContract
          value={currentTrack.userContractInfo || null}
          userId={currentTrack.userId}
          userContractId={currentTrack.userContractId}
          onChange={(value) => {
            setTracks(
              tracks.map((track, i) =>
                i === index
                  ? { ...track, userContractInfo: value || undefined }
                  : track,
              ),
            );
          }}
          readOnly={false}
        />
      </RowWrapper>
      <Gap height={56} />
      <TrackReleaseDate
        utcReleasedAt={currentTrack.utcReleasedAt || null}
        utcServiceStartedAt={currentTrack.utcServiceStartedAt || null}
        onChangeReleasedAt={(value) => {
          setTracks(
            tracks.map((track, i) =>
              i === index
                ? {
                    ...track,
                    utcReleasedAt: value || undefined,
                  }
                : track,
            ),
          );
        }}
        onChangeServiceStartedAt={(value) => {
          setTracks(
            tracks.map((track, i) =>
              i === index
                ? {
                    ...track,
                    utcServiceStartedAt: value || undefined,
                  }
                : track,
            ),
          );
        }}
        readOnly={false}
      />
      <Gap height={56} />
      <RowWrapper>
        <CustomRadioWithLabel
          label="노출"
          leftOption={{
            label: "해당",
            value: true,
            checked: currentTrack.isExposed === true,
          }}
          rightOption={{
            label: "해당없음",
            value: false,
            checked: currentTrack.isExposed === false,
          }}
          onChange={(e) => {
            setTracks(
              tracks.map((track, i) =>
                i === index ? { ...track, isExposed: e.target.value } : track,
              ),
            );
          }}
          value={currentTrack.isExposed}
          // readOnly={!isEdit}
        />
        <CustomRadioWithLabel
          label="19금"
          leftOption={{
            label: "해당",
            value: true,
            checked: currentTrack.isAdultOnly === true,
          }}
          rightOption={{
            label: "해당없음",
            value: false,
            checked: currentTrack.isAdultOnly === false,
          }}
          onChange={(e) => {
            setTracks(
              tracks.map((track, i) =>
                i === index ? { ...track, isAdultOnly: e.target.value } : track,
              ),
            );
          }}
          value={currentTrack.isAdultOnly}
          // readOnly={!isEdit}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomRadioWithLabel
          label="MV 서비스"
          leftOption={{
            label: "해당",
            value: true,
            checked: currentTrack.isMVService === true,
          }}
          rightOption={{
            label: "해당없음",
            value: false,
            checked: currentTrack.isMVService === false,
          }}
          value={currentTrack.isMVService}
          onChange={(e) => {
            setTracks(
              tracks.map((track, i) =>
                i === index ? { ...track, isMVService: e.target.value } : track,
              ),
            );
          }}
          // readOnly={!isEdit}
        />
      </RowWrapper>
      <Gap height={56} />
      <SpecialAudio
        track={currentTrack}
        tracks={tracks}
        setTracks={setTracks}
        // readOnly={!isEdit}
      />
      {/* <CustomModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        content="해당 트랙을 삭제할까요?"
      />
      <CustomModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        content="변경사항을 저장할까요?"
      /> */}
      <Gap height={56} />
    </Container>
  );
}
