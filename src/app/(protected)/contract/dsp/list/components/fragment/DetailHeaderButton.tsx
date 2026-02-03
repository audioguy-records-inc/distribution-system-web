import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DspContract from "@/types/dsp-contract";
import PencilIcon from "@/components/icons/PencilIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import { useTranslations } from "next-intl";

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
  const tCommon = useTranslations("common");

  return (
    <ButtonWrapper>
      {isEdit ? (
        <>
          <ButtonOutlinedAssistive
            label={tCommon("cancel")}
            onClick={() => {
              setIsEdit(false);
              onCancel?.();
            }}
          />
          <ButtonOutlinedPrimary
            label={tCommon("complete")}
            onClick={onSubmit}
            disabled={isDisabled}
            size="medium"
          />
        </>
      ) : (
        <>
          <ButtonOutlinedAssistive
            label={tCommon("delete")}
            leftIcon={<TrashIcon />}
            onClick={onDelete}
          />
          <ButtonOutlinedPrimary
            label={tCommon("edit")}
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
