import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../icons/CalendarIcon";
import CustomInput from "./CustomInput";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useRef, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CalendarContainer = styled.div`
  width: fit-content;
  height: fit-content;
  .react-datepicker__day--selected {
    background-color: ${theme.colors.purple[600]};
  }

  .react-datepicker__header {
    background-color: ${theme.colors.white};
    border-bottom: none;
  }

  .react-datepicker-wrapper {
    display: inline-block;
    height: fit-content;
    padding: 0;
    margin: 0;

    > div {
      margin: 0;
      padding: 0;
    }
  }
`;

const Label = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

interface CustomMonthCalendarProps {
  label?: string;
  value: string | null;
  onChange: (dateString: string | null) => void;
  readOnly?: boolean;
  width?: number;
  size?: "small" | "normal";
}

const CustomMonthCalendar = ({
  label,
  value,
  onChange,
  readOnly,
  width = 320,
  size = "small",
}: CustomMonthCalendarProps) => {
  const datePickerRef = useRef<DatePicker>(null);

  const parseDate = (dateString: string | null) => {
    if (!dateString) return null;
    return moment(dateString, "YYYYMM").toDate();
  };

  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(moment(date).format("YYYYMM"));
    } else {
      onChange(null);
    }
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <CalendarContainer>
        <DatePicker
          ref={datePickerRef}
          customInput={
            <CustomInput
              size={size}
              icon={<CalendarIcon />}
              width={width}
              onIconClick={handleIconClick}
            />
          }
          locale={ko}
          selected={parseDate(value)}
          onChange={handleChange}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          readOnly={readOnly}
        />
      </CalendarContainer>
    </Container>
  );
};

export default CustomMonthCalendar;
