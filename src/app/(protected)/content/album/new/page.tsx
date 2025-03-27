"use client";

import Album from "@/types/album";
import AlbumSection from "./components/AlbumSection";
import ArtistSection from "./components/ArtistSection";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import DistributionSection from "./components/DistributionSection";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import TrackSection from "./components/TrackSection";
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
    setValue,
  } = useForm<Album>({
    defaultValues: {
      titleList: [
        {
          KR: "",
        },
      ],
      supplyRegion: "Worldwide",
      isExposed: true,
    },
    mode: "onChange",
    shouldFocusError: false,
  });
  const handleClose = () => {};

  const onSubmit = async (data: Album) => {
    await createAlbum(data);
    handleClose();
  };

  console.log("moonsae watch", watch());

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
      <Gap height={32} />
      <CollapsibleHeader
        title="1. 유통 정보"
        renderComponent={
          <DistributionSection
            control={control}
            watch={watch}
            register={register}
          />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="2. 아티스트 정보"
        renderComponent={
          <ArtistSection control={control} watch={watch} register={register} />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="3. 앨범 정보"
        renderComponent={
          <AlbumSection
            control={control}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        }
      />
      <Gap height={56} />
      <CollapsibleHeader
        title="4. 트랙 정보"
        renderComponent={<TrackSection watch={watch} />}
      />
      <Gap height={56} />
    </Container>
  );
}
