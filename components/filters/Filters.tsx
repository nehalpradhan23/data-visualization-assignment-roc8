import { useGlobalContext } from "@/context/ContextApi";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerComponent } from "./DatePickerComponent";

export const Filters = () => {
  const {
    ageFilterObject: { ageFilter, setAgeFilter },
    genderFilterObject: { genderFilter, setGenderFilter },
  } = useGlobalContext();

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeFilter(event.target.value || null);
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(event.target.value || null);
  };

  // ================================================================
  return (
    <div className="flex flex-col gap-3 mt-5 w-[400px] border border-black p-4">
      <span>Filters: </span>
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
        <DatePickerComponent />
      </div>
    </div>
  );
};
