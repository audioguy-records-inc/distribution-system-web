import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useEffect, useState } from "react";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import { User } from "@/types/user";
import UserContract from "@/types/user-contract";
import styled from "styled-components";
import { useUserContractStore } from "@/stores/use-user-contract-store";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export default function TrackUserContract({
  value,
  userId,
  readOnly,
  onChange,
}: {
  value: UserContract | null;
  userId: string | undefined;
  readOnly: boolean;
  onChange: (value: UserContract | null) => void;
}) {
  const { filterUserContracts } = useUserContractStore();
  const [searchedUserContracts, setSearchedUserContracts] = useState<
    UserContract[]
  >([]);

  useEffect(() => {
    const fetchUserContract = async () => {
      if (userId) {
        const query = `userId=${userId}`;
        const res = await filterUserContracts(query);
        setSearchedUserContracts(res);
      }
    };
    fetchUserContract();
  }, [userId, filterUserContracts]);

  return (
    <Container style={{ marginBottom: userId ? "48px" : "0px" }}>
      <CustomInput
        label="계약 정보"
        locked
        value={value?.userContractUniqueId || ""}
        width={100}
        size="small"
      />
      <CustomDropdown
        items={searchedUserContracts.map((userContract) => ({
          key: userContract._id,
          value: userContract.userContractName,
        }))}
        onSelectKey={(key) => {
          onChange(
            searchedUserContracts.find(
              (userContract) => userContract._id === key,
            ) || null,
          );
        }}
        selectedKey={value?._id || ""}
        size="small"
        readOnly={readOnly}
      />
    </Container>
  );
}
