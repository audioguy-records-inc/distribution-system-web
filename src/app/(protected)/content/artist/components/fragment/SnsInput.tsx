import { Artist, SnsLink } from "@/types/artist";
import { Control, Controller, useWatch } from "react-hook-form";

import CustomInput from "@/components/basic/CustomInput";
import Facebook from "@/components/icons/sns/Facebook";
import Instagram from "@/components/icons/sns/Instagram";
import TikTok from "@/components/icons/sns/TikTok";
import X from "@/components/icons/sns/X";
import Youtube from "@/components/icons/sns/Youtube";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.div`
  ${theme.fonts.body2.medium};
  color: ${theme.colors.gray[600]};
`;

interface SnsInputProps {
  isEdit: boolean;
  required: boolean;
  control: Control<Artist>;
}

const SnsInput = ({ isEdit, required, control }: SnsInputProps) => {
  const snsLinkList = useWatch({
    control,
    name: "snsLinkList",
    defaultValue: [],
  });

  const updateSnsLink = (site: string, link: string) => {
    const currentLinks = [...(snsLinkList || [])];
    const existingIndex = currentLinks.findIndex((item) => item.site === site);

    if (link.trim() === "") {
      // 값이 비어있으면 해당 SNS 항목 제거
      if (existingIndex !== -1) {
        currentLinks.splice(existingIndex, 1);
      }
    } else {
      // 값이 있으면 업데이트 또는 추가
      if (existingIndex !== -1) {
        currentLinks[existingIndex].link = link;
      } else {
        currentLinks.push({ site, link });
      }
    }

    return currentLinks;
  };

  return (
    <Container>
      <Label>SNS</Label>
      <Controller
        name="snsLinkList"
        control={control}
        render={({ field }) => (
          <>
            <CustomInput
              size="small"
              placeholder={"인스타그램"}
              icon={<Instagram />}
              readOnly={!isEdit}
              required={required}
              value={
                snsLinkList?.find((item) => item.site === "instagram")?.link ||
                ""
              }
              onChange={(e) =>
                field.onChange(updateSnsLink("instagram", e.target.value))
              }
            />
            <CustomInput
              size="small"
              placeholder={"유튜브"}
              icon={<Youtube />}
              readOnly={!isEdit}
              required={required}
              value={
                snsLinkList?.find((item) => item.site === "youtube")?.link || ""
              }
              onChange={(e) =>
                field.onChange(updateSnsLink("youtube", e.target.value))
              }
            />
            <CustomInput
              size="small"
              placeholder={"엑스"}
              icon={<X />}
              readOnly={!isEdit}
              required={required}
              value={
                snsLinkList?.find((item) => item.site === "twitter")?.link || ""
              }
              onChange={(e) =>
                field.onChange(updateSnsLink("twitter", e.target.value))
              }
            />
            <CustomInput
              size="small"
              placeholder={"페이스북"}
              icon={<Facebook />}
              readOnly={!isEdit}
              required={required}
              value={
                snsLinkList?.find((item) => item.site === "facebook")?.link ||
                ""
              }
              onChange={(e) =>
                field.onChange(updateSnsLink("facebook", e.target.value))
              }
            />
            <CustomInput
              size="small"
              placeholder={"틱톡"}
              icon={<TikTok />}
              readOnly={!isEdit}
              required={required}
              value={
                snsLinkList?.find((item) => item.site === "tiktok")?.link || ""
              }
              onChange={(e) =>
                field.onChange(updateSnsLink("tiktok", e.target.value))
              }
            />
          </>
        )}
      />
    </Container>
  );
};

export default SnsInput;
