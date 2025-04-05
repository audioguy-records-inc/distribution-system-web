import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import CustomModal from "@/components/CustomModal";
import CustomToggle from "@/components/basic/CustomToggle";
import DetailHeaderButton from "../../../dsp/list/components/fragment/DetailHeaderButton";
import LicensorInput from "./fragment/LicnsorInput";
import { User } from "@/types/user";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useUserStore } from "@/stores/use-user-store";

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

const LicensorDetail = ({ licensor }: { licensor: User }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const { updateUser, deleteUser } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<User>({
    defaultValues: licensor,
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    reset(licensor);
  }, [licensor, reset]);

  const onSubmit = async (data: User) => {
    setFormData(data);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (formData) {
      await updateUser(formData);
      setIsUpdateModalOpen(false);
      setIsEdit(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(licensor._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          권리사 정보
          {isEdit ? (
            <Controller
              name="isEnabled"
              control={control}
              render={({ field }) => (
                <CustomToggle
                  checked={field.value}
                  onChange={field.onChange}
                  label=""
                />
              )}
            />
          ) : (
            <ActivateStateBadge isActive={licensor.isEnabled} />
          )}
        </TitleWrapper>
        <DetailHeaderButton
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
          onDelete={handleDelete}
          isDirty={isDirty}
          isValid={isValid}
          onCancel={() => {
            setIsEdit(false);
            reset(licensor);
          }}
        />
      </Header>
      <LicensorInput
        watch={watch}
        register={register}
        control={control}
        isEdit={isEdit}
        inputType={"update"}
      />

      <CustomModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        content="해당 권리사를 삭제할까요?"
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

export default LicensorDetail;
