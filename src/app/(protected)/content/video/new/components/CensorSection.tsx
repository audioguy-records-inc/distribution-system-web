import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import {
  CensorshipBoard,
  censorshipBoardList,
  censorshipExemptionList,
  censorshipRatingList,
} from "@/constants/censorship";

import CustomCalendar from "@/components/basic/CustomCalendar";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import CustomTextArea from "@/components/basic/CustomTextArea";
import CustomUpload from "@/components/basic/CustomUpload";
import Gap from "@/components/basic/Gap";
import Video from "@/types/video";
import moment from "moment";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface CensorSectionProps {
  control: Control<Video>;
  watch: UseFormWatch<Video>;
  register: UseFormRegister<Video>;
  setValue: UseFormSetValue<Video>;
  required?: boolean;
}

export default function CensorSection({
  control,
  watch,
  register,
  setValue,
  required = false,
}: CensorSectionProps) {
  const tv = useTranslations("video");

  const translateItems = (items: CensorshipBoard[]) =>
    items.map((item) => ({
      key: item.key,
      value: item.translationKey ? tv(item.translationKey) : item.value,
    }));

  return (
    <Container>
      <Gap height={32} />
      <RowWrapper>
        <CustomDropdown
          label={tv("censorOrg")}
          placeholder={tv("censorOrgSelect")}
          items={translateItems(censorshipBoardList)}
          selectedKey={watch("ratingAuthority")}
          onSelectKey={(selectedKey) => {
            setValue("ratingAuthority", selectedKey);
            if (selectedKey === "심의제외") {
              setValue("ratingExemptionReason", "해당없음");
            }
            if (selectedKey !== "기타(직접입력)") {
              setValue("ratingAuthorityOther", "");
            }
          }}
          size="small"
          width={320}
          required={required}
        />
        {watch("ratingAuthority") === "심의제외" && (
          <CustomDropdown
            label={tv("censorExemptReason")}
            placeholder={tv("censorExemptReasonSelect")}
            items={translateItems(censorshipExemptionList)}
            selectedKey={watch("ratingExemptionReason")}
            onSelectKey={(selectedKey) => {
              setValue("ratingExemptionReason", selectedKey);
            }}
            size="small"
            width={320}
          />
        )}
        {watch("ratingAuthority") === "기타(직접입력)" && (
          <CustomInput
            label={tv("censorOrgDirect")}
            placeholder={tv("censorOrgPlaceholder")}
            value={watch("ratingAuthorityOther") || ""}
            onChange={(e) => {
              setValue("ratingAuthorityOther", e.target.value);
            }}
            size="small"
            width={320}
          />
        )}
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomDropdown
          label={tv("censorRating")}
          placeholder={tv("censorRatingSelect")}
          items={translateItems(censorshipRatingList)}
          selectedKey={watch("rating")}
          onSelectKey={(selectedKey) => {
            setValue("rating", selectedKey);
          }}
          size="small"
          width={320}
        />
        <CustomCalendar
          label={tv("censorDate")}
          value={
            watch("utcRatedAt") && moment(watch("utcRatedAt")).isValid()
              ? moment(watch("utcRatedAt")).format("YYYYMMDD")
              : null
          }
          onChange={(date) => {
            if (date) {
              const m = moment(date, "YYYYMMDD");
              if (m.isValid()) {
                const utcDate = m.utc().toDate();
                setValue("utcRatedAt", utcDate);
              } else {
                console.error("심의 일자 유효하지 않음:", date);
                setValue("utcRatedAt", undefined);
              }
            } else {
              setValue("utcRatedAt", undefined);
            }
          }}
        />
      </RowWrapper>
      <Gap height={56} />
      <CustomUpload
        onChange={(files) => {
          setValue("ratingFileList", files);
        }}
        value={watch("ratingFileList") || []}
        fileType={FileType.DOCS}
        dataCollectionName={DataCollectionName.VIDEOS}
        headerText={tv("censorFile")}
      />
      <Gap height={56} />
      <CustomTextArea
        label={tv("requestNote")}
        placeholder={tv("requestNotePlaceholder")}
        expand={true}
        {...register("requestDetails", { required: true })}
      />
    </Container>
  );
}
