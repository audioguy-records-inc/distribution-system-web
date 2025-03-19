import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import theme from "@/styles/theme";

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
`;

const CenterSpinner = () => {
  return (
    <SpinnerWrapper>
      <ClipLoader color={theme.colors.purple[600]} size={30} />
    </SpinnerWrapper>
  );
};

export default CenterSpinner;
