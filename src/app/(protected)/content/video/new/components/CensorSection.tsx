import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";
import {
  censorshipBoardList,
  censorshipExemptionList,
  censorshipRatingList,
} from "@/constants/censorship";

import CustomCalendar from "@/components/basic/CustomCalendar";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomTextArea from "@/components/basic/CustomTextArea";
import CustomUpload from "@/components/basic/CustomUpload";
import Gap from "@/components/basic/Gap";
import Video from "@/types/video";
import moment from "moment";
import styled from "styled-components";

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
}

export default function CensorSection({
  control,
  watch,
  register,
  setValue,
}: CensorSectionProps) {
  return (
    <Container>
      <Gap height={32} />
      <RowWrapper>
        <CustomDropdown
          label="심의처"
          placeholder="심의처 선택"
          items={censorshipBoardList}
          selectedKey={watch("ratingAuthority")}
          onSelectKey={(selectedKey) => {
            setValue("ratingAuthority", selectedKey);
            if (selectedKey === "심의제외") {
              setValue("ratingExemptionReason", "해당없음");
            }
          }}
          size="small"
          width={320}
        />
        {watch("ratingAuthority") === "심의제외" && (
          <CustomDropdown
            label="심의 제외 사유"
            placeholder="심의 제외 사유 선택"
            items={censorshipExemptionList}
            selectedKey={watch("ratingExemptionReason")}
            onSelectKey={(selectedKey) => {
              setValue("ratingExemptionReason", selectedKey);
            }}
            size="small"
            width={320}
          />
        )}
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomDropdown
          label="심의 등급"
          placeholder="심의 등급 선택"
          items={censorshipRatingList}
          selectedKey={watch("rating")}
          onSelectKey={(selectedKey) => {
            setValue("rating", selectedKey);
          }}
          size="small"
          width={320}
        />
        <CustomCalendar
          label="심의 일자"
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
        headerText="심의 파일"
      />
      <Gap height={56} />
      <CustomTextArea
        label="요청 사항"
        placeholder="요청 사항을 입력해주세요."
        expand={true}
        {...register("requestDetails", { required: true })}
      />
    </Container>
  );
}
