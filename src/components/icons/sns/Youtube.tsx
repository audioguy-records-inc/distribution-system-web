import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface YoutubeProps {
  width?: number;
  height?: number;
  color?: string;
}

const Youtube = ({ width = 24, height = 24 }: YoutubeProps) => {
  return (
    <Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect width="24" height="24" rx="12" fill="#FF0000" />
        <path
          d="M20.219 7.87825C20.0213 7.1439 19.4423 6.56489 18.708 6.36718C17.3664 6 11.9999 6 11.9999 6C11.9999 6 6.63348 6 5.29187 6.35306C4.57163 6.55077 3.9785 7.1439 3.78079 7.87825C3.42773 9.21986 3.42773 12.0019 3.42773 12.0019C3.42773 12.0019 3.42773 14.7981 3.78079 16.1256C3.9785 16.86 4.55751 17.439 5.29187 17.6367C6.6476 18.0039 11.9999 18.0039 11.9999 18.0039C11.9999 18.0039 17.3664 18.0039 18.708 17.6508C19.4423 17.4531 20.0213 16.8741 20.219 16.1397C20.5721 14.7981 20.5721 12.0161 20.5721 12.0161C20.5721 12.0161 20.5862 9.21986 20.219 7.87825Z"
          fill="white"
        />
        <path
          d="M10.292 14.5721L14.7546 12.0019L10.292 9.43164V14.5721Z"
          fill="#FF0000"
        />
      </svg>
    </Container>
  );
};

export default Youtube;
