"use client";
import { GlobalContextType, SheetDataObject } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

const ContextProvider = createContext<GlobalContextType>({
  formattedDataObject: { formattedData: [], setFormattedData: () => {} },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawData, setRawData] = useState<[][]>([]);
  const [formattedData, setFormattedData] = useState<SheetDataObject[]>([]);

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

  // ==============================================
  return (
    <ContextProvider.Provider
      value={{
        formattedDataObject: { formattedData, setFormattedData },
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
