"use client";

import "react-quill-new/dist/quill.snow.css";

import Announcement, { AnnouncementType } from "@/types/announcement";
import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import TypeSelect from "./TypeSelect";
import styled from "styled-components";
import theme from "@/styles/theme";

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

const EditorWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .ql-container {
    min-height: 360px;
  }

  /* 기본 폰트 크기를 18px로 지정 */
  .ql-editor {
    font-size: 18px;
    flex: 1;
    min-height: 350px; /* 에디터 영역의 최소 높이 설정 */
  }

  /* size 툴바 옵션에 숫자를 표시하기 위한 설정 */
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: attr(data-value) !important;
  }
`;

// Size 속성에 타입 지정
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Size = Quill.import("attributors/style/size") as any;
Size.whitelist = Array.from({ length: 40 }, (_, i) => `${i + 1}px`);
Quill.register(Size, true);

// 툴바 모듈 설정: size 옵션 추가
const modules = {
  toolbar: [
    [
      {
        size: [
          "12px",
          "14px",
          "16px",
          "18px",
          "20px",
          "24px",
          "30px",
          "36px",
          "40px",
        ],
      },
    ],
    ["bold", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ],
};

// formats 배열에서 "bullet" 제거 (Quill은 "list" 포맷만 사용)
const formats = [
  "size",
  "bold",
  "underline",
  "strike",
  "blockquote",
  "list",
  "align",
];

const AnnouncementInput = ({
  watch,
  setValue,
}: {
  watch: UseFormWatch<Announcement>;
  setValue: UseFormSetValue<Announcement>;
}) => {
  const content = watch("text") || "";
  const title = watch("title") || "";
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    console.log("moonsae useEffect");
    if (quillRef.current) {
      console.log("moonsae quill", quillRef.current);
      const editor = quillRef.current.getEditor();
      editor.format("size", "18px");
    }
  }, []);

  return (
    <Container>
      <Title
        value={title}
        placeholder="제목 입력"
        onChange={(e) => setValue("title", e.target.value)}
      />
      <TypeSelect watch={watch} setValue={setValue} />
      <EditorWrapper>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={(value) => setValue("text", value)}
          modules={modules}
          formats={formats}
        />
      </EditorWrapper>
    </Container>
  );
};

export default AnnouncementInput;
