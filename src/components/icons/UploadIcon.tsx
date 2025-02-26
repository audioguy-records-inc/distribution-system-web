import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function UploadIcon({
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
          d="M7 8L12 3M12 3L17 8M12 3V15M21.5 15V19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H4.5C3.96957 21 3.46086 20.7893 3.08579 20.4142C2.71071 20.0391 2.5 19.5304 2.5 19V15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
}
