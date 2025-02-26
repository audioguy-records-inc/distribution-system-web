import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function TrashIcon({
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
          d="M14.2504 10.5V16.5M9.75037 10.5V16.5M20.25 6L3.75 6.00001M18.7504 6V20.25C18.7504 20.4489 18.6713 20.6397 18.5307 20.7803C18.39 20.921 18.1993 21 18.0004 21H6.00037C5.80145 21 5.61069 20.921 5.47004 20.7803C5.32938 20.6397 5.25037 20.4489 5.25037 20.25V6M15.7504 6V4.5C15.7504 4.10218 15.5923 3.72064 15.311 3.43934C15.0297 3.15804 14.6482 3 14.2504 3H9.75037C9.35254 3 8.97101 3.15804 8.68971 3.43934C8.4084 3.72064 8.25037 4.10218 8.25037 4.5V6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
}
