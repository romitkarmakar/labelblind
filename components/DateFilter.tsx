import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Moment } from "moment";

interface IProps {
  date: Moment | null;
  setDate: (d: Moment | null | undefined) => void;
  minDate?: Moment | null;
}

export function DateFilter(props: IProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          minDate={props.minDate}
          
          label="Start Date"
          value={props.date}
          onChange={(newValue) => {
            props.setDate(newValue);
          }}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <div className="flex md:items-center py-2 md:py-0 pl-2 md:pl-0 bg-gray-100 pr-4 rounded-md">
              <input
                className="bg-gray-100 border-none rounded-md focus:ring-0 focus:border-none focus:outline-none"
                ref={inputRef}
                {...inputProps}
              />
              {InputProps?.endAdornment}
            </div>
          )}
        />
      </LocalizationProvider>
    </>
  );
}
