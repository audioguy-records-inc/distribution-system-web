import AppleMusic from "@/components/icons/streaming/AppleMusic";
import Bugs from "@/components/icons/streaming/Bugs";
import Flo from "@/components/icons/streaming/Flo";
import Genie from "@/components/icons/streaming/Genie";
import JOOX from "@/components/icons/streaming/JOOX";
import KKBOX from "@/components/icons/streaming/KKBOX";
import Melon from "@/components/icons/streaming/Melon";
import Spotify from "@/components/icons/streaming/Spotify";
import Vibe from "@/components/icons/streaming/Vibe";
import YoutubeMusic from "@/components/icons/streaming/YoutubeMusic";
import styled from "styled-components";

const Container = styled.div``;

export default function MusicLogoSection() {
  return (
    <Container>
      <Spotify />
      <Bugs />
      <YoutubeMusic />
      <Melon />
      <Flo />
      <AppleMusic />
      <Genie />
      <Vibe />
      <KKBOX />
      <JOOX />
    </Container>
  );
}
