import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export const MyPicker = (state) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => {
      setStartDate(date);
      state.setState({dater:date.getFullYear()+"-"+date.getDate()+"-"+date.getDay()});
    }} />
  );
};