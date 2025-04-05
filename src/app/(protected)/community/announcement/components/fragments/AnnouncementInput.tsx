"use client";

import "react-quill-new/dist/quill.snow.css";

import Announcement, { AnnouncementType } from "@/types/announcement";
import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import Editor from "./Editor";
import Title from "./Title";
import TypeSelect from "./TypeSelect";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div``;

const AnnouncementInput = ({
  watch,
  setValue,
}: {
  watch: UseFormWatch<Announcement>;
  setValue: UseFormSetValue<Announcement>;
}) => {
  const content = watch("text") || "";
  const title = watch("title") || "";

  return (
    <Container>
      <Title
        value={title}
        placeholder="제목 입력"
        onChange={(e) => setValue("title", e.target.value)}
      />
      <TypeSelect watch={watch} setValue={setValue} />
      <Editor value={content} onChange={(value) => setValue("text", value)} />
    </Container>
  );
};

export default AnnouncementInput;
