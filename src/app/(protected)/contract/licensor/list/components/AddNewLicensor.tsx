import { AuthLevel, User } from "@/types/user";
import { Controller, useForm } from "react-hook-form";

import AddNew from "@/components/AddNew";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import CustomToggle from "@/components/basic/CustomToggle";
import type DspContract from "@/types/dsp-contract";
import DspContractInput from "../../../dsp/list/components/fragment/DspContractInput";
import Gap from "@/components/basic/Gap";
import LicensorInput from "./fragment/LicnsorInput";
import ReactModal from "react-modal";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useState } from "react";
import { useUserStore } from "@/stores/use-user-store";

const AddNewWrapper = styled.div`
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.fonts.title1.medium}
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const VisibleWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const VisibleLabel = styled.div`
  ${theme.fonts.title2.medium}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AddNewLicensor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createUser } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<User>({
    defaultValues: {
      account: undefined,
      password: undefined,
      displayName: undefined,
      authLevel: AuthLevel.USER,
      type: undefined,
      isEnabled: true,
      representativeName: undefined,
      address: undefined,
      bankName: undefined,
      bankAccount: undefined,
      contactPersonList: [
        {
          name: undefined,
          responsibility: undefined,
          email: undefined,
          phone: undefined,
        },
      ],
      fileList: [],
    },
    mode: "onChange",
    shouldFocusError: false,
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: User) => {
    await createUser(data);
    handleClose();
  };

  const customStyles = {
    content: {
      top: "77px",
      left: "188px",
      right: "188px",
      bottom: "77px",
      transform: "none",
      margin: "0 auto",
      width: "auto",
      maxWidth: "1065px",
      padding: "56px 64px",
      borderRadius: "8px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <>
      <AddNewWrapper onClick={handleOpen}>
        <AddNew />
      </AddNewWrapper>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalHeader>
          권리사 등록
          <ButtonWrapper>
            <ButtonOutlinedSecondary label="취소" onClick={handleClose} />
            <ButtonFilledPrimary
              label="등록"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty || !isValid}
            />
          </ButtonWrapper>
        </ModalHeader>
        <Gap height={48} />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <VisibleWrapper>
            <VisibleLabel>권리사 정보</VisibleLabel>
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
          </VisibleWrapper>
          <LicensorInput
            watch={watch}
            register={register}
            control={control}
            isEdit={true}
            inputType="create"
          />
        </Form>
      </ReactModal>
    </>
  );
};

export default AddNewLicensor;
