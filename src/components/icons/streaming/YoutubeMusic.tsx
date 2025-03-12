import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface YoutubeMusicProps {
  width?: number;
  height?: number;
}

const YoutubeMusic = ({ width = 28, height = 28 }: YoutubeMusicProps) => {
  return (
    <Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
      >
        <g clipPath="url(#clip0_4539_35597)">
          <path
            d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
            fill="#FF0000"
          />
          <path
            d="M14 7.61478C17.5213 7.61478 20.3852 10.4787 20.3852 14C20.3852 17.5213 17.5213 20.3852 14 20.3852C10.4787 20.3852 7.61478 17.5213 7.61478 14C7.61478 10.4787 10.4787 7.61478 14 7.61478ZM14 7C10.1333 7 7 10.1333 7 14C7 17.8667 10.1333 21 14 21C17.8667 21 21 17.8667 21 14C21 10.1333 17.8667 7 14 7Z"
            fill="white"
          />
          <path
            d="M11.9766 17.9922L17.9922 13.8264L11.9766 10.0078V17.9922Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_4539_35597">
            <rect width="28" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Container>
  );
};

export default YoutubeMusic;
