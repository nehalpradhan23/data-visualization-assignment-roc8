"use client";
import { GlobalContextType, SheetDataObject } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = createContext<GlobalContextType>({
  formattedDataObject: { formattedData: [], setFormattedData: () => {} },
  selectedBarValueObject: {
    selectedBarValue: null,
    setSelectedBarValue: () => {},
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

  const [ageFilter, setAgeFilter] = useState<string | null>(
    Cookies.get("ageFilter") || null
  );
  const [genderFilter, setGenderFilter] = useState<string | null>(
    Cookies.get("genderFilter") || null
  );

  const [startDate, setStartDate] = useState<Date | null>(
    Cookies.get("startDate") ? new Date(Cookies.get("startDate")!) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    Cookies.get("endDate") ? new Date(Cookies.get("endDate")!) : null
  );

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

  // save data ==============================
  useEffect(() => {
    if (ageFilter) {
      Cookies.set("ageFilter", ageFilter);
    } else {
      Cookies.remove("ageFilter");
    }
    if (genderFilter) {
      Cookies.set("genderFilter", genderFilter);
    } else {
      Cookies.remove("genderFilter");
    }
    if (startDate) {
      Cookies.set("startDate", startDate.toISOString());
    } else {
      Cookies.remove("startDate");
    }
    if (endDate) {
      Cookies.set("endDate", endDate.toISOString());
    } else {
      Cookies.remove("endDate");
    }
  }, [ageFilter, genderFilter, startDate, endDate]);

  // ==============================================
  return (
    <ContextProvider.Provider
      value={{
        formattedDataObject: { formattedData, setFormattedData },
        selectedBarValueObject: { selectedBarValue, setSelectedBarValue },
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
