"use client";

import AmountIcon from "@/components/icons/AmountIcon";
import AppleMusic from "@/components/icons/streaming/AppleMusic";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import Bugs from "@/components/icons/streaming/Bugs";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CaretLeftIcon from "@/components/icons/CaretLeftIcon";
import CaretRightIcon from "@/components/icons/CaretRightIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import CustomInput from "@/components/basic/CustomInput";
import DotIcon from "@/components/icons/DotIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import EmptySNS from "@/components/icons/sns/EmptySNS";
import Facebook from "@/components/icons/sns/Facebook";
import Flo from "@/components/icons/streaming/Flo";
import Genie from "@/components/icons/streaming/Genie";
import ImageIcon from "@/components/icons/ImageIcon";
import Instagram from "@/components/icons/sns/Instagram";
import JOOX from "@/components/icons/streaming/JOOX";
import KKBOX from "@/components/icons/streaming/KKBOX";
import ListIcon from "@/components/icons/ListIcon";
import LoadIcon from "@/components/icons/LoadIcon";
import Melon from "@/components/icons/streaming/Melon";
import MinusIcon from "@/components/icons/MinusIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import PercentIcon from "@/components/icons/PercentIcon";
import PlaceholderIcon from "@/components/icons/PlaceholderIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import Spotify from "@/components/icons/streaming/Spotify";
import TikTok from "@/components/icons/sns/TikTok";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import Vibe from "@/components/icons/streaming/Vibe";
import X from "@/components/icons/sns/X";
import XIcon from "@/components/icons/XIcon";
import Youtube from "@/components/icons/sns/Youtube";
import YoutubeMusic from "@/components/icons/streaming/YoutubeMusic";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div``;

const Content = styled.div``;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  /* background-color: cyan; */
`;

const IconWrapper = styled.div`
  display: flex;
  border: 1px solid grey;
  align-items: center;
  justify-content: center;
`;

const Title1 = styled.div`
  ${theme.fonts.title1.semibold}
`;

const Title2 = styled.div`
  ${theme.fonts.title2.semibold}
`;

export default function Samples() {
  return (
    <Container>
      컴포넌트 모음
      <Content>
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
      </Content>
      <Title1>Title1</Title1>
      <Title2>Title2</Title2>
      <CustomInput
        label="Label"
        helpText="Help Text"
        placeholder="플레이스홀더 텍스트"
        required
        value="Value"
        // disabled
        // locked
        icon={<PlaceholderIcon />}
      />
      <CustomInput
        label="Label"
        helpText="Help Text"
        placeholder="플레이스홀더 텍스트"
        required
        value="Value"
        size="small"
        icon={<PlaceholderIcon />}
      />
      <IconContainer>
        <IconWrapper>
          <PlaceholderIcon />
        </IconWrapper>
        <IconWrapper>
          <CheckIcon />
        </IconWrapper>
        <IconWrapper>
          <DotIcon />
        </IconWrapper>
        <IconWrapper>
          <XIcon />
        </IconWrapper>
        <IconWrapper>
          <ArrowDownIcon />
        </IconWrapper>
        <IconWrapper>
          <ArrowUpIcon />
        </IconWrapper>
        <IconWrapper>
          <ArrowRightIcon />
        </IconWrapper>
        <IconWrapper>
          <ArrowLeftIcon />
        </IconWrapper>
        <IconWrapper>
          <CaretRightIcon />
        </IconWrapper>
        <IconWrapper>
          <CaretLeftIcon />
        </IconWrapper>
        <IconWrapper>
          <PlusIcon />
        </IconWrapper>
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
        <IconWrapper>
          <TrashIcon />
        </IconWrapper>
        <IconWrapper>
          <PencilIcon />
        </IconWrapper>
        <IconWrapper>
          <UploadIcon />
        </IconWrapper>
        <IconWrapper>
          <DownloadIcon />
        </IconWrapper>
        <IconWrapper>
          <CalendarIcon />
        </IconWrapper>
        <IconWrapper>
          <PercentIcon />
        </IconWrapper>
        <IconWrapper>
          <MinusIcon />
        </IconWrapper>
        <IconWrapper>
          <ClockIcon />
        </IconWrapper>
        <IconWrapper>
          <ImageIcon />
        </IconWrapper>
        <IconWrapper>
          <AmountIcon />
        </IconWrapper>
        <IconWrapper>
          <ListIcon />
        </IconWrapper>
        <IconWrapper>
          <LoadIcon />
        </IconWrapper>
      </IconContainer>
    </Container>
  );
}
