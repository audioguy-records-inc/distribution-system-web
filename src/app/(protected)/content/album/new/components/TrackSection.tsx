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
import PlusIcon from "@/components/icons/PlusIcon";
import Track from "@/types/track";
import TrackDetail from "./TrackDetail";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import styled from "styled-components";
import { useTrackStore } from "@/stores/use-track-store";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface EditTrack extends Track {
  isSelected?: boolean;
}

interface TrackSectionProps {
  albumWatch: UseFormWatch<Album>;
}

export default function TrackSection({ albumWatch }: TrackSectionProps) {
  const [tracks, setTracks] = useState<EditTrack[]>([]);
  const albumData = albumWatch();

  // albumWatch 값이 변경될 때마다 모든 트랙의 albumId와 userId 업데이트
  useEffect(() => {
    if (albumData?._id && albumData?.userId) {
      setTracks((prevTracks) =>
        prevTracks.map((track) => ({
          ...track,
          albumId: albumData._id,
          userId: albumData.userId,
        })),
      );
    }
  }, [albumData._id, albumData.userId]);

  const columns: Column<EditTrack>[] = [
    {
      header: "",
      accessor: "_id",
      align: "center",
      type: "string",
      width: 48,
      render: (value, record, index) => {
        return (
          <CustomCheckbox2
            checked={record.isSelected || false}
            onChange={(checked) => {
              setTracks(
                tracks.map((track, i) =>
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
              setTracks(
                tracks.map((track, i) =>
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
              setTracks(
                tracks.map((track, i) =>
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
              setTracks(
                tracks.map((track, i) =>
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
              setTracks(
                tracks.map((track, i) =>
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
              setTracks(
                tracks.map((track, i) =>
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
        if (!_value) return "없음";
        return <div>{_value.map((artist) => artist.name).join(", ")}</div>;
      },
    },
    {
      header: "가사",
      accessor: "lyrics",
      align: "center",
      type: "input",
      width: 80,
      render: (value, record, index) => {
        return <ButtonOutlinedPrimary label="등록" size="small" />;
      },
    },
    {
      header: "음원",
      accessor: "trackFileList",
      align: "center",
      type: "input",
      width: 174,
      render: (value, record, index) => {
        return (
          <ButtonOutlinedPrimary
            label="업로드"
            size="small"
            leftIcon={<UploadIcon />}
          />
        );
      },
    },
  ];

  const handleAddTrack = () => {
    const albumData = albumWatch();
    const newTrack: EditTrack = {
      isSelected: false,
      albumId: albumData?._id,
      userId: albumData?.userId,
      isExposed: true,
    };
    setTracks([...tracks, newTrack]);
  };
  console.log("moonsae tracks", tracks);
  return (
    <Container>
      <Gap height={32} />
      <BulkApply albumWatch={albumWatch} />
      <Gap height={32} />
      <CustomTable
        columns={columns}
        data={tracks}
        expandable={{
          expandedRowRender: (record, index) => {
            if (index === undefined) return null;

            return (
              <TrackDetail
                record={record}
                index={index}
                tracks={tracks}
                setTracks={setTracks}
                onDelete={() => {
                  const newValue = [...tracks];
                  newValue.splice(index, 1);
                  setTracks(newValue);
                }}
                onSubmit={() => {}}
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
    </Container>
  );
}
