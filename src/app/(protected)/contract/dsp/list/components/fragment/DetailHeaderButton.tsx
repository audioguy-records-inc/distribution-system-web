import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DspContract from "@/types/dsp-contract";
import PencilIcon from "@/components/icons/PencilIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const DetailHeaderButton = ({
  isEdit,
  setIsEdit,
  onSubmit,
  onDelete,
  onCancel,
  isDisabled,
}: {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  onSubmit: () => void;
  onDelete: () => void;
  onCancel: () => void;
  isDisabled: boolean;
}) => {
  return (
    <ButtonWrapper>
      {isEdit ? (
        <>
          <ButtonOutlinedAssistive
            label="취소"
            onClick={() => {
              setIsEdit(false);
              onCancel?.();
            }}
          />
          <ButtonOutlinedPrimary
            label="완료"
            onClick={onSubmit}
            disabled={isDisabled}
            size="medium"
          />
        </>
      ) : (
        <>
          <ButtonOutlinedAssistive
            label="삭제"
            leftIcon={<TrashIcon />}
            onClick={onDelete}
          />
          <ButtonOutlinedPrimary
            label="수정"
            size="medium"
            leftIcon={<PencilIcon />}
            onClick={() => setIsEdit(true)}
          />
        </>
      )}
    </ButtonWrapper>
  );
};

export default DetailHeaderButton;
