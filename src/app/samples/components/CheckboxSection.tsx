import CustomCheckbox from "@/components/basic/CustomCheckbox";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function CheckboxSection() {
  return (
    <Container>
      <CheckboxWrapper>
        <CustomCheckbox checked={false} onChange={() => {}} label="레이블" />
        <CustomCheckbox checked={true} onChange={() => {}} label="레이블" />
        <CustomCheckbox
          checked={false}
          onChange={() => {}}
          label="레이블"
          disabled
        />
        <CustomCheckbox
          checked={true}
          onChange={() => {}}
          label="레이블"
          disabled
        />
      </CheckboxWrapper>
      <CheckboxWrapper>
        <CustomCheckbox
          checked={false}
          onChange={() => {}}
          label="레이블"
          size="small"
        />
        <CustomCheckbox
          checked={true}
          onChange={() => {}}
          label="레이블"
          size="small"
        />
        <CustomCheckbox
          checked={false}
          onChange={() => {}}
          label="레이블"
          size="small"
          disabled
        />
        <CustomCheckbox
          checked={true}
          onChange={() => {}}
          label="레이블"
          size="small"
          disabled
        />
      </CheckboxWrapper>
    </Container>
  );
}
