import CustomInput from "@/components/basic/CustomInput";
import SearchIcon from "@/components/icons/SearchIcon";
import styled from "styled-components";

const Container = styled.div``;

const SearchInput = ({ placeholder }: { placeholder: string }) => {
  return <CustomInput placeholder={placeholder} icon={<SearchIcon />} />;
};

export default SearchInput;
