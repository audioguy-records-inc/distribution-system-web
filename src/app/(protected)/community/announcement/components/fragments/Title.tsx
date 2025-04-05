import styled from "styled-components";
import theme from "@/styles/theme";

const Title = styled.input`
  ${theme.fonts.title1.medium}
  color: ${theme.colors.gray[800]};
  border: none;
  border-top: 1px solid ${theme.colors.gray[50]};
  border-bottom: 1px solid ${theme.colors.gray[50]};
  outline: none;
  width: 100%;
  padding: 20px 32px;
  border-radius: 0;
`;

export default Title;
