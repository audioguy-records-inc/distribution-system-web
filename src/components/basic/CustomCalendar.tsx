import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "../icons/CalendarIcon";
import CustomInput from "./CustomInput";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

const Container = styled.div`
  display: flex;

  .react-datepicker__day--selected {
    background-color: ${theme.colors.purple[600]};
  }

  .react-datepicker__header {
    background-color: ${theme.colors.white};
    border-bottom: none;
  }
`;

const CustomCalendar = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Container>
      <DatePicker
        customInput={<CustomInput size="small" icon={<CalendarIcon />} />}
        locale={ko}
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy/MM/dd"
      />
    </Container>
  );
};

export default CustomCalendar;
