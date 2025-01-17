import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

interface XProps {
  width?: number;
  height?: number;
  color?: string;
}

const X = ({ width = 24, height = 24 }: XProps) => {
  return (
    <Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect width="24" height="24" rx="12" fill="black" />
        <path
          d="M4.83493 5.10596L10.3952 12.5631L4.7998 18.6243H6.0598L10.9571 13.3161L14.9149 18.6243H19.1998L13.3279 10.7489L18.5347 5.10596H17.2769L12.7659 9.99371L9.122 5.10596H4.83493ZM6.68761 6.03507H8.65663L17.3493 17.693H15.3803L6.68761 6.03507Z"
          fill="white"
        />
      </svg>
    </Container>
  );
};

export default X;
