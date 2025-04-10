"use client";

import AddNewAnnouncement from "./components/AddNewAnnouncement";
import AnnouncementList from "./components/AnnouncementList";
import AnnouncementSearch from "./components/AnnouncementSearch";
import { AuthLevel } from "@/types/user";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

export default function AnnouncementPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.authLevel === AuthLevel.ADMIN;
  return (
    <Container>
      <PageHeader title="공지사항" />
      <AnnouncementSearch />
      {isAdmin && (
        <ButtonWrapper>
          <AddNewAnnouncement />
        </ButtonWrapper>
      )}
      <AnnouncementList />
    </Container>
  );
}
