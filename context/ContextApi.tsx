"use client";
import { GlobalContextType, SheetDataObject } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

const ContextProvider = createContext<GlobalContextType>({
  formattedDataObject: { formattedData: [], setFormattedData: () => {} },
  selectedBarValueObject: {
    selectedBarValue: null,
    setSelectedBarValue: () => {},
  },
  selectedFiltersObject: {
    selectedFilters: [],
    setSelectedFilters: () => {},
  },
  ageFilterObject: {
    ageFilter: null,
    setAgeFilter: () => {},
  },
  genderFilterObject: {
    genderFilter: null,
    setGenderFilter: () => {},
  },
  dateObject: {
    startDate: null,
    endDate: null,
    setEndDate: () => {},
    setStartDate: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawData, setRawData] = useState<[][]>([]);
  const [formattedData, setFormattedData] = useState<SheetDataObject[]>([]);
  const [selectedBarValue, setSelectedBarValue] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<[]>([]);
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // fetch data ============================================
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch("/api/getData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRawData(data);
      } catch (error) {
        console.log("error fetching data: ", error);
      }
    };

    fetchSheetData();
  }, []);
  // console.log("raw data: ", rawData);

  // format data =======================================================
  useEffect(() => {
    const formatData = () => {
      const keys: string[] = rawData[0] as string[];
      const arrayOfObjects: SheetDataObject[] = rawData.slice(1).map((row) => {
        const obj = {} as SheetDataObject;
        row.forEach((cell, index) => {
          obj[keys[index]] = cell;
        });

        return obj;
      });
      setFormattedData(arrayOfObjects);
    };
    if (rawData.length > 0) {
      formatData();
    }
  }, [rawData]);

  // set start and end dates --------------------------------------------
  useEffect(() => {
    // get initial dates from data
    // const startDateString = formattedData[0]?.Day?.replace(/\//g, "-");
    // const endDateString = formattedData[
    //   formattedData?.length - 1
    // ]?.Day?.replace(/\//g, "-");
    //
    // const startDateString = formattedData[0]?.Day;
    // const endDateString = formattedData[formattedData?.length - 1];
    // const parseStartDate = parse(startDateString, "dd/MM/yyyy", new Date());
    // console.log(parseStartDate);
    // startDate(parseStartDate)
    // console.log("start and end: ", startDateString, endDateString);
    // -----------------------------------
    // const date = new Date(engDate);
    // const formattedDate2 = date?.toString();
    // console.log("long date: ", formattedDate2);
    // setStartDate(new Date(startDateString));
    // setEndDate(new Date(endDateString));
    // // setStartDate(parseStartDate);
    // // setEndDate(parseEndDate);
    // setStartDate(startDateString);
    // setEndDate(endDateString);
  }, [formattedData]);

  // ==============================================
  return (
    <ContextProvider.Provider
      value={{
        formattedDataObject: { formattedData, setFormattedData },
        selectedBarValueObject: { selectedBarValue, setSelectedBarValue },
        selectedFiltersObject: { selectedFilters, setSelectedFilters },
        ageFilterObject: { ageFilter, setAgeFilter },
        genderFilterObject: { genderFilter, setGenderFilter },
        dateObject: { startDate, endDate, setEndDate, setStartDate },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
