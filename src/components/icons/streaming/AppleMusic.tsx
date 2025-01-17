import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface AppleMusicProps {
  width?: number;
  height?: number;
}

const AppleMusic = ({ width = 28, height = 28 }: AppleMusicProps) => {
  return (
    <Container>
      <Image
        src="/assets/apple-music.svg"
        alt="AppleMusic"
        width={width}
        height={height}
      />
    </Container>
  );
};

export default AppleMusic;
