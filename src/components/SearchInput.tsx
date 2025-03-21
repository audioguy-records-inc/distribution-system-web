import { CircleLoader, ClipLoader } from "react-spinners";

import CustomInput from "@/components/basic/CustomInput";
import CustomTable from "./basic/custom-table/CustomTable";
import Gap from "./basic/Gap";
import SearchIcon from "@/components/icons/SearchIcon";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div``;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const SearchInput = ({
  placeholder,
  onClickSearch,
  onChange,
  value = "",
  isLoading = false,
  size = "normal",
  readOnly = false,
}: {
  placeholder: string;
  onClickSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isLoading?: boolean;
  size?: "normal" | "small";
  readOnly?: boolean;
}) => {
  return (
    <Container>
      <CustomInput
        placeholder={placeholder}
        icon={
          <SearchButton onClick={onClickSearch} disabled={isLoading}>
            {isLoading ? (
              <ClipLoader size={16} color={theme.colors.purple[600]} />
            ) : (
              <SearchIcon />
            )}
          </SearchButton>
        }
        onChange={onChange}
        value={value}
        size={size}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default SearchInput;
