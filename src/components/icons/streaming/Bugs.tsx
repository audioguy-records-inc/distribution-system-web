import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface BugsProps {
  width?: number;
  height?: number;
}

const Bugs = ({ width = 28, height = 28 }: BugsProps) => {
  return (
    <Container>
      <Image src="/assets/bugs.svg" alt="Bugs" width={width} height={height} />
    </Container>
  );
};

export default Bugs;
