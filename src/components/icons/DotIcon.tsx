import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function DotIcon({
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 12C16 14.208 14.208 16 12 16C9.792 16 8 14.208 8 12C8 9.79201 9.792 8 12 8C14.208 8 16 9.79201 16 12Z"
          fill={color}
        />
      </svg>
    </Container>
  );
}
