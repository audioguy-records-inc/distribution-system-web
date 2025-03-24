"use client";

import Album from "@/types/album";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";
import { useForm } from "react-hook-form";

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

export default function AlbumNewPage() {
  const { createAlbum, isLoading } = useAlbumStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<Album>({
    defaultValues: {},
    mode: "onChange",
    shouldFocusError: false,
  });
  const handleClose = () => {};

  const onSubmit = async (data: Album) => {
    await createAlbum(data);
    handleClose();
  };

  return (
    <Container>
      <HeaderWrapper>
        <PageHeader title={"신규 앨범 등록"} />
        <ButtonWrapper>
          <ButtonOutlinedSecondary label="취소" onClick={handleClose} />
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonFilledPrimary
              label="등록"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty || !isValid}
            />
          )}
        </ButtonWrapper>
      </HeaderWrapper>
    </Container>
  );
}
