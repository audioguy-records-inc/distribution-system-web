import CustomRadio from "@/components/basic/CustomRadio";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function RadioSection() {
  return (
    <Container>
      <RadioWrapper>
        <CustomRadio checked={false} onChange={() => {}} label="레이블" />
        <CustomRadio checked={true} onChange={() => {}} label="레이블" />
        <CustomRadio
          checked={false}
          onChange={() => {}}
          label="레이블"
          disabled
        />
        <CustomRadio
          checked={true}
          onChange={() => {}}
          label="레이블"
          disabled
        />
      </RadioWrapper>
      <RadioWrapper>
        <CustomRadio
          checked={false}
          onChange={() => {}}
          label="레이블"
          size="small"
        />
        <CustomRadio
          checked={true}
          onChange={() => {}}
          label="레이블"
          size="small"
        />
        <CustomRadio
          checked={false}
          onChange={() => {}}
          label="레이블"
          size="small"
          disabled
        />
        <CustomRadio
          checked={true}
          onChange={() => {}}
          label="레이블"
          size="small"
          disabled
        />
      </RadioWrapper>
    </Container>
  );
}
