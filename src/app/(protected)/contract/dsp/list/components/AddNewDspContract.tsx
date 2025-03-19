import { Controller, useForm } from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useState } from "react";

import AddNew from "@/components/AddNew";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ContactPersonTable from "./fragment/ContactPersonTable";
import ContractProductItem from "./fragment/ContractProductItem";
import CountryCodeDropdown from "./fragment/CountryCodeDropdown";
import { CountryItem } from "@/constants/country";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import CustomToggle from "@/components/basic/CustomToggle";
import CustomUpload from "@/components/basic/CustomUpload";
import { Dsp } from "@/types/dsp";
import type DspContract from "@/types/dsp-contract";
import DspContractInput from "./fragment/DspContractInput";
import DspDropdown from "./fragment/DspDropdown";
import Gap from "@/components/basic/Gap";
import PercentIcon from "@/components/icons/PercentIcon";
import ReactModal from "react-modal";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";

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

const AddNewDspContract = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createDspContract } = useDspContractStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<DspContract>({
    defaultValues: {
      dspContractName: undefined,
      dspContractUniqueId: undefined,
      regionType: "domestic",
      countryCode: undefined,
      isTimeReleaseEnabled: true,
      contactPersonList: [
        {
          name: undefined,
          responsibility: undefined,
          email: undefined,
          phone: undefined,
        },
      ],
      fileList: [],
      contractItemList: [],
      contractRate: undefined,
      isContractEnabled: true,
    },
    mode: "onChange",
    shouldFocusError: false,
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: DspContract) => {
    await createDspContract(data);
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
          DSP 계약 등록
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
            <VisibleLabel>계약 정보</VisibleLabel>
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
          </VisibleWrapper>
          <DspContractInput
            watch={watch}
            register={register}
            control={control}
            isEdit={true}
          />
        </Form>
      </ReactModal>
    </>
  );
};

export default AddNewDspContract;
