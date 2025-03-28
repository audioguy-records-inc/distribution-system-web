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
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import CustomCheckbox2 from "@/components/basic/CustomCheckbox2";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import PlusIcon from "@/components/icons/PlusIcon";
import Track from "@/types/track";
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

  const columns: Column<EditTrack>[] = [
    {
      header: "",
      accessor: "_id",
      align: "center",
      type: "string",
      width: 48,
      render: (value, record) => {
        return (
          <CustomCheckbox2
            checked={record.isSelected || false}
            onChange={(checked) => {
              setTracks(
                tracks.map((track) =>
                  track._id === record._id
                    ? { ...track, isSelected: checked }
                    : track,
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
        const _value = value as number | null;
        return (
          <CustomInput
            value={_value?.toString() || ""}
            onChange={(e) => {}}
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
      width: 80,
      render: (value, record, index) => {
        const _value = value as number | null;
        return (
          <CustomInput
            value={_value?.toString() || ""}
            onChange={(e) => {}}
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
            value={_value}
            onChange={(e) => {}}
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
      width: 80,
      render: (value, record, index) => {
        const _value = value as boolean;
        return <CustomCheckbox2 checked={_value} onChange={(checked) => {}} />;
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
        return <CustomCheckbox2 checked={_value} onChange={(checked) => {}} />;
      },
    },
    {
      header: "트랙 아티스트",
      accessor: "releaseArtistList",
      align: "center",
      type: "string",
      width: 80,
      render: (value, record, index) => {
        const _value = value as ArtistInfo[];
        if (!_value) return null;
        return <div>{_value.map((artist) => artist.name).join(", ")}</div>;
      },
    },
  ];

  const handleAddTrack = () => {
    console.log("add track");
    const newTrack: EditTrack = {
      isSelected: false,
    };
    setTracks([...tracks, newTrack]);
  };

  return (
    <Container>
      <Gap height={32} />
      <BulkApply albumWatch={albumWatch} />
      <Gap height={32} />
      <CustomTable columns={columns} data={tracks} />
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
