import CustomInput from "@/components/basic/CustomInput";
import SearchIcon from "@/components/icons/SearchIcon";
import styled from "styled-components";

const Container = styled.div``;

const SearchInput = () => {
  return (
    <CustomInput placeholder="DPID 또는 계약명 검색" icon={<SearchIcon />} />
  );
};

export default SearchInput;
