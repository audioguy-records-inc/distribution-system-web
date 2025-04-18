import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import { EditTrack } from "../TrackSection";
import Gap from "@/components/basic/Gap";
import UploadSpecialTrackAudio from "./UploadSpecialTrackAudio";
import styled from "styled-components";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

export default function SpecialAudio({
  track,
  tracks = [],
  setTracks = () => {},
  readOnly = false,
}: {
  track: EditTrack;
  tracks: EditTrack[];
  setTracks: (tracks: EditTrack[]) => void;
  readOnly?: boolean;
}) {
  return (
    <Container>
      <RowWrapper>
        <CustomRadioWithLabel
          label="공간 음향 서비스"
          leftOption={{
            label: "해당",
            value: true,
            checked: track.isSupportedSpatialAudio === true,
          }}
          rightOption={{
            label: "해당없음",
            value: false,
            checked: track.isSupportedSpatialAudio === false,
          }}
          value={track.isSupportedSpatialAudio}
          onChange={(e) => {
            setTracks(
              tracks.map((t) =>
                t._id === track._id
                  ? { ...t, isSupportedSpatialAudio: e.target.value }
                  : t,
              ),
            );
          }}
          readOnly={readOnly}
        />
        {track.isSupportedSpatialAudio && (
          <UploadSpecialTrackAudio track={track} readOnly={readOnly} />
        )}
      </RowWrapper>
      <Gap height={56} />
      {track.isSupportedSpatialAudio && (
        <RowWrapper>
          <CustomInput
            label="공간 음향 음원 UPC"
            size="small"
            value={track.spatialAudioInfo?.UPC || ""}
            readOnly={readOnly}
            onChange={(e) => {
              setTracks(
                tracks.map((t) =>
                  t._id === track._id
                    ? {
                        ...t,
                        spatialAudioInfo: {
                          ...t.spatialAudioInfo,
                          UPC: e.target.value,
                        },
                      }
                    : t,
                ),
              );
            }}
          />
          <CustomInput
            label="공간 음향 음원 ISRC"
            size="small"
            value={track.spatialAudioInfo?.ISRC || ""}
            readOnly={readOnly}
            onChange={(e) => {
              setTracks(
                tracks.map((t) =>
                  t._id === track._id
                    ? {
                        ...t,
                        spatialAudioInfo: {
                          ...t.spatialAudioInfo,
                          ISRC: e.target.value,
                        },
                      }
                    : t,
                ),
              );
            }}
          />
        </RowWrapper>
      )}
    </Container>
  );
}
