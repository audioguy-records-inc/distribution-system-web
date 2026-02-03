import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import CustomModal from "@/components/CustomModal";
import CustomToggle from "@/components/basic/CustomToggle";
import DetailHeaderButton from "./fragment/DetailHeaderButton";
import DspContract from "@/types/dsp-contract";
import DspContractInput from "./fragment/DspContractInput";
import PencilIcon from "@/components/icons/PencilIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
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

const DspContractDetail = ({ dspContract }: { dspContract: DspContract }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState<DspContract | null>(null);
  const { updateDspContract, deleteDspContract } = useDspContractStore();
  const tContract = useTranslations("contract");
  const tDsp = useTranslations("dsp");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<DspContract>({
    defaultValues: dspContract,
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    reset(dspContract);
  }, [dspContract, reset]);

  const onSubmit = async (data: DspContract) => {
    if (data.contractRate === undefined || isNaN(data.contractRate)) {
      toast.error(tContract("contractRateError"));
      return;
    }
    setFormData(data);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (formData) {
      await updateDspContract(formData);
      setIsUpdateModalOpen(false);
      setIsEdit(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDspContract(dspContract._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          {tContract("contractInfo")}
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
            <ActivateStateBadge isActive={dspContract.isContractEnabled} />
          )}
        </TitleWrapper>
        <DetailHeaderButton
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
          onDelete={handleDelete}
          isDisabled={false}
          onCancel={() => {
            setIsEdit(false);
            reset(dspContract);
          }}
        />
      </Header>
      <DspContractInput
        watch={watch}
        register={register}
        control={control}
        isEdit={isEdit}
      />

      <CustomModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        content={tDsp("deleteConfirm")}
      />

      <CustomModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        content={tDsp("saveConfirm")}
      />
    </Container>
  );
};

export default DspContractDetail;
