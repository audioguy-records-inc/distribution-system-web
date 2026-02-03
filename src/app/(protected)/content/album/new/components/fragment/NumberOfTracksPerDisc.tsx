import { Control, Controller, UseFormWatch } from "react-hook-form";

import Album from "@/types/album";
import CustomInput from "@/components/basic/CustomInput";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-bottom: 8px;
`;

const PlusButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.gray[50]};
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MinusButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.gray[50]};
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export default function NumberOfTracksPerDisc({
  control,
  watch,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
}) {
  const t = useTranslations("content");
  return (
    <Container>
      <Controller
        name="numberOfTracksPerDisc"
        control={control}
        render={({ field }) => {
          return (
            <Wrapper>
              <CustomInput
                label={t("tracksPerDisc")}
                value={field.value?.toString() || "0"}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(Number(value) < 0 ? 0 : Number(value));
                }}
                type="number"
                size="small"
                width={244}
              />
              <ButtonWrapper>
                <PlusButton
                  onClick={() => {
                    if (field.value === null || field.value === undefined) {
                      field.onChange(1);
                    } else {
                      field.onChange(field.value + 1);
                    }
                  }}
                >
                  <PlusIcon />
                </PlusButton>
                <MinusButton
                  onClick={() => {
                    if (
                      field.value === null ||
                      field.value === undefined ||
                      field.value <= 0
                    ) {
                      field.onChange(0);
                    } else {
                      field.onChange(field.value - 1);
                    }
                  }}
                >
                  <MinusIcon />
                </MinusButton>
              </ButtonWrapper>
            </Wrapper>
          );
        }}
      />
    </Container>
  );
}
