import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function PercentIcon({
  color = "black",
  ...props
}: SVGProps<SVGSVGElement> & { color?: string }) {
  return (
    <Container>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M4.125 19.875L19.875 4.125"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.375 9.75C8.23896 9.75 9.75 8.23896 9.75 6.375C9.75 4.51104 8.23896 3 6.375 3C4.51104 3 3 4.51104 3 6.375C3 8.23896 4.51104 9.75 6.375 9.75Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.625 21C19.489 21 21 19.489 21 17.625C21 15.761 19.489 14.25 17.625 14.25C15.761 14.25 14.25 15.761 14.25 17.625C14.25 19.489 15.761 21 17.625 21Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
}
