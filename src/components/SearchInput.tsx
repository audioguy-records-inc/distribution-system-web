import CustomInput from "@/components/basic/CustomInput";
import SearchIcon from "@/components/icons/SearchIcon";
import styled from "styled-components";

const Container = styled.div``;

const SearchInput = ({
  placeholder,
  onClick,
}: {
  placeholder: string;
  onClick: () => void;
}) => {
  return (
    <CustomInput
      placeholder={placeholder}
      icon={<SearchIcon />}
      onClick={onClick}
    />
  );
};

export default SearchInput;
