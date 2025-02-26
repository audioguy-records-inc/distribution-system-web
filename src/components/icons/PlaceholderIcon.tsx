import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function PlaceholderIcon({
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
          d="M4.62454 7.22219L10.8924 3.31662C11.5699 2.89446 12.4295 2.89446 13.107 3.31661L19.3749 7.22218C19.9858 7.60282 20.3569 8.27035 20.3569 8.98854V15.0115C20.3569 15.7296 19.9858 16.3972 19.3749 16.7778L13.107 20.6834C12.4295 21.1055 11.5699 21.1055 10.8924 20.6834L4.62454 16.7778C4.01368 16.3972 3.64258 15.7296 3.64258 15.0115V8.98854C3.64258 8.27035 4.01367 7.60282 4.62454 7.22219Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Container>
  );
}
