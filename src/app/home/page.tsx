"use client";

import AppleMusic from "@/components/icons/streaming/AppleMusic";
import ArrowDown from "@/components/icons/ArrowDown";
import Bugs from "@/components/icons/streaming/Bugs";
import EmptySNS from "@/components/icons/sns/EmptySNS";
import Facebook from "@/components/icons/sns/Facebook";
import Facebook2 from "@/components/icons/sns/Youtube";
import Flo from "@/components/icons/streaming/Flo";
import Genie from "@/components/icons/streaming/Genie";
import Instagram from "@/components/icons/sns/Instagram";
import JOOX from "@/components/icons/streaming/JOOX";
import KKBOX from "@/components/icons/streaming/KKBOX";
import Melon from "@/components/icons/streaming/Melon";
import Spotify from "@/components/icons/streaming/Spotify";
import TikTok from "@/components/icons/sns/TikTok";
import Vibe from "@/components/icons/streaming/Vibe";
import X from "@/components/icons/sns/X";
import Youtube from "@/components/icons/sns/Youtube";
import YoutubeMusic from "@/components/icons/streaming/YoutubeMusic";
import styled from "styled-components";

const Container = styled.div``;

export default function Home() {
  return (
    <Container>
      Home
      <ArrowDown />
      <Instagram />
      <Facebook />
      <Youtube />
      <X />
      <TikTok />
      <EmptySNS />
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
