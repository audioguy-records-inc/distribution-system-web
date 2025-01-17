import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface MelonProps {
  width?: number;
  height?: number;
}

const Melon = ({ width = 28, height = 28 }: MelonProps) => {
  return (
    <Container>
      <Image
        src="/assets/melon.svg"
        alt="Melon"
        width={width}
        height={height}
      />
    </Container>
  );
};

export default Melon;
