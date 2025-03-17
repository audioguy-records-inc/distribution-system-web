import AddNew from "@/components/AddNew";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import CustomInput from "@/components/basic/CustomInput";
import CustomToggle from "@/components/basic/CustomToggle";
import CustomToggleWithLabel from "@/components/basic/CustomToggleWithLabel";
import type DspContract from "@/types/dsp-contract";
import Gap from "@/components/basic/Gap";
import ReactModal from "react-modal";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
  gap: 12px;
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
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddNewDspContract = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createDspContract } = useDspContractStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<DspContract>();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: DspContract) => {
    await createDspContract({ dspContract: data });
    handleClose();
  };

  const customStyles = {
    content: {
      top: "77px",
      left: "188px",
      right: "188px",
      bottom: "77px",
      transform: "none",
      margin: "0",
      width: "auto",
      maxWidth: "none",
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
          DSP 계약 등록
          <ButtonWrapper>
            <ButtonOutlinedSecondary label="취소" onClick={handleClose} />
            <ButtonFilledPrimary
              label="등록"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            />
          </ButtonWrapper>
        </ModalHeader>
        <Gap height={48} />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <VisibleWrapper>
            <VisibleLabel>계약 정보</VisibleLabel>
            <CustomToggle checked={true} onChange={() => {}} label="" />
          </VisibleWrapper>
          <Gap height={42} />
          <RowWrapper>
            <CustomInput
              label="계약명"
              placeholder="계약명 입력"
              {...register("dspContractName", { required: true })}
            />
            <CustomInput
              label="DSP명"
              placeholder="DSP명 입력"
              {...register("dspContractName", { required: true })}
            />
          </RowWrapper>
          <Gap height={56} />
          <RowWrapper>
            <CustomInput
              label="DSP ID"
              placeholder="DPID 입력"
              {...register("dspId", { required: true })}
            />
            <CustomToggleWithLabel
              label="구분"
              leftOption={{ label: "국내", checked: true }}
              rightOption={{ label: "해외", checked: false }}
              {...register("locationType", { required: true })}
            />
          </RowWrapper>
        </Form>
      </ReactModal>
    </>
  );
};

export default AddNewDspContract;
