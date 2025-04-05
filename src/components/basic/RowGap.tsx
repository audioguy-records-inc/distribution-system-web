import styled from "styled-components";

interface RowGapProps {
  width: number;
}

const Container = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
`;

const RowGap = ({ width }: RowGapProps) => {
  return <Container $width={width} />;
};

export default RowGap;
