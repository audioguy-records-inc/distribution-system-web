import { Controller, useForm } from "react-hook-form";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import CustomToggle from "@/components/basic/CustomToggle";
import DspContract from "@/types/dsp-contract";
import PencilIcon from "@/components/icons/PencilIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const DspContractInfo = ({ dspContract }: { dspContract: DspContract }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, isDirty },
    watch,
  } = useForm<DspContract>({
    defaultValues: {
      ...dspContract,
    },
    mode: "onChange",
    shouldFocusError: false,
  });

  const disabled = !isEdit;

  const onSubmit = async (data: DspContract) => {
    console.log("moonsae watch", watch());
    console.log("moonsae isDirty", isDirty);
    console.log("moonsae isValid", isValid);
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          계약 정보
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
        <ButtonWrapper>
          {isEdit ? (
            <>
              <ButtonOutlinedAssistive
                label="취소"
                onClick={() => setIsEdit(false)}
              />
              <ButtonOutlinedPrimary
                label="완료"
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid}
                size="medium"
              />
            </>
          ) : (
            <>
              <ButtonOutlinedAssistive label="삭제" leftIcon={<TrashIcon />} />
              <ButtonOutlinedPrimary
                label="수정"
                size="medium"
                leftIcon={<PencilIcon />}
                onClick={() => setIsEdit(true)}
              />
            </>
          )}
        </ButtonWrapper>
      </Header>
    </Container>
  );
};

export default DspContractInfo;
