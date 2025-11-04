import CustomInput from "@/components/basic/CustomInput";
import UserContract from "@/types/user-contract";
import styled from "styled-components";
import { useEffect } from "react";
import { useUserContractStore } from "@/stores/use-user-contract-store";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export default function TrackUserContract({
  value,
  userId,
  userContractId,
  onChange,
}: {
  value: UserContract | null;
  userId: string | undefined;
  userContractId: string | undefined;
  onChange: (value: UserContract | null) => void;
}) {
  const { fetchUserContract } = useUserContractStore();

  // userContractId가 변경되면 해당 계약 정보를 가져와서 표시
  useEffect(() => {
    const _fetchUserContract = async () => {
      if (userContractId) {
        // 이미 같은 계약 정보가 있으면 다시 가져오지 않음
        if (value?._id === userContractId) {
          return;
        }
        const res = await fetchUserContract(userContractId);
        if (res) {
          onChange(res);
        }
      } else {
        // userContractId가 없으면 null로 설정 (이미 null이 아닌 경우만)
        if (value !== null) {
          onChange(null);
        }
      }
    };
    _fetchUserContract();
  }, [userContractId, fetchUserContract, onChange, value?._id]);

  return (
    <Container style={{ marginBottom: userId ? "48px" : "0px" }}>
      <CustomInput
        label="계약 정보"
        locked
        value={value?.userContractUniqueId || ""}
        width={100}
        size="small"
        blueRequired
      />
      <CustomInput
        label=""
        locked
        value={value?.userContractName || ""}
        size="small"
      />
    </Container>
  );
}
