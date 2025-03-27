import "react-datepicker/dist/react-datepicker.css";

import ClockIcon from "../icons/ClockIcon";
import CustomInput from "./CustomInput";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimePickerContainer = styled.div`
  width: fit-content;
  height: fit-content;

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
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

interface CustomTimePickerProps {
  label: string;
  value: string | null;
  onChange: (timeString: string | null) => void;
  readOnly?: boolean;
  timeIntervals?: number;
  width?: number;
}

const CustomTimePicker = ({
  label,
  value,
  onChange,
  readOnly,
  timeIntervals = 30,
  width = 320,
}: CustomTimePickerProps) => {
  const parseTime = (timeString: string | null) => {
    if (!timeString) return null;
    return moment(timeString, "HHmm").toDate();
  };

  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(moment(date).format("HHmm"));
    } else {
      onChange(null);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <TimePickerContainer>
        <DatePicker
          customInput={
            <CustomInput size="small" icon={<ClockIcon />} width={width} />
          }
          locale={ko}
          selected={parseTime(value)}
          onChange={handleChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          timeCaption="시간"
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          readOnly={readOnly}
        />
      </TimePickerContainer>
    </Container>
  );
};

export default CustomTimePicker;
