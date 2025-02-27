"use client";

import CustomInput from "@/components/basic/CustomInput";
import CustomTextArea from "@/components/basic/CustomTextArea";
import IconSection from "./components/IconSection";
import MusicLogoSection from "./components/MusicLogoSection";
import PlaceholderIcon from "@/components/icons/PlaceholderIcon";
import SnsSection from "./components/SnsSection";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Content = styled.div``;

const Title1 = styled.div`
  ${theme.fonts.title1.semibold}
`;

const Title2 = styled.div`
  ${theme.fonts.title2.semibold}
`;

export default function Samples() {
  return (
    <Container>
      컴포넌트 모음
      <SnsSection />
      <MusicLogoSection />
      <IconSection />
      <Title1>Title1</Title1>
      <Title2>Title2</Title2>
      <CustomInput
        label="Label"
        helpText="Help Text"
        placeholder="플레이스홀더 텍스트"
        required
        value="Value"
        // disabled
        // locked
        icon={<PlaceholderIcon />}
      />
      <CustomInput
        label="Label"
        helpText="Help Text"
        placeholder="플레이스홀더 텍스트"
        required
        value="Value"
        size="small"
        icon={<PlaceholderIcon />}
      />
      <CustomTextArea
        label="Label"
        helpText="Help Text"
        placeholder="플레이스홀더 텍스트"
        required
        // disabled
        hideScrollbar
      />
    </Container>
  );
}
