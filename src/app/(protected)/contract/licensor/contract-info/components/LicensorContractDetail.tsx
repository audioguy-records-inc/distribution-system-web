import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import CustomModal from "@/components/CustomModal";
import CustomToggle from "@/components/basic/CustomToggle";
import DetailHeaderButton from "../../../dsp/list/components/fragment/DetailHeaderButton";
import LicensorContractInput from "./fragment/LicensorContractInput";
import { User } from "@/types/user";
import UserContract from "@/types/user-contract";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useUserContractStore } from "@/stores/use-user-contract-store";
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

const LicensorContractDetail = ({
  licensorContract,
}: {
  licensorContract: UserContract;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserContract | null>(null);
  const { updateUserContract, deleteUserContract, isLoading } =
    useUserContractStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<UserContract>({
    defaultValues: licensorContract,
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    reset(licensorContract);
  }, [licensorContract, reset]);

  const onSubmit = async (data: UserContract) => {
    setFormData(data);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (formData) {
      await updateUserContract(formData);
      setIsUpdateModalOpen(false);
      setIsEdit(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUserContract(licensorContract._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          권리사 계약 정보
          {isEdit ? (
            <Controller
              name="isContractEnabled"
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
            <ActivateStateBadge isActive={licensorContract.isContractEnabled} />
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
            reset(licensorContract);
          }}
        />
      </Header>
      <LicensorContractInput
        watch={watch}
        register={register}
        control={control}
        isEdit={isEdit}
      />

      <CustomModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        content="해당 계약을 삭제할까요?"
        isLoading={isLoading}
      />

      <CustomModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        content="변경사항을 저장할까요?"
        isLoading={isLoading}
      />
    </Container>
  );
};

export default LicensorContractDetail;
