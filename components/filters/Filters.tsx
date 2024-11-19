import { useGlobalContext } from "@/context/ContextApi";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerComponent } from "./DatePickerComponent";
import { parse } from "date-fns";

export const Filters = () => {
  const {
    ageFilterObject: { ageFilter, setAgeFilter },
    genderFilterObject: { genderFilter, setGenderFilter },
    dateObject: { setStartDate, setEndDate },
    formattedDataObject: { formattedData },
  } = useGlobalContext();

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeFilter(event.target.value || null);
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(event.target.value || null);
  };

  const resetFilters = () => {
    setAgeFilter(null);
    setGenderFilter(null);
    const parseDate = (dateString: string) =>
      parse(dateString, "dd/MM/yyyy", new Date());
    setStartDate(parseDate(formattedData[0].Day));
    setEndDate(parseDate(formattedData[formattedData.length - 1].Day));
  };
  // ================================================================
  return (
    <div className="flex max-md:flex-row flex-col h-fit gap-3 max-md:gap-6 ml-10 mt-5 max-md:w-[500px] w-[250px] border bg-gray-100 border-black p-4 mb-5">
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-2xl font-bold">Filters: </span>
        <span
          className="text-right cursor-pointer hover:underline"
          onClick={resetFilters}
        >
          Reset filters
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {/* age ----------------- */}
        <div className="flex justify-between">
          <label className="">Age:</label>
          <select
            className="border border-black"
            value={ageFilter || ""}
            onChange={handleAgeChange}
          >
            <option value="">All</option>
            <option value="15-25">15-25</option>
            <option value=">25">{">"}25</option>
          </select>
        </div>
        {/* gender --------------------------------- */}
        <div className="flex justify-between">
          <label className="">Gender:</label>
          <select
            className="border border-black"
            value={genderFilter || ""}
            onChange={handleGenderChange}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {/* date picker */}
      </div>
      <DatePickerComponent />
    </div>
  );
};
