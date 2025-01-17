import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface ArrowDownProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowDown = ({
  width = 24,
  height = 24,
  color = "#000",
}: ArrowDownProps) => {
  return (
    <Container>
      {/* <ArrowDownIcon width={width} height={height} color={color} /> */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.6033 6.62748C20.1066 7.13078 20.1066 7.9468 19.6033 8.45011L10.6808 17.3725C10.1775 17.8758 9.36152 17.8758 8.85822 17.3725L4.39701 12.9113C3.8937 12.408 3.8937 11.592 4.39701 11.0887C4.90032 10.5854 5.71633 10.5854 6.21964 11.0887L9.76953 14.6386L17.7806 6.62748C18.2839 6.12417 19.1 6.12417 19.6033 6.62748Z"
          fill={color}
        />
      </svg>
    </Container>
  );
};

export default ArrowDown;
