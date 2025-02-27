import AmountIcon from "@/components/icons/AmountIcon";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import CaretLeftIcon from "@/components/icons/CaretLeftIcon";
import CaretRightIcon from "@/components/icons/CaretRightIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import DotIcon from "@/components/icons/DotIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import ListIcon from "@/components/icons/ListIcon";
import LoadIcon from "@/components/icons/LoadIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import PercentIcon from "@/components/icons/PercentIcon";
import PlaceholderIcon from "@/components/icons/PlaceholderIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import XIcon from "@/components/icons/XIcon";
import styled from "styled-components";

const Container = styled.div``;

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

export default function IconSection() {
  return (
    <Container>
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
