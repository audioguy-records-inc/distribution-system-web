import Album, { ArtistInfo } from "@/types/album";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
  useFieldArray,
  useForm,
} from "react-hook-form";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useState } from "react";

import BulkApply from "./fragment/BulkApply";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import CustomCheckbox2 from "@/components/basic/CustomCheckbox2";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import LyricsAddModal from "./fragment/LyricsAddModal";
import PlusIcon from "@/components/icons/PlusIcon";
import Track from "@/types/track";
import TrackDetail from "./fragment/TrackDetail";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import UploadTrackAudio from "./fragment/UploadTrackAudio";
import styled from "styled-components";
import { useTrackStore } from "@/stores/use-track-store";

const Container = styled.div``;

const ColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export interface EditTrack extends Track {
  isSelected?: boolean;
}

interface TrackSectionProps {
  albumWatch: UseFormWatch<Album>;
}

export default function TrackSection({ albumWatch }: TrackSectionProps) {
  const { tracks, createTrack, error, fetchTracks } = useTrackStore();

  const [edittingTracks, setEdittingTracks] = useState<EditTrack[]>(tracks);
  const albumData = albumWatch();
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<EditTrack | null>(null);
  const [isCheckAll, setIsCheckAll] = useState(false);

  // 정렬 함수: 트랙번호가 있는 항목은 먼저 나오고, 없는 항목은 뒤로 정렬
  const sortTracks = (tracksToSort: EditTrack[]) => {
    return [...tracksToSort].sort((a, b) => {
      const aHasTrackNumber =
        a.trackNumber !== undefined && a.trackNumber !== null;
      const bHasTrackNumber =
        b.trackNumber !== undefined && b.trackNumber !== null;

      // 둘 다 트랙번호가 있거나 없는 경우
      if (aHasTrackNumber === bHasTrackNumber) {
        if (aHasTrackNumber && bHasTrackNumber) {
          // 트랙번호 오름차순 정렬
          return a.trackNumber! - b.trackNumber!;
        } else {
          // 둘 다 없으면 생성일(createdAt) 기준 오름차순 정렬
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return aDate - bDate;
        }
      }
      // 트랙번호가 있는 항목을 앞으로
      return aHasTrackNumber ? -1 : 1;
    });
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    setEdittingTracks(
      edittingTracks.map((track, i) =>
        i === index ? { ...track, isSelected: checked } : track,
      ),
    );

    setIsCheckAll(checked);
  };

  // 전체 체크박스 상태 변경 함수 추가
  const handleCheckAll = (checked: boolean) => {
    setIsCheckAll(checked);
    setEdittingTracks(
      edittingTracks.map((track) => ({
        ...track,
        isSelected: checked,
      })),
    );
  };

  // albumWatch 값이 변경될 때마다 모든 트랙의 albumId와 userId 업데이트
  useEffect(() => {
    const _fetchTracks = async () => {
      if (albumData?._id && albumData?.userId) {
        await fetchTracks(albumData?._id);

        setEdittingTracks((prevTracks) =>
          sortTracks(
            prevTracks.map((track) => ({
              ...track,
              albumId: albumData._id,
              userId: albumData.userId,
            })),
          ),
        );
      }
    };

    _fetchTracks();
  }, [albumData._id, albumData.userId]);

  // tracks가 변경될 때마다 정렬된 상태로 업데이트
  useEffect(() => {
    setEdittingTracks(sortTracks(tracks));
  }, [tracks]);

  const columns: Column<EditTrack>[] = [
    {
      header: "",
      renderHeader: () => {
        return (
          <ColumnWrapper>
            <CustomCheckbox2
              checked={isCheckAll}
              onChange={(checked) => {
                handleCheckAll(checked);
              }}
            />
          </ColumnWrapper>
        );
      },
      accessor: "_id",
      align: "center",
      type: "string",
      width: 60,
      render: (value, record, index) => {
        return (
          <CustomCheckbox2
            checked={record.isSelected || false}
            onChange={(checked) => {
              setEdittingTracks(
                edittingTracks.map((track, i) =>
                  i === index ? { ...track, isSelected: checked } : track,
                ),
              );
            }}
          />
        );
      },
    },
    {
      header: "Disc",
      accessor: "discNumber",
      align: "center",
      type: "input",
      width: 80,
      render: (value, record, index) => {
        let _value = value as number | undefined;
        if (_value && _value < 0) {
          _value = undefined;
        }

        return (
          <CustomInput
            value={_value?.toString() || ""}
            onChange={(e) => {
              let _value = e.target.value
                ? parseInt(e.target.value)
                : undefined;
              if (_value && _value < 0) {
                _value = undefined;
              }
              setEdittingTracks(
                edittingTracks.map((track, i) =>
                  i === index
                    ? {
                        ...track,
                        discNumber: parseInt(e.target.value) || undefined,
                      }
                    : track,
                ),
              );
            }}
            width={56}
            size="small"
            type="number"
          />
        );
      },
    },
    {
      header: "트랙 번호",
      accessor: "trackNumber",
      align: "center",
      type: "input",
      width: 100,
      render: (value, record, index) => {
        let _value = value as number | undefined;
        if (_value && _value < 0) {
          _value = undefined;
        }

        return (
          <CustomInput
            value={_value?.toString() || ""}
            onChange={(e) => {
              let _value = e.target.value
                ? parseInt(e.target.value)
                : undefined;
              if (_value && _value < 0) {
                _value = undefined;
              }
              setEdittingTracks(
                edittingTracks.map((track, i) =>
                  i === index
                    ? {
                        ...track,
                        trackNumber: parseInt(e.target.value) || undefined,
                      }
                    : track,
                ),
              );
            }}
            width={56}
            size="small"
            type="number"
          />
        );
      },
    },
    {
      header: "트랙명",
      accessor: "title",
      align: "center",
      type: "input",
      width: 174,
      render: (value, record, index) => {
        const _value = value as string;
        return (
          <CustomInput
            value={_value?.toString() || ""}
            onChange={(e) => {
              setEdittingTracks(
                edittingTracks.map((track, i) =>
                  i === index ? { ...track, title: e.target.value } : track,
                ),
              );
            }}
            width={150}
            size="small"
          />
        );
      },
    },
    {
      header: "메인타이틀",
      accessor: "isMainTitle",
      align: "center",
      type: "input",
      width: 100,
      render: (value, record, index) => {
        const _value = value as boolean;
        return (
          <CustomCheckbox2
            checked={_value}
            onChange={(checked) => {
              setEdittingTracks(
                edittingTracks.map((track, i) =>
                  i === index ? { ...track, isMainTitle: checked } : track,
                ),
              );
            }}
          />
        );
      },
    },
    {
      header: "타이틀",
      accessor: "isTitle",
      align: "center",
      type: "input",
      width: 80,
      render: (value, record, index) => {
        const _value = value as boolean;
        return (
          <CustomCheckbox2
            checked={_value}
            onChange={(checked) => {
              setEdittingTracks(
                edittingTracks.map((track, i) =>
                  i === index ? { ...track, isTitle: checked } : track,
                ),
              );
            }}
          />
        );
      },
    },
    {
      header: "트랙 아티스트",
      accessor: "releaseArtistList",
      align: "center",
      type: "string",
      width: 120,
      render: (value, record, index) => {
        const _value = value as ArtistInfo[];
        if (!_value || _value.length === 0) return "없음";
        if (_value.length === 1) return _value[0].name;
        return `${_value[0].name} 외 ${_value.length - 1}`;
      },
    },
    {
      header: "가사",
      accessor: "lyrics",
      align: "center",
      type: "input",
      width: 80,
      render: (value, record, index) => {
        const hasLyrics = record.lyrics && record.lyrics.trim() !== "";
        return (
          <ButtonOutlinedPrimary
            label={hasLyrics ? "수정" : "등록"}
            size="small"
            onClick={() => {
              if (!record) return;
              setIsLyricsModalOpen(true);
              setSelectedTrack(record);
            }}
          />
        );
      },
    },
    {
      header: "음원",
      accessor: "trackFileList",
      align: "center",
      type: "input",
      width: 174,
      render: (value, record, index) => {
        return <UploadTrackAudio track={record} />;
      },
    },
  ];

  const handleAddTrack = async () => {
    const albumData = albumWatch();
    const newTrack: EditTrack = {
      albumId: albumData?._id,
      userId: albumData?.userId,
      isExposed: true,
    };
    await createTrack(newTrack);
  };

  return (
    <Container>
      <Gap height={32} />
      <BulkApply
        albumWatch={albumWatch}
        tracks={edittingTracks}
        setTracks={setEdittingTracks}
      />
      <Gap height={32} />
      <CustomTable
        columns={columns}
        data={edittingTracks}
        expandable={{
          expandedRowRender: (record, index) => {
            if (index === undefined) return null;

            return (
              <TrackDetail
                record={record}
                index={index}
                tracks={edittingTracks}
                setTracks={setEdittingTracks}
              />
            );
          },
          expandColumnWidth: 50,
        }}
        size="small"
      />
      <Gap height={12} />
      <ButtonOutlinedSecondary
        label="추가"
        size="medium"
        onClick={handleAddTrack}
        leftIcon={<PlusIcon />}
        expand
      />

      {/* 가사 등록 모달 */}
      <LyricsAddModal
        isOpen={isLyricsModalOpen}
        onClose={() => setIsLyricsModalOpen(false)}
        track={selectedTrack}
      />
    </Container>
  );
}
