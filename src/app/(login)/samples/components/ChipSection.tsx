import CustomChip from "@/components/basic/CustomChip";
import DSPFilterChip from "@/components/DsFilterChip";
import Facebook from "@/components/icons/sns/Facebook";
import Melon from "@/components/icons/streaming/Melon";
import Spotify from "@/components/icons/streaming/Spotify";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function ChipSection() {
  return (
    <Container>
      <ChipWrapper>
        <CustomChip label="Label" deletable />
        <CustomChip label="Label" deletable isSelected />
        <CustomChip label="Label" icon={<Spotify />} />
        <CustomChip label="Label" icon={<Spotify />} isSelected />
        <CustomChip label="Label" />
        <CustomChip label="Label" isSelected />
      </ChipWrapper>
      <DSPFilterChip />
    </Container>
  );
}
