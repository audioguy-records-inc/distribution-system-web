import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonSpinner = () => {
  return (
    <Container>
      <ClipLoader color={theme.colors.purple[600]} size={30} />
    </Container>
  );
};

export default ButtonSpinner;
