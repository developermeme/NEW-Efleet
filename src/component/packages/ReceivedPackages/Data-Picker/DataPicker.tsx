import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendar2MinusFill } from "react-icons/bs";
import { onClick } from "../../../../helper/Properties";
import { formatDate } from "../../../../helper/Script";

import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import "./DataPicker.scss";

interface IProps {
  handleGetData: (date: any) => void;
}

export const DataPicker: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { handleGetData } = props;
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [visibleCalendar, setVisibleCalendar] = useState<boolean>(false);

  React.useEffect(() => {
    const formattedDate = formatDate(value);
    setSelectedDate(formattedDate);
  }, [value]);

  const handleCalenderClick = (e: onClick) =>
    setVisibleCalendar(!visibleCalendar);

  const handleClick = (e: onClick) => {
    e.preventDefault();
    handleGetData(selectedDate);
  };

  return (
    <div className="calendar">
      <p className="label u-h3">Select Date</p>
      <div className="box">
        <input type="text" value={selectedDate} readOnly />
        <BsFillCalendar2MinusFill
          className="calendar-icon"
          onClick={handleCalenderClick as any}
        />
      </div>
      {visibleCalendar && <Calendar onChange={onChange} value={value} />}
      <TextButton
        items="Get Data"
        isprimary={true}
        className="button"
        onClick={handleClick as any}
      />
    </div>
  );
};
