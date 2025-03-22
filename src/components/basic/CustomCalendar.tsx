import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../icons/CalendarIcon";
import CustomInput from "./CustomInput";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

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

interface CustomCalendarProps {
  label: string;
  value: string | null;
  onChange: (dateString: string | null) => void;
  readOnly?: boolean;
}

const CustomCalendar = ({
  label,
  value,
  onChange,
  readOnly,
}: CustomCalendarProps) => {
  const parseDate = (dateString: string | null) => {
    if (!dateString) return null;
    return moment(dateString, "YYYYMMDD").toDate();
  };

  return (
    <Container>
      <Label>{label}</Label>
      <CalendarContainer>
        <DatePicker
          customInput={<CustomInput size="small" icon={<CalendarIcon />} />}
          locale={ko}
          selected={parseDate(value)}
          onChange={(date: Date | null) => {
            if (date) {
              onChange(moment(date).format("YYYYMMDD"));
            } else {
              onChange(null);
            }
          }}
          dateFormat="yyyy/MM/dd"
          readOnly={readOnly}
        />
      </CalendarContainer>
    </Container>
  );
};

export default CustomCalendar;
