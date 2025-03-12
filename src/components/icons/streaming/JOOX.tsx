import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface JOOXProps {
  width?: number;
  height?: number;
}

const JOOX = ({ width = 28, height = 28 }: JOOXProps) => {
  return (
    <Container>
      <Image src="/assets/joox.svg" alt="JOOX" width={width} height={height} />
    </Container>
  );
};

export default JOOX;
