import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Album from "@/types/album";
import CustomCalendar from "@/components/basic/CustomCalendar";
import CustomTimePicker from "@/components/basic/CustomTimePicker";
import Gap from "@/components/basic/Gap";
import moment from "moment";
import styled from "styled-components";

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

const ServiceDateWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function TrackReleaseDate({
  utcReleasedAt,
  utcServiceStartedAt,
  onChangeReleasedAt,
  onChangeServiceStartedAt,
  readOnly,
}: {
  utcReleasedAt: Date | null;
  utcServiceStartedAt: Date | null;
  onChangeReleasedAt: (value: Date | null) => void;
  onChangeServiceStartedAt: (value: Date | null) => void;
  readOnly: boolean;
}) {
  return (
    <RowWrapper>
      {/* 발매일 선택 */}
      <CustomCalendar
        label="발매일"
        value={
          utcReleasedAt && moment(utcReleasedAt).isValid()
            ? moment(utcReleasedAt).format("YYYYMMDD")
            : null
        }
        onChange={(date) => {
          if (date) {
            const m = moment(date, "YYYYMMDD");
            if (m.isValid()) {
              // UTC 형식으로 변환하여 저장
              const utcDate = m.utc().toDate();
              onChangeReleasedAt(utcDate);
            } else {
              console.error("발매일 유효하지 않음:", date);
              onChangeReleasedAt(null);
            }
          } else {
            onChangeReleasedAt(null);
          }
        }}
        readOnly={readOnly}
      />

      <ServiceDateWrapper>
        <CustomCalendar
          label="서비스 시간"
          value={
            utcServiceStartedAt && moment(utcServiceStartedAt).isValid()
              ? moment(utcServiceStartedAt).format("YYYYMMDD")
              : null
          }
          onChange={(date) => {
            if (date) {
              try {
                // 기존 시간 정보 유지 (유효한지 확인)
                const currentTime =
                  utcServiceStartedAt && moment(utcServiceStartedAt).isValid()
                    ? moment(utcServiceStartedAt).format("HHmm")
                    : "0000";

                const dateTimeStr = `${date}${currentTime}`;
                console.log("서비스 시작일 변경: ", dateTimeStr);
                const dateTimeMoment = moment(dateTimeStr, "YYYYMMDDHHmm");

                if (dateTimeMoment.isValid()) {
                  const utcDateTime = dateTimeMoment.utc().toDate();
                  onChangeServiceStartedAt(utcDateTime);
                } else {
                  console.error("유효하지 않은 날짜/시간 조합:", dateTimeStr);
                  // 기본값으로 설정
                  const defaultDateTime = moment(`${date}0000`, "YYYYMMDDHHmm")
                    .utc()
                    .toDate();
                  onChangeServiceStartedAt(defaultDateTime);
                }
              } catch (error) {
                console.error("서비스 시작일 날짜 변환 오류:", error);
                const defaultDateTime = moment(`${date}0000`, "YYYYMMDDHHmm")
                  .utc()
                  .toDate();
                onChangeServiceStartedAt(defaultDateTime);
              }
            } else {
              onChangeServiceStartedAt(null);
            }
          }}
          width={180}
          readOnly={readOnly}
        />

        {/* 서비스 시작일 (시간 선택) */}
        <TimeWrapper>
          <Gap height={22} />
          <CustomTimePicker
            label=""
            value={
              utcServiceStartedAt && moment(utcServiceStartedAt).isValid()
                ? moment(utcServiceStartedAt).format("HHmm")
                : null
            }
            onChange={(time) => {
              if (time) {
                try {
                  // 기존 날짜 정보 유지 (유효성 체크)
                  const currentDate =
                    utcServiceStartedAt && moment(utcServiceStartedAt).isValid()
                      ? moment(utcServiceStartedAt).format("YYYYMMDD")
                      : moment().format("YYYYMMDD");

                  const dateTimeStr = `${currentDate}${time}`;
                  console.log("시간 변경 - dateTimeStr:", dateTimeStr);
                  const dateTimeMoment = moment(dateTimeStr, "YYYYMMDDHHmm");

                  if (dateTimeMoment.isValid()) {
                    const utcDateTime = dateTimeMoment.utc().toDate();
                    onChangeServiceStartedAt(utcDateTime);
                  } else {
                    console.error("유효하지 않은 날짜/시간:", dateTimeStr);
                  }
                } catch (error) {
                  console.error("시간 변환 오류:", error);
                }
              } else {
                // 시간 정보 초기화 : 기존 날짜 유지, 00:00으로 설정
                if (
                  utcServiceStartedAt &&
                  moment(utcServiceStartedAt).isValid()
                ) {
                  const currentDate =
                    moment(utcServiceStartedAt).format("YYYYMMDD");
                  const utcDateTime = moment(
                    `${currentDate}0000`,
                    "YYYYMMDDHHmm",
                  )
                    .utc()
                    .toDate();
                  onChangeServiceStartedAt(utcDateTime);
                } else {
                  onChangeServiceStartedAt(null);
                }
              }
            }}
            width={132}
            readOnly={readOnly}
          />
        </TimeWrapper>
      </ServiceDateWrapper>
    </RowWrapper>
  );
}
