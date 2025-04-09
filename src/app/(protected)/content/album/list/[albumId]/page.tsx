"use client";

import { useParams, useRouter } from "next/navigation";

import Album from "@/types/album";
import AlbumSection from "../../new/components/AlbumSection";
import ArtistSection from "../../new/components/ArtistSection";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonSpinner from "@/components/ButtonSpinner";
import CollapsibleHeader from "@/components/CollapsibleHeader";
import CollapsibleTrackHeader from "@/components/CollapsibleTrackHeader";
import DistributionSection from "../../new/components/DistributionSection";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import TrackSection from "../../new/components/TrackSection";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";
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

const AlbumDetailPage = () => {
  const router = useRouter();
  const { albumId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { albums, updateAlbum, deleteAlbum } = useAlbumStore();
  const album = albums.find((album) => album._id === albumId);

  const { register, reset, control, watch, setValue, formState } =
    useForm<Album>({
      defaultValues: album,
      mode: "onChange",
      shouldFocusError: false,
    });

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteAlbum(albumId as string);
    setIsLoading(false);
    router.push("/content/album/list");
  };

  const handleSubmit = async () => {
    const _album = watch();
    if (!_album) {
      return;
    }
    setIsLoading(true);
    await updateAlbum(_album, false);
    setIsLoading(false);
  };

  if (!album) {
    return <div>앨범을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <PageHeader title={"앨범 상세"} />
        <ButtonWrapper>
          <ButtonOutlinedSecondary label="삭제" onClick={handleDelete} />
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonFilledPrimary
              label="수정"
              onClick={handleSubmit}
              disabled={false}
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
      <CollapsibleTrackHeader
        title="4. 트랙 정보"
        renderComponent={<TrackSection albumWatch={watch} />}
        disabled={false}
      />
    </Container>
  );
};

export default AlbumDetailPage;
