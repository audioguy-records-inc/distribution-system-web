import { SVGProps } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function ListIcon({
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
          d="M8.99976 15.25H14.9998M8.99976 12.25H14.9998M8.99976 9H14.9998M18.7498 21H5.24902C5.05011 21 4.85935 20.921 4.71869 20.7803C4.57804 20.6397 4.49902 20.4489 4.49902 20.25V3.75C4.49902 3.55109 4.57804 3.36032 4.71869 3.21967C4.85935 3.07902 5.05011 3 5.24902 3H14.2498H18.4998C19.052 3 19.4998 3.44772 19.4998 4V8.25V20.25C19.4998 20.3485 19.4804 20.446 19.4427 20.537C19.405 20.628 19.3497 20.7107 19.2801 20.7803C19.2104 20.85 19.1278 20.9052 19.0368 20.9429C18.9458 20.9806 18.8482 21 18.7498 21Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
}
