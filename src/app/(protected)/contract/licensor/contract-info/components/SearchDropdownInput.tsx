import SearchInput from "@/components/SearchInput";
import styled from "styled-components";

const Container = styled.div``;

interface SearchDropdownInputProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchDropdownInput = ({
  placeholder,
  onChange,
}: SearchDropdownInputProps) => {
  return (
    <Container>
      <SearchInput placeholder={placeholder} />
    </Container>
  );
};

export default SearchDropdownInput;
