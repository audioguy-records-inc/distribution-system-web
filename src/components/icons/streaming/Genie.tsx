import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface GenieProps {
  width?: number;
  height?: number;
}

const Genie = ({ width = 28, height = 28 }: GenieProps) => {
  return (
    <Container>
      <Image
        src="/assets/genie.svg"
        alt="Genie"
        width={width}
        height={height}
      />
    </Container>
  );
};

export default Genie;
