import CustomToggle from "@/components/basic/CustomToggle";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function ToggleSection() {
  return (
    <Container>
      <ToggleWrapper>
        <CustomToggle checked={false} onChange={() => {}} label="레이블" />
        <CustomToggle checked={true} onChange={() => {}} label="레이블" />
      </ToggleWrapper>
    </Container>
  );
}
