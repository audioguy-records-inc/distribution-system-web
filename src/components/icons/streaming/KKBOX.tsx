import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface KKBOXProps {
  width?: number;
  height?: number;
}

const KKBOX = ({ width = 28, height = 28 }: KKBOXProps) => {
  return (
    <Container>
      <Image
        src="/assets/kkbox.svg"
        alt="KKBOX"
        width={width}
        height={height}
      />
    </Container>
  );
};

export default KKBOX;
