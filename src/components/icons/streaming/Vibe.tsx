import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface VibeProps {
  width?: number;
  height?: number;
}

const Vibe = ({ width = 28, height = 28 }: VibeProps) => {
  return (
    <Container>
      <Image src="/assets/vibe.svg" alt="Vibe" width={width} height={height} />
    </Container>
  );
};

export default Vibe;
