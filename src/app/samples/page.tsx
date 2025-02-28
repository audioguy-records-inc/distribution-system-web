"use client";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonSection from "./components/ButtonSection";
import CheckboxSection from "./components/CheckboxSection";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import CustomInput from "@/components/basic/CustomInput";
import CustomTextArea from "@/components/basic/CustomTextArea";
import IconSection from "./components/IconSection";
import MusicLogoSection from "./components/MusicLogoSection";
import PlaceholderIcon from "@/components/icons/PlaceholderIcon";
import RadioSection from "./components/RadioSection";
import SnsSection from "./components/SnsSection";
import ToggleSection from "./components/ToggleSection";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 500px;
`;

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
        // isError
      />
      <ButtonSection />
      <CheckboxSection />
      <RadioSection />
      <ToggleSection />
    </Container>
  );
}
