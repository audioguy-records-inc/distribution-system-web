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
import UserContract from "@/types/user-contract";
import Video from "@/types/video";
import styled from "styled-components";
import { useUserContractStore } from "@/stores/use-user-contract-store";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export default function VideoUserContract({
  control,
  watch,
  register,
  setValue,
}: {
  control: Control<Video>;
  watch: UseFormWatch<Video>;
  register: UseFormRegister<Video>;
  setValue: UseFormSetValue<Video>;
}) {
  const { searchUserContracts } = useUserContractStore();
  const [searchedUserContracts, setSearchedUserContracts] = useState<
    UserContract[]
  >([]);
  const userId = watch("userId");
  const account = watch("userInfo.account");

  useEffect(() => {
    const fetchUserContract = async () => {
      if (userId) {
        const res = await searchUserContracts(account, "userInfo.account");
        setSearchedUserContracts(res);
      }
    };
    fetchUserContract();
  }, [userId, account, searchUserContracts]);

  return (
    <Container style={{ marginBottom: watch("userId") ? "48px" : "0px" }}>
      <CustomInput
        label="계약 정보"
        locked
        value={watch("userContractInfo")?.userContractUniqueId || ""}
        width={100}
        size="small"
      />
      <CustomDropdown
        items={searchedUserContracts.map((userContract) => ({
          key: userContract._id,
          value: userContract.userContractName,
        }))}
        onSelectKey={(key) => {
          setValue("userContractId", key);
          setValue(
            "userContractInfo",
            searchedUserContracts.find(
              (userContract) => userContract._id === key,
            ),
          );
        }}
        selectedKey={watch("userContractId") || ""}
        size="small"
      />
    </Container>
  );
}
