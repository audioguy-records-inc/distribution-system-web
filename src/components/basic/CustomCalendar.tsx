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

  .react-datepicker__navigation--years-previous::before,
  .react-datepicker__navigation--years-upcoming::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 2px solid ${theme.colors.gray[600]};
    border-right: 2px solid ${theme.colors.gray[600]};
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .react-datepicker__navigation--years-previous::before {
    transform: translate(-50%, -50%) rotate(135deg);
  }

  .react-datepicker__navigation--years-upcoming::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Label = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

interface CustomCalendarProps {
  label?: string;
  value: string | null;
  onChange: (dateString: string | null) => void;
  readOnly?: boolean;
  width?: number;
  size?: "small" | "normal";
}

const CustomCalendar = ({
  label,
  value,
  onChange,
  readOnly,
  width = 320,
  size = "small",
}: CustomCalendarProps) => {
  const parseDate = (dateString: string | null) => {
    if (!dateString) return null;
    return moment(dateString, "YYYYMMDD").toDate();
  };

  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(moment(date).format("YYYYMMDD"));
    } else {
      onChange(null);
    }
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <CalendarContainer>
        <DatePicker
          customInput={
            <CustomInput size={size} icon={<CalendarIcon />} width={width} />
          }
          locale={ko}
          selected={parseDate(value)}
          onChange={handleChange}
          dateFormat="yyyy/MM/dd"
          readOnly={readOnly}
          showYearDropdown
          // yearDropdownItemNumber={1}
          // scrollableYearDropdown
        />
      </CalendarContainer>
    </Container>
  );
};

export default CustomCalendar;
