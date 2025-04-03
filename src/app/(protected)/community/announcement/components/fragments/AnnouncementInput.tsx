import Announcement, { AnnouncementType } from "@/types/announcement";
import { Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";

import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import React from "react";
import TypeSelect from "./TypeSelect";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";

const Container = styled.div``;

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

const StyleButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 32px;
  border-bottom: 1px solid ${theme.colors.gray[50]};
`;

const StyleButton = styled.button`
  padding: 5px 10px;
  background: white;
  border: 1px solid ${theme.colors.gray[50]};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.gray[50]};
  }

  &.active {
    background: ${theme.colors.gray[100]};
  }
`;

const ContentArea = styled.div`
  ${theme.fonts.body1.regular}
  color: ${theme.colors.gray[800]};
  min-height: 300px;
  padding: 20px 32px;
  outline: none;
  width: 100%;
`;

const AnnouncementInput = ({
  watch,
  setValue,
}: {
  watch: UseFormWatch<Announcement>;
  setValue: UseFormSetValue<Announcement>;
}) => {
  const [isBold, setIsBold] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const checkFormatting = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;

      setIsBold(
        parentElement?.tagName === "STRONG" ||
          parentElement?.closest("strong") !== null,
      );

      setIsUnderline(
        parentElement?.tagName === "U" || parentElement?.closest("u") !== null,
      );
    }
  };

  const handleBoldClick = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (isBold) {
        // 볼드 해제 로직 개선
        document.execCommand("bold", false);
      } else {
        // 볼드 적용
        document.execCommand("bold", false);
      }

      setIsBold(!isBold);
      // 변경 후 폼 값 업데이트
      setTimeout(() => {
        setValue("text", contentEditableRef.current?.innerHTML || "");
      }, 0);
    }
  };

  const handleUnderlineClick = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (isUnderline) {
        // 밑줄 해제 로직 개선
        document.execCommand("underline", false);
      } else {
        // 밑줄 적용
        document.execCommand("underline", false);
      }

      setIsUnderline(!isUnderline);
      // 변경 후 폼 값 업데이트
      setTimeout(() => {
        setValue("text", contentEditableRef.current?.innerHTML || "");
      }, 0);
    }
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (e.currentTarget) {
        setValue("text", e.currentTarget.innerHTML);
      }
    }, 0);
  };

  const contentEditableRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      contentEditableRef.current &&
      watch("text") !== contentEditableRef.current.innerHTML
    ) {
      contentEditableRef.current.innerHTML = watch("text") || "";
    }
  }, [watch("text")]);

  return (
    <Container>
      <Title
        value={watch("title")}
        placeholder="제목 입력"
        onChange={(e) => setValue("title", e.target.value)}
      />
      <TypeSelect watch={watch} setValue={setValue} />
      <StyleButtonContainer>
        <StyleButton
          onClick={handleBoldClick}
          className={isBold ? "active" : ""}
        >
          <strong>B</strong>
        </StyleButton>
        <StyleButton
          onClick={handleUnderlineClick}
          className={isUnderline ? "active" : ""}
        >
          <u>U</u>
        </StyleButton>
      </StyleButtonContainer>
      <ContentArea
        ref={contentEditableRef}
        contentEditable
        onInput={handleContentChange}
        onMouseUp={checkFormatting}
        onKeyUp={checkFormatting}
      />
    </Container>
  );
};

export default AnnouncementInput;
