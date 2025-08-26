import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import { Artist } from "@/types/artist";
import ArtistInput from "./fragment/ArtistInput";
import CustomModal from "@/components/CustomModal";
import CustomToggle from "@/components/basic/CustomToggle";
import DetailHeaderButton from "@/app/(protected)/contract/dsp/list/components/fragment/DetailHeaderButton";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useArtistStore } from "@/stores/use-artist-store";

const Container = styled.div`
  padding: 48px 32px 64px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.fonts.title2.medium}
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const ArtistDetail = ({ artist }: { artist: Artist }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState<Artist | null>(null);
  const { updateArtist, deleteArtist } = useArtistStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<Artist>({
    defaultValues: artist,
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    reset(artist);
  }, [artist, reset]);

  const onSubmit = async (data: Artist) => {
    console.log("onSubmit called with data:", data);
    console.log("Artist ID:", data._id);
    console.log("Form is valid:", isValid);
    console.log("Form is dirty:", isDirty);

    // 필수 필드 검증
    if (!data._id) {
      console.error("Artist ID is missing");
      toast.error("아티스트 ID가 누락되었습니다.");
      return;
    }

    if (!data.name || data.name.trim() === "") {
      console.error("Artist name is missing");
      toast.error("아티스트명이 누락되었습니다.");
      return;
    }

    setFormData(data);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    console.log("handleConfirmUpdate called with formData:", formData);

    if (formData) {
      try {
        await updateArtist(formData);
        setIsUpdateModalOpen(false);
        setIsEdit(false);
        toast.success("아티스트가 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("아티스트 수정에 실패했습니다.");
      }
    } else {
      console.error("formData is null");
      toast.error("수정할 데이터가 없습니다.");
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteArtist(artist._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>아티스트 정보</TitleWrapper>
        <DetailHeaderButton
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
          onDelete={handleDelete}
          isDisabled={!isValid || !isDirty}
          onCancel={() => {
            setIsEdit(false);
            reset(artist);
          }}
        />
      </Header>
      <ArtistInput
        watch={watch}
        register={register}
        control={control}
        isEdit={isEdit}
      />

      <CustomModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        content="해당 아티스트를 삭제할까요?"
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

export default ArtistDetail;
