import { Controller, useForm } from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useState } from "react";

import AddNew from "@/components/AddNew";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ContactPersonTable from "./ContactPersonTable";
import ContractProductItem from "./ContractProductItem";
import CountryCodeDropdown from "./CountryCodeDropdown";
import { CountryItem } from "@/constants/country";
import CustomInput from "@/components/basic/CustomInput";
import CustomRadioWithLabel from "@/components/basic/CustomRadioWithLabel";
import CustomToggle from "@/components/basic/CustomToggle";
import CustomUpload from "@/components/basic/CustomUpload";
import { Dsp } from "@/types/dsp";
import type DspContract from "@/types/dsp-contract";
import DspDropdown from "./DspDropdown";
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
`;

const AddNewDspContract = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createDspContract } = useDspContractStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
    watch,
  } = useForm<DspContract>({
    defaultValues: {
      contactPersonList: [
        {
          name: null,
          responsibility: null,
          email: null,
          phone: null,
        },
      ],
      fileList: [],
      contractItemList: [],
    },
    shouldFocusError: false,
  });

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

  console.log("moonsae watch", watch());

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
              size="small"
              label="계약명"
              placeholder="계약명 입력"
              {...register("dspContractName", { required: true })}
            />
            <Controller
              name="dspId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DspDropdown
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                />
              )}
            />
          </RowWrapper>
          <Gap height={56} />
          <RowWrapper>
            <CustomInput
              size="small"
              label="DPID"
              placeholder="DPID 입력"
              {...register("dspContractUniqueId", { required: true })}
            />
            <Controller
              name="regionType"
              control={control}
              defaultValue="domestic"
              rules={{ required: true }}
              render={({ field }) => (
                <CustomRadioWithLabel
                  label="구분"
                  leftOption={{
                    label: "국내",
                    value: "domestic",
                    checked: field.value === "domestic",
                  }}
                  rightOption={{
                    label: "해외",
                    value: "international",
                    checked: field.value === "international",
                  }}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </RowWrapper>
          <Gap height={56} />
          <RowWrapper>
            <Controller
              name="countryCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CountryCodeDropdown
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                  // disabled={watch("regionType") === "domestic"}
                />
              )}
            />
            <Controller
              name="isTimeReleaseEnabled"
              control={control}
              defaultValue={true}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomRadioWithLabel
                  label="T/R"
                  leftOption={{
                    label: "사용",
                    value: true,
                    checked: field.value === true,
                  }}
                  rightOption={{
                    label: "미사용",
                    value: false,
                    checked: field.value === false,
                  }}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </RowWrapper>
          <Gap height={56} />
          <Controller
            name="contactPersonList"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ContactPersonTable
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <Gap height={56} />
          <Controller
            name="fileList"
            control={control}
            render={({ field }) => (
              <CustomUpload
                onChange={field.onChange}
                value={field.value}
                fileType={FileType.DOCS}
                dataCollectionName={DataCollectionName.DSP_CONTRACTS}
                headerText="계약서"
              />
            )}
          />
          <Gap height={56} />
          <CustomInput
            size="small"
            label="계약 요율"
            icon={<PercentIcon />}
            placeholder="숫자 입력"
            type="number"
            {...register("contractRate", { required: true })}
          />
          <Gap height={56} />
          <Controller
            name="contractItemList"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <ContractProductItem
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Form>
      </ReactModal>
    </>
  );
};

export default AddNewDspContract;
