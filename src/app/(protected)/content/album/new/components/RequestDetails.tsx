import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Album from "@/types/album";
import CustomTextArea from "@/components/basic/CustomTextArea";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Notice = styled.div`
  ${theme.fonts.label2.regular}
  color: ${theme.colors.gray[500]};
`;

export default function RequestDetails({
  control,
  watch,
  register,
  setValue,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
  setValue: UseFormSetValue<Album>;
}) {
  return (
    <Container>
      <CustomTextArea
        label="요청 사항"
        placeholder="요청 사항을 입력해주세요."
        expand={true}
        {...register("requestDetails", { required: true })}
      />
      <Notice>
        아티스트 정보(이미지, 부클릿, 소개글, 신규 생성), 특정 장르 반영(인디),
        해외 플랫폼 아티스트 매칭 링크(스포티파이, 애플뮤직, 유튜브 등) 필수
        기재 부탁드립니다. 일부 요청사항의 경우 플랫폼 정책에 따라 미반영, 혹은
        지연 반영될 수 있습니다.
      </Notice>
    </Container>
  );
}
