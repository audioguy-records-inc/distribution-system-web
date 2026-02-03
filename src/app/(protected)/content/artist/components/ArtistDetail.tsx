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
import { useTranslations } from "next-intl";

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
  const ta = useTranslations("artist");
  const tToast = useTranslations("toast.artist");
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
      toast.error(tToast("missingId"));
      return;
    }

    if (!data.name || data.name.trim() === "") {
      console.error("Artist name is missing");
      toast.error(tToast("missingName"));
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
        toast.success(tToast("updateSuccess"));
      } catch (error) {
        console.error("Update failed:", error);
        toast.error(tToast("updateFail"));
      }
    } else {
      console.error("formData is null");
      toast.error(tToast("noChanges"));
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
        <TitleWrapper>{ta("artistInfo")}</TitleWrapper>
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
        content={ta("deleteConfirm")}
      />

      <CustomModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        content={ta("saveConfirm")}
      />
    </Container>
  );
};

export default ArtistDetail;
