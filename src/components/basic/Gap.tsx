import styled from "styled-components";

interface GapProps {
  height: number;
}

const Container = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
`;

const Gap = ({ height }: GapProps) => {
  return <Container $height={height} />;
};

export default Gap;
