import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import { UseFormWatch } from "react-hook-form";
import Video from "@/types/video";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";
import { useEffect } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Label = styled.div`
  ${theme.fonts.body2.medium};
`;

export default function LabelInfo({
  value,
  setValue,
  watch,
}: {
  value: string;
  setValue: (value: string) => void;
  watch: UseFormWatch<Video>;
}) {
  const { user } = useAuthStore();
  const code = watch("userInfo")?.account || user?.account || "";
  const name = watch("userInfo")?.displayName || user?.displayName || "";

  return (
    <Container>
      <Label>발매사</Label>
      <RowWrapper>
        <CustomInput
          value={code}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          locked={true}
          width={100}
        />

        <CustomInput
          value={name}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          locked={true}
          width={212}
        />
      </RowWrapper>
    </Container>
  );
}
