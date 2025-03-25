import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import PlusIcon from "@/components/icons/PlusIcon";

const AddNew = ({
  size = "medium",
}: {
  size?: "medium" | "small" | "large";
}) => {
  return (
    <ButtonOutlinedPrimary
      label="신규 등록"
      leftIcon={<PlusIcon />}
      size={size}
    />
  );
};

export default AddNew;
