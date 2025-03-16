import AmazonMusic from "./icons/streaming/AmazonMusic";
import AppleMusic from "./icons/streaming/AppleMusic";
import Bugs from "./icons/streaming/Bugs";
import CustomChip from "./basic/CustomChip";
import Flo from "./icons/streaming/Flo";
import Genie from "./icons/streaming/Genie";
import JOOX from "./icons/streaming/JOOX";
import KKBOX from "./icons/streaming/KKBOX";
import Melon from "./icons/streaming/Melon";
import Spotify from "./icons/streaming/Spotify";
import Vibe from "./icons/streaming/Vibe";
import YoutubeMusic from "./icons/streaming/YoutubeMusic";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const DSPFilterChip = () => {
  return (
    <Container>
      <CustomChip label="ALL" />
      <CustomChip label="Melon" icon={<Melon />} />
      <CustomChip label="Youtube Music" icon={<YoutubeMusic />} />
      <CustomChip label="Spotify" icon={<Spotify />} />
      <CustomChip label="Apple Music" icon={<AppleMusic />} />
      <CustomChip label="Genie" icon={<Genie />} />
      <CustomChip label="Bugs" icon={<Bugs />} />
      <CustomChip label="Flo" icon={<Flo />} />
      <CustomChip label="Vibe" icon={<Vibe />} />
      <CustomChip label="KKBOX" icon={<KKBOX />} />
      <CustomChip label="JOOK" icon={<JOOX />} />
      <CustomChip label="Amazon Music" icon={<AmazonMusic />} />
    </Container>
  );
};

export default DSPFilterChip;
