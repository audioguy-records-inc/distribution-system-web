import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function ArrowRightIcon({
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
          d="M9 4.5L16.5 12L9 19.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
}
