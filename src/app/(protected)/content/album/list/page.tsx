"use client";

import PageHeader from "@/components/PageHeader";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function AlbumListPage() {
  return (
    <Container>
      <PageHeader title={"앨범 리스트"} />
    </Container>
  );
}
