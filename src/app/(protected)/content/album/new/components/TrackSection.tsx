import Album, { ArtistInfo, TitleLanguage } from "@/types/album";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { useEffect, useState } from "react";

import BulkApply from "./fragment/BulkApply";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import CustomCheckbox2 from "@/components/basic/CustomCheckbox2";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import LyricsAddModal from "./fragment/LyricsAddModal";
import PlusIcon from "@/components/icons/PlusIcon";
import Track from "@/types/track";
import TrackDetail from "./fragment/TrackDetail";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadTrackAudio from "./fragment/UploadTrackAudio";
import { UseFormWatch } from "react-hook-form";
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
  const { tracks, edittingTracks, setEdittingTracks, error, fetchTracks } =
    useTrackStore();

  const albumData = albumWatch();
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<EditTrack | null>(null);
  const [isCheckAll, setIsCheckAll] = useState(true);

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
      accessor: "titleList",
      align: "center",
      type: "input",
      width: 174,
      render: (value, record, index) => {
        const _value = value as TitleLanguage[];

        // 타이틀 목록에서 첫 번째 타이틀 표시 (있는 경우)
        if (_value && _value.length > 0) {
          const firstTitle = _value[0];
          const lang = Object.keys(firstTitle)[0];
          return firstTitle[lang] || "";
        }
        return "";
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
    {
      header: "",
      accessor: "_id" as keyof EditTrack,
      align: "center",
      type: "button",
      width: 60,
      icon: <TrashIcon />,
      onClick: (record, index) => {
        if (index === undefined) return;

        // 서버에 저장된 트랙인 경우 API 호출하여 삭제
        if (record._id) {
          useTrackStore.getState().deleteTrack(record._id);
        }

        // UI에서 트랙 제거
        setEdittingTracks(edittingTracks.filter((_, i) => i !== index));
      },
    },
  ];

  useEffect(() => {
    const _fetchTracks = async () => {
      if (albumData?._id && albumData?.userId) {
        await fetchTracks(albumData?._id);
      }
    };
    _fetchTracks();
  }, [albumData._id, albumData.userId]);

  useEffect(() => {
    // 모든 트랙의 isSelected를 true로 설정
    if (edittingTracks.length > 0) {
      setEdittingTracks(
        edittingTracks.map((track) => ({
          ...track,
          isSelected: true,
        })),
      );
    }
  }, [edittingTracks.length]);

  const handleAddTrack = async () => {
    const albumData = albumWatch();
    const newTrack: EditTrack = {
      albumId: albumData?._id,
      userId: albumData?.userId,
      isExposed: true,
      isSelected: true,
      titleList: [{ ko: "" }, { en: "" }],
    };

    setEdittingTracks([...edittingTracks, newTrack]);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    setEdittingTracks(
      edittingTracks.map((track, i) =>
        i === index ? { ...track, isSelected: checked } : track,
      ),
    );

    setIsCheckAll(checked);
  };

  const handleCheckAll = (checked: boolean) => {
    setIsCheckAll(checked);
    setEdittingTracks(
      edittingTracks.map((track) => ({
        ...track,
        isSelected: checked,
      })),
    );
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

      <LyricsAddModal
        isOpen={isLyricsModalOpen}
        onClose={() => setIsLyricsModalOpen(false)}
        track={selectedTrack}
      />
    </Container>
  );
}
