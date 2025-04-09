"use client";

import { useParams, useRouter } from "next/navigation";

import Announcement from "@/types/announcement";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CustomModal from "@/components/CustomModal";
import DetailHeaderButton from "@/app/(protected)/contract/dsp/list/components/fragment/DetailHeaderButton";
import Editor from "../components/fragments/Editor";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import Title from "../components/fragments/Title";
import TypeSelect from "../components/fragments/TypeSelect";
import styled from "styled-components";
import { useAnnouncementStore } from "@/stores/use-announcement-store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Container = styled.div``;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const AnnouncementDetailPage = () => {
  const router = useRouter();
  const { announcements, updateAnnouncement, deleteAnnouncement } =
    useAnnouncementStore();
  const { announcementId } = useParams();
  const announcement = announcements.find(
    (announcement) => announcement._id === announcementId,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState<Announcement | null>(null);
  const {
    register,
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<Announcement>({
    defaultValues: announcement,
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    reset(announcement);
  }, [announcement, reset]);

  const onSubmit = async (data: Announcement) => {
    setFormData(data);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (formData) {
      setIsLoading(true);
      await updateAnnouncement(formData);
      setIsLoading(false);
      setIsUpdateModalOpen(false);
      setIsEdit(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    await deleteAnnouncement(announcementId as string);
    setIsLoading(false);
    setIsDeleteModalOpen(false);
    router.push("/community/announcement");
  };

  const handleCancel = () => {
    reset(announcement);
    setIsEdit(false);
  };

  if (!announcement) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <PageHeader title={"공지사항 상세"} />
        <DetailHeaderButton
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
          onDelete={handleDelete}
          onCancel={handleCancel}
          isDisabled={false}
        />
      </HeaderWrapper>
      <Title
        value={watch("title") || ""}
        placeholder="제목 입력"
        onChange={(e) => setValue("title", e.target.value)}
        disabled={!isEdit}
      />
      <TypeSelect watch={watch} setValue={setValue} disabled={!isEdit} />
      <Editor
        value={watch("text") || ""}
        onChange={(value) => setValue("text", value)}
        readOnly={!isEdit}
      />

      <CustomModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        content="해당 공지사항을 삭제할까요?"
      />

      <CustomModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        content="변경사항을 저장할까요?"
      />
    </Container>
  );
};

export default AnnouncementDetailPage;
