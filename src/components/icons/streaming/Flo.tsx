import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface FloProps {
  width?: number;
  height?: number;
}

const Flo = ({ width = 28, height = 28 }: FloProps) => {
  return (
    <Container>
      <Image src="/assets/flo.svg" alt="Flo" width={width} height={height} />
    </Container>
  );
};

export default Flo;
